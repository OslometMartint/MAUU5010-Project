import React, { useState, useEffect } from 'react';

function StationSearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState();

    useEffect(() => {
        getSuggestions();
    });

    const handleOnChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleOnKeyPress = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSuggestionOnClick = (e) => {
        setSearchInput(e.target.textContent);
        setSearchTerm("");
    };

    async function getSuggestions() {
        if (!searchTerm) {
            setSuggestions("");
            return;
        }

        const url = "https://api.entur.io/geocoder/v1/autocomplete?text=" + searchTerm + "&size=5&lang=no";
        const res = await fetch(url);
        const data = await res.json();

        const newSuggestions = [];

        for (let i = 0; i < data.features.length; i++) {
            newSuggestions.push(data.features[i].properties.label);
        }
        console.log(newSuggestions)
        setSuggestions(newSuggestions);
    }

    return (
        <div>
            <input value={searchInput} onChange={handleOnChange} onKeyPress={handleOnKeyPress} type="text"></input>
            <ul>
                {Array.isArray(suggestions) && 
                suggestions.map((suggestion, i) => {
                    return (<li key={i} onClick={handleSuggestionOnClick}>{suggestion}</li>)
                })}
            </ul>
        
        <style jsx>{`
            ul {
                padding-left: 0;
                cursor:pointer;
            }​
        `}</style>
    </div>
    );
}

export default StationSearchBar;