import { useState } from "react";
import EnturService, { convertFeatureToLocation } from "@entur/sdk";
import StationSearchBar from "./StationSearchbar";
import Swal from 'sweetalert2';

const StationSearchForm = ({
  setFromValue,
  fromValue,
  setToValue,
  toValue,
  setDepartures
}) => {
  const [isFromValueValid, setFromValueValid] = useState(false);
  const [isToValueValid, setToValueValid] = useState(false);
  const service = new EnturService({
    clientName: "Oslomet-s331044_MAUU5010_project"
  });

  const showLoading = () => {
    Swal.fire({
      title: 'Searching for tickets',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
  };
  const handleOnSubmit = e => {
      console.log(e);
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
    showLoading();
    const tripPatterns = await service.getTripPatterns({
      searchDate: new Date(),
      from: convertFeatureToLocation(fromFeature),
      to: convertFeatureToLocation(toFeature)
    });
    Swal.close();
    setDepartures(
      tripPatterns.filter(obj => obj.legs.every(leg => leg.mode === "rail"))
    );
  }
  return (
    <form onSubmit={handleOnSubmit} action="" autoComplete="off">
      <label htmlFor="tosearchbar">From:
      <StationSearchBar
        id="tosearchbar"
        setValue={setFromValue}
        value={fromValue}
        valid={setFromValueValid}
      />
      </label>
      <label htmlFor="fromsearchbar">To:
      <StationSearchBar
        id="fromsearchbar"
        setValue={setToValue}
        value={toValue}
        valid={setToValueValid}
      />
    </label>
      <button>Show departures</button>
      <style jsx>{`
        form {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding: 2em;
            padding-bottom: 0;
            justify-content: center;
            height: 35%;
        }
        label {
            width: 50%;
            position: relative;
        }
        @media screen and (max-width: 600px) {
            label {
              width: 100%;
            }
            form {
                padding-left: 0.5em;
                padding-right: 0.5em;
            }
        }
        button {
            height: 50px; 
            font-size: 16px;
            font-weight: bold;
            padding: 0 40px;
            background-color: #360000;
            color: white;
            cursor: pointer;
        }
        button:focus {
            background-color: white;
            color: #360000;
            -webkit-appearance: none;
            outline: 4px solid;
        }
      `}</style>
    </form>
  );
};

export default StationSearchForm;
