// Importing logo and styles for the App
import logo from './logo.svg';
import './App.css';

// Importing React and necessary components from react-router-dom
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList'; // Import the PokemonList component

// Main App component
function App() {
  return (
    // Using the BrowserRouter to enable routing in the app
    <Router>
      <div>
        {/* Navigation bar with links to different routes */}
        <nav>
          <ul>
            <li> <Link to="/"> Home</Link></li>
            <li> <Link to="/story-missions">Story Missions </Link></li>
            <li><Link to="/locations">Locations</Link></li>
          </ul>
        </nav>

        {/* Horizontal line for visual separation */}
        <hr />

        {/* Defining routes using react-router-dom */}
        <Routes>
          {/* Route for the home page, rendering the PokemonList component */}
          <Route path="/" element={<PokemonList />} />
        </Routes>

        {/* Additional routes (commented out for now) */}
        {/* <Route path="/story-missions" component={StoryMissions} />
        <Route path="/locations" component={Locations} /> */}
      </div>
    </Router>
  );
}

// Exporting the App component as the default export
export default App;
