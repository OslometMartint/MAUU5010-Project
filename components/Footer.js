import Menu from "./Menu";
import { useState } from "react";

const Footer = () => {
    const [isOpen, setOpen] = useState(false);
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
                  }`
        }</style>
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
     </footer>
    ) 
   };
   
   export default Footer;
   