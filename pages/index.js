import {useState} from 'react';
import StationSearchBar from '../components/StationSearchbar';


const Index = () => {
  const [fromValue, setFromValue] = useState('');
  const [isFromValueValid, setFromValueValid] = useState(false);
  const [toValue, setToValue] = useState('');
  const [isToValueValid, setToValueValid] = useState(false);
  return (
    <div>
      <h1>Hello Next.js</h1>
      Fra:
      <StationSearchBar setValue={setFromValue} value={fromValue} valid={setFromValueValid}/>
      Til: 
      <StationSearchBar setValue={setToValue} value={toValue} valid={setToValueValid}/>
    </div>
  )};
  
  export default Index;