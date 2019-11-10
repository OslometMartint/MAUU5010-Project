import Link from 'next/link';
import {withRouter} from 'next/router';

const Footer = ({router}) => {
    console.log(router.pathname);
  return (
    <footer>
      <style jsx>{`
        footer {
          height: 50px;
          width: 100%;
          background: #360000;
          display: flex;
          align-items: center;
          position: sticky;
          bottom: 0;
        }
        nav {
            display: flex;
            flex: 1;
            height: 100%;
            align-items: center;
        }
        a {
          color: #fafafa;
          display: flex;
          flex-direction: column;
          flex: 1;
          align-items: center;
          border: 0;
          background: transparent;
          text-decoration: none;
          height: 100%;
          justify-content: center;
        }
        a:focus, a.active {
          background: #fafafa;
          color: #360000;
          outline: 0;
        }
      `}</style>
      <nav>
        <Link href="/">
          <a className={router.pathname === '/' ? 'active' : ''}>
            <i className="material-icons">directions_railway</i>
            Avganger
          </a>
        </Link>
        <Link href="/tickets">
          <a className={router.pathname === '/tickets' ? 'active' : ''}>
            <i className="material-icons">local_play</i>
            Tickets
          </a>
        </Link>
      </nav>
    </footer>
  );
};

export default withRouter(Footer);
