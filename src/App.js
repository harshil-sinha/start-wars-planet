import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await axios.get('https://swapi.dev/api/planets/');
      setPlanets(response.data.results);
      setNextPage(response.data.next);
    };
    fetchPlanets();
  }, []);

  const fetchNextPage = async () => {
    if (nextPage) {
      const response = await axios.get(nextPage);
      setPlanets([...planets, ...response.data.results]);
      setNextPage(response.data.next);
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Planets Directory</h1>
      <div className="planets">
        {planets.map((planet, index) => (
          <div key={index} className="planet-card">
            <h2>{planet.name}</h2>
            <p><strong>Climate:</strong> {planet.climate}</p>
            <p><strong>Population:</strong> {planet.population}</p>
            <p><strong>Terrain:</strong> {planet.terrain}</p>
            <h3>Residents:</h3>
            <ul>
              {planet.residents.map((resident, index) => (
                <li key={index}>{resident}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={fetchNextPage}>Load More</button>
    </div>
  );
};

export default App;
