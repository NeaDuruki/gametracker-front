import React from 'react';
import GameCard from './GameCard';

const GameLibrary = ({ games, onGameUpdate }) => {
  if (games.length === 0) {
    return (
      <div className="game-library">
        <div className="library-header">
          <h1>📚 Tu Biblioteca</h1>
          <div className="library-stats">
            <div className="stat">Total: 0 juegos</div>
            <div className="stat">Completados: 0</div>
            <div className="stat">Horas: 0h</div>
          </div>
        </div>
        
        <div className="empty-state">
          <p>🎮 Tu biblioteca está vacía</p>
          <p>¡Agrega tu primer juego para comenzar!</p>
        </div>
      </div>
    );
  }

  const completedGames = games.filter(game => game.completed).length;
  const totalHours = games.reduce((sum, game) => sum + (parseInt(game.hoursPlayed) || 0), 0);

  return (
    <div className="game-library">
      <div className="library-header">
        <h1>📚 Tu Biblioteca</h1>
        <div className="library-stats">
          <div className="stat">Total: {games.length} juegos</div>
          <div className="stat">Completados: {completedGames}</div>
          <div className="stat">Horas: {totalHours}h</div>
        </div>
      </div>

      <div className="library-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="🔍 Buscar juegos..." 
          />
        </div>
        <div className="filter-buttons">
          <button className="active">Todos</button>
          <button>Completados</button>
          <button>En Progreso</button>
        </div>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <GameCard 
            key={game._id} 
            game={game} 
            onUpdate={onGameUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default GameLibrary;