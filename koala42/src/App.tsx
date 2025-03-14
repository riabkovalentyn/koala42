import React, { useEffect } from 'react';
import './App.css';
import MainTable from './components/MainTable';
import { fetchCharacters } from './utils/fetchCaracters';
import { useCharactersStore } from './services/store/useCharactersStore';


 const App: React.FC = () => {
    const setCharacters = useCharactersStore((state) => state.setCharacters);
    useEffect(() => {
      const loadCharacters = async () => {
        const characters = await fetchCharacters();
        setCharacters(characters);
      }
      loadCharacters();
    }, [setCharacters]);
   

  
  return (
    <div className="container mx-auto p-6">
      <h1 className='text-3xl font-bold mb-6 text-center'>Hi im Table</h1>
      <MainTable/>
    </div>
  );

};
export default App;
