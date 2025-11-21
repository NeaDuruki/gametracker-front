import React, { useState, useEffect } from 'react';
import { gameService } from './services/api';
import GameLibrary from './components/GameLibrary';
import GameForm from './components/GameForm';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const response = await gameService.getAll();
      setGames(response.data);
    } catch (error) {
      console.error('Error loading games:', error);
    }
  };

  const addGame = async (gameData) => {
    try {
      await gameService.create(gameData);
      loadGames(); 
      setShowForm(false); 
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 GameTracker</h1>
        <p>Tu biblioteca personal de videojuegos</p>
      </header>

      <main>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '➕ Agregar Juego'}
        </button>

        {showForm && (
          <GameForm onSubmit={addGame} onCancel={() => setShowForm(false)} />
        )}

        <GameLibrary games={games} onGameUpdate={loadGames} />
      </main>
    </div>
  );
}

export default App;