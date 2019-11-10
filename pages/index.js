import { useState } from 'react';
import StationSearchBar from '../components/StationSearchbar';
import DeparturesDisplay from '../components/DeparturesDisplay';
import EnturService, { convertFeatureToLocation } from '@entur/sdk'

const Index = () => {
  const [fromValue, setFromValue] = useState('');
  const [isFromValueValid, setFromValueValid] = useState(false);
  const [toValue, setToValue] = useState('');
  const [isToValueValid, setToValueValid] = useState(false);
  const [departures, setDepartures] = useState([]);
  const service = new EnturService({ clientName: 'Oslomet-s331044_MAUU5010_project' })


  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isFromValueValid && isToValueValid) {
      fetchDepartures();
    }
  }

  async function fetchDepartures() {
    const [fromFeature] = await service.getFeatures(fromValue)
    const [toFeature] = await service.getFeatures(toValue)

    if (!fromFeature || !toFeature) {
      return
    }

    const tripPatterns = await service.getTripPatterns({
      searchDate: new Date(),
      from: convertFeatureToLocation(fromFeature),
      to: convertFeatureToLocation(toFeature),
    })

    console.log(tripPatterns)
    setDepartures(tripPatterns);
  }

  function timeConvert(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return (hDisplay ? hDisplay : "") + (mDisplay ? mDisplay : "");
  }

  return (
    <div>
      <h1>Hello Next.js</h1>
      <form onSubmit={handleOnSubmit} action="">
        Fra:
        <StationSearchBar setValue={setFromValue} value={fromValue} valid={setFromValueValid} />
        Til:
        <StationSearchBar setValue={setToValue} value={toValue} valid={setToValueValid} />
        <button>Vis Avganger</button>
      </form>
      {departures.length > 0 &&
        <>
          <h2>Avganger</h2>
          <ul role="list">
            {departures.map((departure, idx) =>
              <li key={idx}>
                <toAndfrom><h3>{departure.startTime.slice(11, 16)} - {departure.endTime.slice(11, 16)}</h3></toAndfrom>
                {timeConvert(departure.duration)}
                Pris: {Math.round(departure.duration / 120)},-
              </li>)
            }
          </ul>
          <style jsx>{`
            ul {
              list-style: none;
            }

            li {
              border: 2px solid #360000;
              width: 330px;
              margin-bottom: 1em;
              padding: 1em;
            }
            li::focus-within {
                blackground-color: #360000;
                color: #fafafa;
            }
            a {
                text-decoration: none;
                color: #2B2B2B;
            }
            a:focus {
                outline: 0;
            }
            h3 {
                margin-top: 0;
            }
            toAndFrom {float: right;}
          `}</style>
        </>}
    </div>
  )
};

export default Index;