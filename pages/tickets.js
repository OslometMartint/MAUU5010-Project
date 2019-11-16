import Link from "next/link";
import { activeTickets, expiredTickets } from "../data/tickets";
import { timeConvert } from "../lib/utils";
const Ticket = ({ ticket }) => {
  return (
    <>
      <style jsx>{`
        li {
          border: 2px solid #360000;
          width: 330px;
          margin-bottom: 1em;
          margin-left: 1em;
          padding: 1em;
        }
        li:focus-within {
          background: #360000;
        }
        a {
          text-decoration: none;
          color: #2b2b2b;
        }
        a:focus,
        li:focus-within h3,
        li:focus-within small {
          outline: 0;
          color: #fafafa;
        }
        h3 {
          margin-top: 0;
        }
        small.price {
          float: right;
        }
      `}</style>
      <li>
        <Link href="#">
          <a>
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
            <small className="price">
              {Math.round(ticket.duration / 120)} NOK
            </small>
          </a>
        </Link>
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
