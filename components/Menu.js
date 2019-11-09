const Menu = ({open, closeMenu}) => {
    return (
    <nav>
        <style jsx>{`
           nav {
               height: 100vh;
               width: 40%;
               position: absolute;
               background: #360000;
               top: 50px;
               left: ${open ? '0' : '-40%'};
               color: #fafafa;
               transition: all 0.25s ease-in; 
           }
           button {color: #fafafa;}
        `}</style>
        <button onClick={closeMenu}>X</button>
        <ul>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
        </ul>
     </nav>
    ) 
   };
   
   export default Menu;
   