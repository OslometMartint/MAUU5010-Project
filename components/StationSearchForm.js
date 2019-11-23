import { useState } from "react";
import EnturService, { convertFeatureToLocation } from "@entur/sdk";
import StationSearchBar from './StationSearchbar';

const StationSearchForm = ({setFromValue, fromValue, setToValue, toValue, setDepartures}) => {
  const [isFromValueValid, setFromValueValid] = useState(false);
  const [isToValueValid, setToValueValid] = useState(false);
  const service = new EnturService({
    clientName: "Oslomet-s331044_MAUU5010_project"
  });

  const handleOnSubmit = e => {
    e.preventDefault();
    if (isFromValueValid && isToValueValid) {
      fetchDepartures();
    }
  };
  async function fetchDepartures() {
    const [fromFeature] = await service.getFeatures(fromValue);
    const [toFeature] = await service.getFeatures(toValue);

    if (!fromFeature || !toFeature) {
      return;
    }

    const tripPatterns = await service.getTripPatterns({
      searchDate: new Date(),
      from: convertFeatureToLocation(fromFeature),
      to: convertFeatureToLocation(toFeature)
    });

    setDepartures(
      tripPatterns.filter(obj => obj.legs.every(leg => leg.mode === "rail"))
    );
  }
  return (
    <form onSubmit={handleOnSubmit} action="">
      <label>
        From:
        <StationSearchBar
          setValue={setFromValue}
          value={fromValue}
          valid={setFromValueValid}
        />
      </label>
      <label>
        To:
        <StationSearchBar
          setValue={setToValue}
          value={toValue}
          valid={setToValueValid}
        />
      </label>

      <button>Show departures</button>
    </form>
  );
};

export default StationSearchForm;
