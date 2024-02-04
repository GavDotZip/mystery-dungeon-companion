import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList'; // Import the PokemonList component


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li> <Link to="/"> Home</Link></li>
            <li> <Link to="/story-missions">Story Missions </Link></li>
            <li><Link to="/locations">Locations</Link></li>
          </ul>
        </nav>

        <hr />

        <Routes exact path="/" component={PokemonList} />
        {/* <Route path="/story-missions" component={StoryMissions} />
        <Route path="/locations" component={Locations} /> */}
      </div>
    </Router>
  );
}

export default App;
