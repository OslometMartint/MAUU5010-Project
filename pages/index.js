import { useState } from 'react';
import StationSearchBar from '../components/StationSearchbar';
import { timeConvert, fetchDepartures } from '../lib/utils';
import Swal from 'sweetalert2';

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

const Index = () => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [departures, setDepartures] = useState([]);
  

  const postTicket = debounce(contents => {
    fetch(`${location.origin}/api`, {
      method: "post",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(contents)
    });
  }, 200);

  expireTickets();

  const buyTicket = data => {
    postTicket(data);
    Swal.fire(
      "Congratulations!",
      `You have bought a ticket from ${fromValue} to ${toValue}!`,
      'success')
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isFromValueValid && isToValueValid) {
      updateDepartures();
      console.log(departures);
    }
  }

  async function updateDepartures() {
    fetchDepartures(fromValue, toValue).then((results, err) => {
      if (err) {
        console.error(err)
      }
      setDepartures(results.filter(obj => obj.legs.every(leg => leg.mode === 'rail')));
      }
    );
  }

  return (
    <div class="container">
      <form onSubmit={handleOnSubmit} action="">
        <label for="fromStationSearchBar">From:</label>
        <StationSearchBar id="fromStationSearchBar" setValue={setFromValue} value={fromValue} valid={setFromValueValid} />
        <label for="toStationSearchBar">To:</label>
        <StationSearchBar id="toStationSearchBar"setValue={setToValue} value={toValue} valid={setToValueValid} />
        <button>Show departures</button>
      </form>
      <div class="departuresContainer">
        {departures.length > 0 &&
          <>
            <h2>Departures</h2>
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
          </>
        }
      </div>
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
      button {
        color: #fafafa;
        background-color: #360000;
        border: 0;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        flex-direction: row;
      }
    `}</style>
    </div>
  );
};

export default Index;
