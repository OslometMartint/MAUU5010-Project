import QRCode from 'qrcode';

import Swal from "sweetalert2";


const Control = ({id}) => {
    const showControl = () => {
        QRCode.toDataURL(id)
        .then(url => {
            Swal.fire({
                imageUrl: url,
                imageAlt: 'Control QR code',
                buttonsStyling: false
              })
        })
        .catch(err => {
        console.error(err)
        })
    }
    return (
        <>
        <hr />
    <button 
        onClick={showControl}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && showControl()}
        >Control</button>
        <style jsx>{`
        button {
            height: 50px; 
            font-size: 16px;
            font-weight: bold;
            padding: 0 40px;
            background-color: #360000;
            color: white;
            cursor: pointer;
            display: block;
            margin: 0 auto;
        }
        button:focus {
            background-color: white;
            color: #360000;
            -webkit-appearance: none;
            outline: 4px solid;
        }
        `}</style>
        </>
        )
}
export default Control;