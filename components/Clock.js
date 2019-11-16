import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timerInterval = setInterval(() => { setDate(new Date().toLocaleTimeString('nb-NO')) }, 1000);
        return () => {
            clearInterval(timerInterval)
        }
    })
    console.log(date);
    return (<time className="clock">{'' + date}</time>)
}

export default Clock;