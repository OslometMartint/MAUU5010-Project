import { useState } from "react";
import Head from 'next/Head';
import StationSearchForm from "../components/StationSearchForm";
import { timeConvert, expireTickets, debounce } from "../lib/utils";

import Swal from "sweetalert2";


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
    Swal.fire({
      title: "Congratulations!",
      text: `You have bought a ticket from ${fromValue} to ${toValue}!`,
      icon: "success",
      buttonsStyling: false
    });
  };

  return (
    <>
      <Head><title>Norwegian Rail</title></Head>
      <StationSearchForm 
        setFromValue={setFromValue} 
        fromValue={fromValue}
        setToValue={setToValue} 
        toValue={toValue}
        setDepartures={setDepartures}
      />
      {departures.length > 0 && (
        <div className="departures">
          <h2>Departures</h2>
          <ul role="list">
            {departures.map((departure, idx) => (
              <li key={idx}>
                <h3>
                  {departure.startTime.slice(11, 16)} -{" "}
                  {departure.endTime.slice(11, 16)}
                </h3>
                {timeConvert(departure.duration)}
                <span>Price: {Math.round(departure.duration / 120)} NOK</span>
                <hr />
                <button onClick={() => buyTicket(departure)}>Buy ticket</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
      .departures {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          width: 70%;
          justify-content: space-evenly;
        }
        @media screen and (max-width: 600px) {
          ul {
            width: 100%;
          }
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
          text-align: center;
          margin-top: 0;
        }
        span {
          float:right;
        }
        .departures button {
          display: block;
          width: 100%;
          height: 45px;
          background-color: #360000;
          color: white;
          font-size: 1em;
        }
        .departures button:focus {
          background-color: white;
          color: #360000;
          -webkit-appearance: none;
          outline: 4px solid;
        }
      `}</style>
    </>
  );
};

export default Index;
