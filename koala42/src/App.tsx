import React from 'react';
import './App.css';
import MainTable from './components/MainTable';

 const App: React.FC = () => {
  
  return (
    <div className="container mx-auto p-6">
      <h1 className='text-3xl font-bold mb-6 text-center'>Hi im Table</h1>
      <MainTable/>
    </div>
  );
}

export default App;
