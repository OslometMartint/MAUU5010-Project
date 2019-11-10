import Link from 'next/link';
import {activeTickets, expiredTickets} from '../data/tickets';
const Ticket = ({title, text, small, price, url}) => {
    return (
        <>
            <style jsx>{`
                li {
                    border: 2px solid #360000;
                    width: 330px;
                    margin-bottom: 1em;
                    padding: 1em;
                }
                a {
                    text-decoration: none;
                    color: #2B2B2B;
                }
                h3 {
                    margin-top: 0;
                }
                small.price {float: right;}
            `}</style>
            <li>
                <Link href={url}>
                    <a>
                        <h3>{title}</h3>
                        <p>{text}</p>
                        <small>{small}</small><small class="price">{price}</small>
                    </a>
                </Link>
            </li>
        </>
    )
}

const Tickets = () => {
    return (
        <>
            <style jsx>{`
                ul {
                    list-style: none;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
            `}</style>
            <ul>
                {activeTickets.length > 0 &&                 
                    <>
                        <h2>Aktive</h2>
                        {activeTickets.map(ticket => 
                            <Ticket title={ticket.title} text={ticket.text} small={ticket.small} price={ticket.price} url={ticket.url}/>)}
                        
                    </>
                }
                {expiredTickets.length > 0 &&
                <>
                    <h2>Utløpt</h2>
                    {expiredTickets.map(ticket =>  
                    <Ticket title={ticket.title} text={ticket.text} small={ticket.small} price={ticket.price} url={ticket.url}/>)}
                </>
                }
            </ul>
        </>
    )
}

export default Tickets