import React, { useState, useEffect } from 'react';
import { gameService } from './services/api';
import GameLibrary from './components/GameLibrary';
import GameForm from './components/GameForm';
import Dashboard from './components/Dashboard';
import './App.css';
import './styles/components.css';

function App() {
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState('library'); // 'library' o 'dashboard'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const response = await gameService.getAll();
      setGames(response.data);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (gameData) => {
    try {
      await gameService.create(gameData);
      loadGames();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding game:', error);
      alert('Error al agregar el juego. Verifica que el backend esté corriendo.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🎮 GameTracker</h1>
          <p>Tu biblioteca personal de videojuegos</p>
        </div>
        
        <nav className="nav-buttons">
          <button 
            className={`nav-btn ${currentView === 'library' ? 'active' : ''}`}
            onClick={() => setCurrentView('library')}
          >
            📚 Biblioteca
          </button>
          <button 
            className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            📊 Estadísticas
          </button>
        </nav>
      </header>

      <main className="main-content">
        {currentView === 'library' && (
          <>
            <div className="action-bar">
              <button 
                className="btn-add-game"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? '✖️ Cancelar' : '➕ Agregar Juego'}
              </button>
            </div>

            {loading ? (
              <div className="loading">Cargando juegos...</div>
            ) : (
              <GameLibrary games={games} onGameUpdate={loadGames} />
            )}
          </>
        )}

        {currentView === 'dashboard' && (
          <Dashboard />
        )}

        {showForm && (
          <GameForm 
            onSubmit={addGame} 
            onCancel={() => setShowForm(false)} 
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Desarrollado con ❤️ | GameTracker © 2024</p>
      </footer>
    </div>
  );
}

export default App;