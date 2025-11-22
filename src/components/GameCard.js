import React, { useState } from 'react';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';

const GameLibrary = ({ games, onGameUpdate, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Obtener plataformas y géneros únicos para los filtros
  const platforms = [...new Set(games.map(game => game.platform))];
  const genres = [...new Set(games.map(game => game.genre))];

  // Filtrado avanzado
  const filteredGames = games
    .filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = 
        filter === 'all' ? true :
        filter === 'completed' ? game.completed :
        filter === 'in-progress' ? !game.completed :
        filter === 'favorites' ? game.favorite :
        filter === 'wishlist' ? game.wishlist : true;
      
      const matchesPlatform = platformFilter === 'all' || game.platform === platformFilter;
      const matchesGenre = genreFilter === 'all' || game.genre === genreFilter;
      const matchesRating = ratingFilter === 'all' || game.rating >= parseInt(ratingFilter);

      return matchesSearch && matchesStatus && matchesPlatform && matchesGenre && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'hours':
          return (b.hoursPlayed || 0) - (a.hoursPlayed || 0);
        default:
          return 0;
      }
    });

  // Estadísticas
  const totalGames = games.length;
  const completedGames = games.filter(game => game.completed).length;
  const favoriteGames = games.filter(game => game.favorite).length;
  const wishlistGames = games.filter(game => game.wishlist).length;
  const totalHours = games.reduce((sum, game) => sum + (parseInt(game.hoursPlayed) || 0), 0);
  const averageRating = games.length > 0 
    ? (games.reduce((sum, game) => sum + (parseInt(game.rating) || 0), 0) / games.length).toFixed(1)
    : 0;

  // Mostrar skeletons mientras carga
  if (loading) {
    return (
      <div className="game-library">
        <div className="library-header">
          <h1>📚 Tu Biblioteca</h1>
          <div className="library-stats">
            <div className="stat skeleton-shimmer" style={{height: '50px', width: '120px'}}></div>
            <div className="stat skeleton-shimmer" style={{height: '50px', width: '120px'}}></div>
            <div className="stat skeleton-shimmer" style={{height: '50px', width: '120px'}}></div>
            <div className="stat skeleton-shimmer" style={{height: '50px', width: '120px'}}></div>
          </div>
        </div>

        <div className="library-controls">
          <div className="search-box">
            <div className="skeleton-shimmer" style={{height: '48px', borderRadius: '12px'}}></div>
          </div>
          <div className="filter-buttons">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="skeleton-shimmer" style={{height: '44px', width: '100px', borderRadius: '12px'}}></div>
            ))}
          </div>
        </div>

        <div className="advanced-filters">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="filter-group">
              <div className="skeleton-shimmer" style={{height: '16px', width: '80px', marginBottom: '8px'}}></div>
              <div className="skeleton-shimmer" style={{height: '44px', borderRadius: '10px'}}></div>
            </div>
          ))}
        </div>

        <div className="games-grid">
          {[...Array(6)].map((_, index) => (
            <GameCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Biblioteca vacía
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
          <div className="stat">❤️ {favoriteGames}</div>
          <div className="stat">⭐ {wishlistGames}</div>
        </div>
      </div>

      {/* Controles principales */}
      <div className="library-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="🔍 Buscar por título..." 
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
          <button 
            className={filter === 'favorites' ? 'active' : ''} 
            onClick={() => setFilter('favorites')}
          >
            ❤️ Favoritos
          </button>
          <button 
            className={filter === 'wishlist' ? 'active' : ''} 
            onClick={() => setFilter('wishlist')}
          >
            ⭐ Wishlist
          </button>
        </div>
      </div>

      {/* Filtros avanzados */}
      <div className="advanced-filters">
        <div className="filter-group">
          <label>Plataforma:</label>
          <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
            <option value="all">Todas las plataformas</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Género:</label>
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="all">Todos los géneros</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Rating Mínimo:</label>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
            <option value="all">Cualquier rating</option>
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4+)</option>
            <option value="3">⭐⭐⭐ (3+)</option>
            <option value="2">⭐⭐ (2+)</option>
            <option value="1">⭐ (1+)</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Ordenar por:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Más Recientes</option>
            <option value="oldest">Más Antiguos</option>
            <option value="title">Título (A-Z)</option>
            <option value="rating">Mejor Rating</option>
            <option value="hours">Más Horas</option>
          </select>
        </div>
      </div>

      {/* Grid de juegos */}
      {filteredGames.length === 0 ? (
        <div className="empty-state">
          <p>🔍 No se encontraron juegos</p>
          <p>Intenta con otros términos de búsqueda o filtros</p>
          <div className="search-suggestions">
            <p>¿Quizás quisiste decir?</p>
            <button onClick={() => {
              setSearchTerm('');
              setFilter('all');
              setPlatformFilter('all');
              setGenreFilter('all');
              setRatingFilter('all');
            }}>
              🔄 Limpiar todos los filtros
            </button>
          </div>
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

      {/* Footer informativo */}
      <div className="library-footer">
        <p>
          Mostrando {filteredGames.length} de {totalGames} juegos
          {searchTerm && ` para "${searchTerm}"`}
          {filter !== 'all' && ` (${getFilterLabel(filter)})`}
          {platformFilter !== 'all' && ` en ${platformFilter}`}
          {genreFilter !== 'all' && ` - ${genreFilter}`}
          {ratingFilter !== 'all' && ` - Rating ${ratingFilter}+`}
        </p>
      </div>
    </div>
  );
};

// Función helper para obtener etiquetas de filtro
const getFilterLabel = (filter) => {
  const labels = {
    'all': 'Todos',
    'completed': 'Completados',
    'in-progress': 'En progreso',
    'favorites': 'Favoritos',
    'wishlist': 'Wishlist'
  };
  return labels[filter] || filter;
};

export default GameLibrary;