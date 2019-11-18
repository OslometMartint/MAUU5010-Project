import React, { useState, useEffect } from 'react';

const Countdown = ({dateAsString}) => {
    const [date, setDate] = useState(new Date(dateAsString))
    const finalDate = new Date(dateAsString);
    const timeDiff = Math.abs(new Date() - finalDate); 

    useEffect(() => {
        const timerInterval = setInterval(() => { setDate(new Date(timeDiff).toLocaleTimeString('nb-NO')) }, 1000);
        return () => {
            clearInterval(timerInterval)
        }
    })
    console.log(date);
    return (<time className="countdown">{'' + date}</time>)
}

export default Countdown;