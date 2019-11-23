import React, { useState } from "react";

function StationSearchBar({ id, setValue, value, valid }) {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const handleOnChange = e => {
    setSearchInput(e.target.value);
    valid(e.target.value.toLowerCase() === value.toLowerCase());
    if (e.nativeEvent.type === "input") {
      getSuggestions();
    }
    setActiveSuggestion(-1);
  };

  const handleOnKeyPress = e => {
    setSearchInput(e.target.value);
    valid(e.target.value.toLowerCase() === value.toLowerCase());
  };
  const handleOnKeyDown = e => {
    const eventSuggestions = document.querySelectorAll(`#${id}~.has-suggestions li`);
    if(e.key === 'Escape') {
        setSuggestions([]);
        setSearchInput('');
        setActiveSuggestion(-1);
        document.getElementById(id).focus();
    }
    if(e.target.tagName === 'LI' && (e.key === 'Enter' || e.key === ' ')) {
        handleSuggestionOnClick(e);
    }
    if (e.key === 'ArrowDown' && suggestions.length > 0) {
      setNextSuggestion(eventSuggestions);
    }
    if (e.key === 'ArrowUp' && suggestions.length > 0) {
      setPreviousSuggestion(eventSuggestions);
    }
  };

  const setNextSuggestion = elements => {
    let num;
    if (activeSuggestion + 1 < suggestions.length) {
      num = activeSuggestion + 1;
    } else {
      num = 0;
    }
    elements[num].focus();
    setActiveSuggestion(num);
  };
  const setPreviousSuggestion = elements => {
    let num;
    if (activeSuggestion - 1 >= 0) {
      num = activeSuggestion - 1;
    } else {
      num = suggestions.length - 1;
    }
    elements[num].focus();
    setActiveSuggestion(num);
  };

  const handleSuggestionOnClick = e => {
    setSearchInput(e.target.textContent);
    setValue(e.target.textContent);
    setSuggestions([]);
    valid(true);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      if (
        suggestions.findIndex(
          a => a.toLowerCase() === searchInput.toLowerCase()
        ) > -1
      ) {
        valid(true);
        setValue(searchInput);
        setSuggestions([]);
      }
    }, 300);
    setActiveSuggestion(-1);
  };

  async function getSuggestions() {
    if (!searchInput) {
      setSuggestions([]);
      return;
    }

    const url =
      "https://api.entur.io/geocoder/v1/autocomplete?text=" +
      searchInput +
      "&size=5&lang=no";
    const res = await fetch(url);
    const data = await res.json();

    const newSuggestions = [];
    for (let i = 0; i < data.features.length; i++) {
      newSuggestions.push(data.features[i].properties.label);
    }
    setSuggestions(newSuggestions);
  }

  return (
    <div role="combobox" aria-haspopup="listbox" aria-owns={id+"list"} aria-expanded={suggestions.length > 0}>
      <style jsx>{`
        input {
          display: block;
          width: 100%;
          height: 45px;
          line-height: 40px;
          font-size: 1.25em;
          padding: 0.75em;
        }
        input:focus,
        .input-active {
          outline: 2px solid;
        }
        ul {
          padding-left: 0;
          cursor: pointer;
          list-style: none;
          position: absolute;
          background-color: white;
          margin-top: 0;
          width: 100%;
          z-index: 10;
        }
        .has-suggestions {
          border: 2px solid;
          border-top: 0;
          padding: 10px;
        }
        li:not(:last-child) {
          border-bottom: 1px solid;
          padding-bottom: 5px;
          margin-bottom: 5px;
        }
        li {
          padding: 5px;
        }
        li:focus {
          background: #360000;
          color: white;
          outline: 5px solid;
        }
      `}</style>
      <input
        aria-autocomplete="list"
        aria-controls={id + 'list'}
        aria-activedescendant={id + 'list'}
        id={id}
        value={searchInput}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyPress={handleOnKeyPress}
        onKeyDown={handleOnKeyDown}
        type="text"
        className={suggestions.length > 0 ? "input-active" : ""}
      />
      <ul 
      id={id+'list'} 
      role="listbox"
      aria-labelledby={id}
      className={suggestions.length > 0 ? "has-suggestions" : ""}>
        {Array.isArray(suggestions) &&
          suggestions.map((suggestion, i) => {
            return (
              <li
                role="option"
                key={i}
                tabIndex="-1"
                aria-selected={i === activeSuggestion}
                onKeyDown={handleOnKeyDown}
                onClick={handleSuggestionOnClick}
              >
                {suggestion}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default StationSearchBar;
