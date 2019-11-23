import { useState } from "react";
import StationSearchForm from "../components/StationSearchForm";
import { timeConvert, expireTickets } from "../lib/utils";

import Swal from "sweetalert2";

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
      "success"
    );
  };

  return (
    <div>
      <StationSearchForm 
        setFromValue={setFromValue} 
        fromValue={fromValue}
        setToValue={setToValue} 
        toValue={toValue}
        setDepartures={setDepartures}
      />
      {departures.length > 0 && (
        <>
          <h2>Departures</h2>
          <ul role="list">
            {departures.map((departure, idx) => (
              <li key={idx}>
                <h3>
                  {departure.startTime.slice(11, 16)} -{" "}
                  {departure.endTime.slice(11, 16)}
                </h3>
                {timeConvert(departure.duration)}
                Price: {Math.round(departure.duration / 120)},-
                <button onClick={() => buyTicket(departure)}>Buy ticket</button>
              </li>
            ))}
          </ul>
        </>
      )}
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
          color: #2b2b2b;
        }
        a:focus {
          outline: 0;
        }
        h3 {
          margin-top: 0;
          float: right;
        }
      `}</style>
    </div>
  );
};

export default Index;
