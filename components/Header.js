import { useState } from "react";
import Menu from "./Menu";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
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
        h1 {
          color: #fafafa;
          font-size: 1em;
          margin: 0 1.25em;
          text-align: right;
        }
      `}</style>
      <button
        aria-label="toggle menu"
        aria-expanded={isOpen}
        aria-controls="menu"
        onClick={() => setOpen(!isOpen)}
      >
        <i className="material-icons">{isOpen ? "menu_open" : "menu"}</i>
        Menu
      </button>
      <Menu id="menu" open={isOpen} closeMenu={() => setOpen(false)} />
      <h1>Norwegian Rail</h1>
    </header>
  );
};

export default Header;
