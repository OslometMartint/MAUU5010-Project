import React, { useState, useEffect } from 'react';

function StationSearchBar({ setValue, value, valid }) {
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleOnChange = (e) => {
        setSearchInput(e.target.value);
        valid(e.target.value.toLowerCase() === value.toLowerCase());
        console.log(e.nativeEvent.type);
        if (e.nativeEvent.type === 'input') {
            getSuggestions();
        }
    };

    const handleOnKeyPress = (e) => {
        setSearchInput(e.target.value);
        console.log('keypress', e.target.value);
        valid(e.target.value.toLowerCase() === value.toLowerCase());
    };

    const handleSuggestionOnClick = (e) => {
        setSearchInput(e.target.textContent);
        setValue(e.target.textContent);
        setSuggestions([]);
        valid(true);
    };

    const handleOnBlur = () => {
        setTimeout(() => {
            if (suggestions.findIndex(a => a.toLowerCase() === searchInput.toLowerCase()) > -1) {
                valid(true);
                setValue(searchInput);
                setSuggestions([])
            }
        }, 300)
    }

    async function getSuggestions() {
        if (!searchInput) {
            setSuggestions([]);
            return;
        }

        const url = "https://api.entur.io/geocoder/v1/autocomplete?text=" + searchInput + "&size=5&lang=no";
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
            <input value={searchInput} onChange={handleOnChange} onBlur={handleOnBlur} onKeyPress={handleOnKeyPress} type="text" />
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