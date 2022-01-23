import './App.css';
import Navbar from './components/Navbar/Navbar';
import GameCard from './components/GameCard';
import React from 'react';


function App() {
  return (
    <div className='App'>
      <Navbar/>
      <GameCard/>
    </div>
    
  );
}

export default App;
