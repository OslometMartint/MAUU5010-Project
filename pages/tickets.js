import { activeTickets, expiredTickets } from "../data/tickets";
import Head from 'next/Head';
import { timeConvert, debounce } from "../lib/utils";
import Countdown from "../components/Countdown";
import Control from "../components/Control";
import Swal from "sweetalert2";

const Ticket = ({ ticket }) => {
  function ticketTrainrideHasStarted(ticket) {
    const trainStartTime = new Date(ticket.startTime);
    const currentTime = new Date();
    return trainStartTime < currentTime;
  }

  function ticketTrainrideHasEnded(ticket) {
    const trainEndTime = new Date(ticket.endTime);
    const currentTime = new Date();
    return trainEndTime < currentTime;
  }

  //WIP
  async function findTicketTrainTimeAlternatives(from, to, currentStartTime) {
    fetchDepartures(from, to).then((results, err) => {
      if (err) {
        console.error(err);
      }
      console.log(results);
      const trainTimeAlterantives = results.filter(
        obj => obj.startTime === currentStartTime
      );
      console.log(trainTimeAlterantives);
    });
  }

  //WIP

const refundTicket = debounce(ticket => {
    console.log(ticket);
    fetch(`${location.origin}/api/delete`, {
        method: "delete",
        credentials: "same-origin",
        headers: {
        "content-type": "application/json"
        },
        body: JSON.stringify(ticket)
    });
    }, 200);
  

  //WIP
  const handleChangeTime = e => {
    Swal.fire('Work in progress');
  };

  //WIP
  const handleRefund = e => {
    Swal.fire({
      title: "<h2>Are you sure you want to refund this ticket?",
      text:
        ticket.legs[0].fromPlace.name +
        " - " +
        ticket.legs[ticket.legs.length - 1].toPlace.name +
        ": " +
        new Date(ticket.startTime).toLocaleTimeString("nb-NO", {
          hour: "2-digit",
          minute: "2-digit"
        }) +
        " - " +
        new Date(ticket.endTime).toLocaleTimeString("nb-NO", {
          hour: "2-digit",
          minute: "2-digit"
        }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#360000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, refund"
    }).then(result => {
      if (result.value) {
        refundTicket(ticket);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
    <Head><title>Tickets - Norwegian Rail</title></Head>
      <style jsx>{`
        li {
          border: 2px solid #360000;
          width: 330px;
          margin-bottom: 1em;
          margin-left: 1em;
          padding: 1em;
        }
        h3 {
          margin-top: 0;
        }
        small.price {
          float: right;
        }
        button {
          height: 50px;
          font-size: 16px;
          font-weight: bold;
          padding: 0 10px;
          background-color: #360000;
          color: white;
          cursor: pointer;
        }
        button:last-child {
            float: right;
        }
        button:focus {
          background-color: white;
          color: #360000;
          -webkit-appearance: none;
          outline: 4px solid;
        }
      `}</style>
      <li>
        <h3>
          {ticket.legs[0].fromPlace.name} -{" "}
          {ticket.legs[ticket.legs.length - 1].toPlace.name}
        </h3>
        <p>
          {new Date(ticket.startTime).toLocaleTimeString("nb-NO", {
            hour: "2-digit",
            minute: "2-digit"
          })}{" "}
          -{" "}
          {new Date(ticket.endTime).toLocaleTimeString("nb-NO", {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>
        <small>{timeConvert(ticket.duration)}</small>
        <small className="price">{Math.round(ticket.duration / 120)} NOK</small>
        {!ticketTrainrideHasStarted(ticket) &&!ticketTrainrideHasEnded(ticket) && (
            <>
              <hr />

              <p>
                Remaining time for changes:{" "}
                <Countdown dateAsString={ticket.startTime} />
              </p>
              <button onClick={handleChangeTime}>Change date/time</button>
              <button onClick={handleRefund}>Refund ticket</button>
            </>
          )}
            {ticketTrainrideHasStarted(ticket) && !ticketTrainrideHasEnded(ticket) && <Control id={ticket.id}/>}
      </li>
    </>
  );
};

const Tickets = () => {
  return (
    <>
      <style jsx>{`
        ul {
          list-style: none;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        h2 {
          text-align: center;
        }
      `}</style>
      {activeTickets.length > 0 && (
        <>
          <h2>Active Tickets</h2>
          <ul>
            {activeTickets.map((ticket, idx) => (
              <Ticket key={idx} ticket={ticket} />
            ))}
          </ul>
        </>
      )}
      {expiredTickets.length > 0 && (
        <>
          <h2>Expired Tickets</h2>
          <ul>
            {expiredTickets.map((ticket, idx) => (
              <Ticket key={idx} ticket={ticket} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Tickets;
