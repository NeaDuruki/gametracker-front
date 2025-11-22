import React, { useState, useEffect } from 'react';
import { gameService } from './services/api';
import GameLibrary from './components/GameLibrary';
import GameForm from './components/GameForm';
import Dashboard from './components/Dashboard';
import { useTheme } from './context/ThemeContext';
import './App.css';
import './styles/components.css';

function App() {
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState('library');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isDark, toggleTheme } = useTheme();

  // Cargar juegos al iniciar
  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await gameService.getAll();
      setGames(response.data);
    } catch (error) {
      console.error('Error loading games:', error);
      setError('No se pudo conectar con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (gameData) => {
    try {
      setError(null);
      await gameService.create(gameData);
      await loadGames();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding game:', error);
      setError('Error al agregar el juego. Verifica que el backend esté funcionando.');
    }
  };

  const handleRetry = () => {
    loadGames();
  };

  return (
    <div className="App" data-theme={isDark ? 'dark' : 'light'}>
      <header className="App-header">
        <div className="header-content">
          <h1>🎮 GameTracker</h1>
          <p>Tu biblioteca personal de videojuegos</p>
          <div className="theme-indicator">
            {isDark ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
          </div>
        </div>
        
        <nav className="nav-buttons">
          <button 
            className={`nav-btn ${currentView === 'library' ? 'active' : ''}`}
            onClick={() => setCurrentView('library')}
            disabled={loading}
          >
            📚 Biblioteca
            {currentView === 'library' && <span className="nav-indicator"></span>}
          </button>
          <button 
            className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
            disabled={loading}
          >
            📊 Estadísticas
            {currentView === 'dashboard' && <span className="nav-indicator"></span>}
          </button>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            disabled={loading}
          >
            {isDark ? '☀️' : '🌙'}
            <span className="theme-tooltip">
              {isDark ? 'Modo Claro' : 'Modo Oscuro'}
            </span>
          </button>
        </nav>
      </header>

      <main className="main-content">
        {/* Mensaje de error */}
        {error && (
          <div className="error-banner">
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <span className="error-message">{error}</span>
              <div className="error-actions">
                <button className="btn-retry" onClick={handleRetry}>
                  🔄 Reintentar
                </button>
                <button 
                  className="btn-dismiss" 
                  onClick={() => setError(null)}
                >
                  ✖️ Ocultar
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'library' && (
          <>
            <div className="action-bar">
              <div className="action-group">
                <button 
                  className="btn-add-game"
                  onClick={() => setShowForm(!showForm)}
                  disabled={loading}
                >
                  {showForm ? (
                    <>
                      <span className="btn-icon">✖️</span>
                      Cancelar
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">➕</span>
                      Agregar Juego
                    </>
                  )}
                </button>
                
                <div className="view-stats">
                  <div className="stat-badge">
                    <span className="stat-number">{games.length}</span>
                    <span className="stat-label">juegos</span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-number">
                      {games.filter(game => game.completed).length}
                    </span>
                    <span className="stat-label">completados</span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-number">
                      {games.filter(game => game.favorite).length}
                    </span>
                    <span className="stat-label">favoritos</span>
                  </div>
                </div>
              </div>
              
              <div className="view-info">
                {!loading && games.length > 0 && (
                  <div className="quick-stats">
                    <span className="games-count">
                      {games.length} juego{games.length !== 1 ? 's' : ''} en tu biblioteca
                    </span>
                    <span className="stats-separator">•</span>
                    <span className="theme-info">
                      {isDark ? '🌙 Oscuro' : '☀️ Claro'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <GameLibrary 
              games={games} 
              onGameUpdate={loadGames} 
              loading={loading}
            />
          </>
        )}

        {currentView === 'dashboard' && (
          <Dashboard games={games} loading={loading} />
        )}

        {showForm && (
          <GameForm 
            onSubmit={addGame} 
            onCancel={() => setShowForm(false)} 
          />
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">
            Desarrollado con ❤️ | <strong>GameTracker</strong> © 2024
          </p>
          <div className="footer-tech">
            <span className="tech-item">React</span>
            <span className="tech-item">Node.js</span>
            <span className="tech-item">MongoDB</span>
            <span className="theme-status">
              {isDark ? '🌙' : '☀️'} 
              {isDark ? ' Modo Oscuro' : ' Modo Claro'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;