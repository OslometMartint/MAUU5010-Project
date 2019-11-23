import EnturService, { convertFeatureToLocation } from '@entur/sdk'

const service = new EnturService({ clientName: 'Oslomet-s331044_MAUU5010_project' })

export function timeConvert(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " time, " : " timer, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minutt " : " minutter ") : "";
  return (hDisplay ? hDisplay : "") + (mDisplay ? mDisplay : "");
}
export function expireTickets() {
  if (process.browser) {
    fetch(`${location.origin}/api/expiretickets`, {
      method: "post",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({})
    });
  }
}

export async function fetchDepartures(from, to) {
  const [fromFeature] = await service.getFeatures(from)
  const [toFeature] = await service.getFeatures(to)

  if (!fromFeature || !toFeature) {
    return
  }

  const tripPatterns = await service.getTripPatterns({
    searchDate: new Date(),
    from: convertFeatureToLocation(fromFeature),
    to: convertFeatureToLocation(toFeature),
  })

  return tripPatterns;
}

export default null;
