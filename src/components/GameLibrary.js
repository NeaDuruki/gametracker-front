import React, { useState } from 'react';
import GameCard from './GameCard';

const GameLibrary = ({ games, onGameUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, in-progress

  // Filtrado de juegos
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'completed' ? game.completed :
      filter === 'in-progress' ? !game.completed : true;
    
    return matchesSearch && matchesFilter;
  });

  // Estadísticas
  const totalGames = games.length;
  const completedGames = games.filter(game => game.completed).length;
  const totalHours = games.reduce((sum, game) => sum + (parseInt(game.hoursPlayed) || 0), 0);
  const averageRating = games.length > 0 
    ? (games.reduce((sum, game) => sum + (parseInt(game.rating) || 0), 0) / games.length).toFixed(1)
    : 0;

  if (games.length === 0) {
    return (
      <div className="game-library">
        <div className="library-header">
          <h1>📚 Tu Biblioteca</h1>
          <div className="library-stats">
            <div className="stat">Total: 0 juegos</div>
            <div className="stat">Completados: 0</div>
            <div className="stat">Horas: 0h</div>
            <div className="stat">Rating: 0⭐</div>
          </div>
        </div>
        
        <div className="empty-state">
          <p>🎮 Tu biblioteca está vacía</p>
          <p>¡Agrega tu primer juego para comenzar!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-library">
      <div className="library-header">
        <h1>📚 Tu Biblioteca</h1>
        <div className="library-stats">
          <div className="stat">Total: {totalGames} juegos</div>
          <div className="stat">Completados: {completedGames}</div>
          <div className="stat">Horas: {totalHours}h</div>
          <div className="stat">Rating: {averageRating}⭐</div>
        </div>
      </div>

      <div className="library-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="🔍 Buscar juegos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completados
          </button>
          <button 
            className={filter === 'in-progress' ? 'active' : ''}
            onClick={() => setFilter('in-progress')}
          >
            En Progreso
          </button>
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="empty-state">
          <p>🔍 No se encontraron juegos</p>
          <p>Intenta con otros términos de búsqueda o filtros</p>
        </div>
      ) : (
        <div className="games-grid">
          {filteredGames.map(game => (
            <GameCard 
              key={game._id} 
              game={game} 
              onUpdate={onGameUpdate}
            />
          ))}
        </div>
      )}

      <div className="library-footer">
        <p>
          Mostrando {filteredGames.length} de {totalGames} juegos
          {searchTerm && ` para "${searchTerm}"`}
          {filter !== 'all' && ` (${filter === 'completed' ? 'Completados' : 'En progreso'})`}
        </p>
      </div>
    </div>
  );
};

export default GameLibrary;