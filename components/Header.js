import Link from 'next/link';
const Header = () => {
  return (
    <header>
      <style jsx>{`
        header {
          height: 50px;
          width: 100%;
          background: #360000;
          display: flex;
          align-items: center;
        }
        h1, a {
          color: #fafafa;
          font-size: 1em;
          margin: 0 1.25em;
          text-align: right;
          text-decoration: none;
        }
        button {
          color: #360000;
          background-color: #fafafa;
        }
      `}</style>
      <h1><Link href="/"><a>
      Norwegian Rail
      </a>
      </Link></h1>
    </header>
  );
};
export default Header;
