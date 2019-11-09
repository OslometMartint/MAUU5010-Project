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
        h1 {
          color: #fafafa;
          font-size: 1em;
          margin: 0 1.25em;
          text-align: right;
        }
      `}</style>
      <h1>Norwegian Rail</h1>
    </header>
  );
};

export default Header;
