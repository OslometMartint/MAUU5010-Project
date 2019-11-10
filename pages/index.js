import {useState} from 'react';
import StationSearchBar from '../components/StationSearchbar';

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};


const Index = () => {
  const [fromValue, setFromValue] = useState('');
  const [isFromValueValid, setFromValueValid] = useState(false);
  const [toValue, setToValue] = useState('');
  const [isToValueValid, setToValueValid] = useState(false);
  const saveNote = debounce(contents => {
    fetch(`${location.origin}/api`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(contents),
    });
  }, 200);
  const buyTicket = () => {
    saveNote({test: 'lol'});
  }
  return (
    <div>
      <h1>Hello Next.js</h1>
      Fra:
      <StationSearchBar setValue={setFromValue} value={fromValue} valid={setFromValueValid}/>
      Til: 
      <StationSearchBar setValue={setToValue} value={toValue} valid={setToValueValid}/>
      <button onClick={buyTicket}>Buy ticket</button>
    </div>
  )};
  
  export default Index;