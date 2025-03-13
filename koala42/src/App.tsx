import React from 'react';
import './App.css';
import {data} from './services/data/example-data.json';


 interface DataItem {
  id: number;
  name: string;
  gender: string;
  ability: string;
  minimalDistance: number;
  waigth: number;
  born: string;
  inSpaceSince: string;
  beerConsumption: number;
  knowsTheAnswer: boolean;
  children?: DataItem[];
 }


 const App: React.FC = () => {
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
