export function timeConvert(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " time, " : " timer, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minutt " : " minutter ") : "";
    return (hDisplay ? hDisplay : "") + (mDisplay ? mDisplay : "");
  }

export default null;