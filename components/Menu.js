import Link from "next/link";

const Menu = ({id, open, closeMenu}) => {
    const handleKeyUp = (e) => {
        console.log(e);
        if(e.key === 'Escape') {
            closeMenu();
        }
    }
    return (
    <nav id={id} onKeyUp={handleKeyUp}>
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
        `}</style>
        <ul>
            <li><Link href="/"><a>Test</a></Link></li>
            <li>Test</li>
            <li>Test</li>
        </ul>
     </nav>
    ) 
   };
   
   export default Menu;
   