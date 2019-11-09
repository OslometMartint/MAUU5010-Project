import {useState} from 'react';
import Menu from './Menu';


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
        }
        h1 {
            color: #fafafa;
            font-size: 1em;
            margin: 0 1.25em;
            text-align: right;
        }
     `}</style>
     <button onClick={() => setOpen(!isOpen)}>Menu</button>
     <Menu open={isOpen} closeMenu={() => setOpen(false)}/>
     <h1>Norwegian Rail</h1>
  </header>
 ) 
};

export default Header;
