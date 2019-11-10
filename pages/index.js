import {useState} from 'react';
import StationSearchBar from '../components/StationSearchbar';


const Index = () => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  return (
    <div>
      <h1>Hello Next.js</h1>
      Fra:
      <StationSearchBar setValue={setFromValue} value={fromValue}/>
      Til: 
      <StationSearchBar setValue={setToValue} value={toValue}/>
    </div>
  )};
  
  export default Index;