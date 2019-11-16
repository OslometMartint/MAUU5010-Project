import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timerInterval = setInterval(() => { setDate('test') }, 1000)
        return () => {
            clearInterval(timerInterval)
        }
    })
    return (<span className="clock">{date}</span>)
}

export default Clock;