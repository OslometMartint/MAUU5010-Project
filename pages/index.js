import { useState } from 'react';
import StationSearchBar from '../components/StationSearchbar';
import { timeConvert } from '../lib/utils';
import EnturService, { convertFeatureToLocation } from '@entur/sdk'
import Swal from 'sweetalert2';

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

const Index = () => {
  const [fromValue, setFromValue] = useState('');
  const [isFromValueValid, setFromValueValid] = useState(false);
  const [toValue, setToValue] = useState('');
  const [isToValueValid, setToValueValid] = useState(false);
  const [departures, setDepartures] = useState([]);
  const service = new EnturService({ clientName: 'Oslomet-s331044_MAUU5010_project' })

  const postTicket = debounce(contents => {
    fetch(`${location.origin}/api`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(contents),
    });
  }, 200);

  if (process.browser) {
    fetch(`${location.origin}/api/expiretickets`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  }

  const buyTicket = (data) => {
    postTicket(data);
    Swal.fire('Congratulations!',
      `You have bought a ticket from ${fromValue} to ${toValue}!`,
      'success')
  }

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

    setDepartures(tripPatterns.filter(obj => obj.legs.every(leg => leg.mode === 'rail')));
    console.log(tripPatterns.filter(obj => obj.legs.every(leg => leg.mode === 'rail')))
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit} action="">
        From:
        <StationSearchBar setValue={setFromValue} value={fromValue} valid={setFromValueValid} />
        To:
        <StationSearchBar setValue={setToValue} value={toValue} valid={setToValueValid} />
        <button>Show departures</button>
      </form>
      {departures.length > 0 &&
        <>
          <h2>Avganger</h2>
          <ul role="list">
            {departures.map((departure, idx) =>
              <li key={idx}>
                <h3>{departure.startTime.slice(11, 16)} - {departure.endTime.slice(11, 16)}</h3>

                {timeConvert(departure.duration)}
                Pris: {Math.round(departure.duration / 120)},-
                <button onClick={() => buyTicket(departure)}>Buy ticket</button>
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
                float: right;
            }
          `}</style>
        </>}
    </div>
  )
};

export default Index;