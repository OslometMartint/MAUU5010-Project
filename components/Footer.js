import Link from 'next/link';
const Footer = () => {
  return (
    <footer>
      <style jsx>{`
        footer {
          height: 50px;
          width: 100%;
          background: #360000;
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 0;
        }
        button {
          color: #fafafa;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 0;
          background: transparent;
          margin-left: 0.8em;
        }
        button:focus {
          background: #fafafa;
          color: #360000;
          outline: 0;
        }
      `}</style>
      <nav>
        <Link href="/">
          <a>
            <i className="material-icons">menu</i>
            Menu
          </a>
        </Link>
        <Link href="/tickets">
          <a>
            <i className="material-icons">local_play</i>
            Tickets
          </a>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
