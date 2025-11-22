import React from 'react';

const Dashboard = ({ games, loading }) => {
  // Si está cargando, mostrar skeletons
  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>📊 Dashboard de Estadísticas</h1>
          <p>Resumen completo de tu biblioteca de juegos</p>
        </div>

        {/* Skeletons para estadísticas principales */}
        <div className="stats-grid">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="stat-card skeleton">
              <div className="stat-icon skeleton-shimmer" style={{width: '60px', height: '60px', borderRadius: '50%'}}></div>
              <div className="stat-content">
                <div className="skeleton-shimmer" style={{height: '16px', width: '100px', marginBottom: '10px'}}></div>
                <div className="skeleton-shimmer" style={{height: '32px', width: '80px', marginBottom: '8px'}}></div>
                <div className="skeleton-shimmer" style={{height: '14px', width: '120px'}}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Skeletons para gráficos */}
        <div className="dashboard-charts">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="chart-card skeleton">
              <div className="skeleton-shimmer" style={{height: '28px', width: '200px', marginBottom: '2rem'}}></div>
              <div className="chart-bars">
                {[...Array(5)].map((_, barIndex) => (
                  <div key={barIndex} className="chart-bar-item">
                    <div className="skeleton-shimmer" style={{height: '16px', width: '80px'}}></div>
                    <div className="chart-bar-container">
                      <div className="skeleton-shimmer" style={{height: '32px', width: `${Math.random() * 80 + 20}%`}}></div>
                    </div>
                    <div className="skeleton-shimmer" style={{height: '16px', width: '30px'}}></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skeleton para top juegos */}
        <div className="top-games-section skeleton">
          <div className="skeleton-shimmer" style={{height: '32px', width: '300px', marginBottom: '2rem'}}></div>
          <div className="top-games-list">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="top-game-item skeleton">
                <div className="skeleton-shimmer" style={{width: '50px', height: '40px', borderRadius: '8px'}}></div>
                <div className="top-game-info" style={{flex: 1}}>
                  <div className="skeleton-shimmer" style={{height: '20px', width: '70%', marginBottom: '8px'}}></div>
                  <div className="skeleton-shimmer" style={{height: '16px', width: '100px'}}></div>
                </div>
                <div className="skeleton-shimmer" style={{width: '80px', height: '32px', borderRadius: '8px'}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Cálculos para estadísticas
  const totalGames = games.length;
  const completedGames = games.filter(game => game.completed).length;
  const favoriteGames = games.filter(game => game.favorite).length;
  const wishlistGames = games.filter(game => game.wishlist).length;
  const totalHours = games.reduce((sum, game) => sum + (parseInt(game.hoursPlayed) || 0), 0);
  const averageRating = games.length > 0 
    ? (games.reduce((sum, game) => sum + (parseInt(game.rating) || 0), 0) / games.length).toFixed(1)
    : 0;

  // Juegos por plataforma
  const platforms = games.reduce((acc, game) => {
    acc[game.platform] = (acc[game.platform] || 0) + 1;
    return acc;
  }, {});

  // Juegos por género
  const genres = games.reduce((acc, game) => {
    acc[game.genre] = (acc[game.genre] || 0) + 1;
    return acc;
  }, {});

  // Horas por plataforma
  const hoursByPlatform = games.reduce((acc, game) => {
    const hours = parseInt(game.hoursPlayed) || 0;
    acc[game.platform] = (acc[game.platform] || 0) + hours;
    return acc;
  }, {});

  // Top 5 juegos mejor calificados
  const topRatedGames = [...games]
    .filter(game => game.rating && game.rating >= 3) // Solo juegos con rating decente
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  // Top 5 juegos con más horas
  const mostPlayedGames = [...games]
    .filter(game => game.hoursPlayed && game.hoursPlayed > 0)
    .sort((a, b) => (b.hoursPlayed || 0) - (a.hoursPlayed || 0))
    .slice(0, 5);

  // Juegos recientemente agregados
  const recentGames = [...games]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Estadísticas de progreso
  const completionRate = totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0;
  const averageHoursPerGame = totalGames > 0 ? (totalHours / totalGames).toFixed(1) : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard de Estadísticas</h1>
        <p>Resumen completo de tu biblioteca de juegos</p>
      </div>

      {/* Estadísticas Principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎮</div>
          <div className="stat-content">
            <h3>Total de Juegos</h3>
            <div className="stat-number">{totalGames}</div>
            <div className="stat-detail">En tu biblioteca</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completados</h3>
            <div className="stat-number">{completedGames}</div>
            <div className="stat-detail">
              {completionRate}% de tu biblioteca
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>Horas Jugadas</h3>
            <div className="stat-number">{totalHours}</div>
            <div className="stat-detail">
              {averageHoursPerGame} horas por juego
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Rating Promedio</h3>
            <div className="stat-number">{averageRating}</div>
            <div className="stat-detail">
              <div className="stat-stars">
                {'⭐'.repeat(Math.round(averageRating))}
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-content">
            <h3>Favoritos</h3>
            <div className="stat-number">{favoriteGames}</div>
            <div className="stat-detail">
              Juegos que más te gustan
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✰</div>
          <div className="stat-content">
            <h3>Wishlist</h3>
            <div className="stat-number">{wishlistGames}</div>
            <div className="stat-detail">
              Por jugar después
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos de Distribución */}
      <div className="dashboard-charts">
        {/* Distribución por Plataforma */}
        <div className="chart-card">
          <h2>🎯 Distribución por Plataforma</h2>
          <div className="chart-bars">
            {Object.entries(platforms)
              .sort((a, b) => b[1] - a[1])
              .map(([platform, count]) => (
                <div key={platform} className="chart-bar-item">
                  <span className="chart-label">{platform}</span>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar-fill"
                      style={{ 
                        width: `${(count / totalGames) * 100}%`,
                        background: getPlatformColor(platform)
                      }}
                    ></div>
                  </div>
                  <span className="chart-value">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Distribución por Género */}
        <div className="chart-card">
          <h2>🎭 Distribución por Género</h2>
          <div className="chart-bars">
            {Object.entries(genres)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([genre, count]) => (
                <div key={genre} className="chart-bar-item">
                  <span className="chart-label">{genre}</span>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar-fill"
                      style={{ 
                        width: `${(count / totalGames) * 100}%`,
                        background: getGenreColor(genre)
                      }}
                    ></div>
                  </div>
                  <span className="chart-value">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Horas por Plataforma */}
        <div className="chart-card">
          <h2>⏱️ Horas por Plataforma</h2>
          <div className="chart-bars">
            {Object.entries(hoursByPlatform)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([platform, hours]) => (
                <div key={platform} className="chart-bar-item">
                  <span className="chart-label">{platform}</span>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar-fill"
                      style={{ 
                        width: `${(hours / Math.max(...Object.values(hoursByPlatform))) * 100}%`,
                        background: getPlatformColor(platform)
                      }}
                    ></div>
                  </div>
                  <span className="chart-value">{hours}h</span>
                </div>
              ))}
          </div>
        </div>

        {/* Estado de Completado */}
        <div className="chart-card">
          <h2>📈 Progreso General</h2>
          <div className="progress-stats">
            <div className="progress-item">
              <span className="progress-label">Completados</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill completed"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <span className="progress-value">{completionRate}%</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">En progreso</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill in-progress"
                  style={{ width: `${100 - completionRate}%` }}
                ></div>
              </div>
              <span className="progress-value">{100 - completionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Juegos Mejor Calificados */}
      <div className="top-games-section">
        <h2>🏆 Top Juegos Mejor Calificados</h2>
        <div className="top-games-list">
          {topRatedGames.length > 0 ? (
            topRatedGames.map((game, index) => (
              <div key={game._id} className="top-game-item">
                <div className="top-game-rank">#{index + 1}</div>
                <div className="top-game-info">
                  <h3>{game.title}</h3>
                  <div className="top-game-rating">
                    {'⭐'.repeat(game.rating || 1)}
                    <span className="rating-number">({game.rating}/5)</span>
                  </div>
                </div>
                <div className="top-game-platform">
                  {game.platform}
                </div>
                {game.completed && <span className="completed-badge">✅</span>}
                {game.favorite && <span className="favorite-badge">❤️</span>}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No hay juegos calificados aún</p>
            </div>
          )}
        </div>
      </div>

      {/* Juegos Más Jugados */}
      <div className="top-games-section">
        <h2>🎯 Juegos Más Jugados</h2>
        <div className="top-games-list">
          {mostPlayedGames.length > 0 ? (
            mostPlayedGames.map((game, index) => (
              <div key={game._id} className="top-game-item">
                <div className="top-game-rank">#{index + 1}</div>
                <div className="top-game-info">
                  <h3>{game.title}</h3>
                  <div className="top-game-hours">
                    ⏱️ {game.hoursPlayed || 0} horas
                  </div>
                </div>
                <div className="top-game-platform">
                  {game.platform}
                </div>
                {game.completed && <span className="completed-badge">✅</span>}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No hay juegos con horas registradas</p>
            </div>
          )}
        </div>
      </div>

      {/* Juegos Recientes */}
      <div className="top-games-section">
        <h2>🆕 Juegos Recientemente Agregados</h2>
        <div className="top-games-list">
          {recentGames.length > 0 ? (
            recentGames.map((game, index) => (
              <div key={game._id} className="top-game-item">
                <div className="top-game-rank">#{index + 1}</div>
                <div className="top-game-info">
                  <h3>{game.title}</h3>
                  <div className="top-game-date">
                    📅 {new Date(game.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="top-game-platform">
                  {game.platform}
                </div>
                <div className="top-game-status">
                  {game.completed ? '✅' : game.favorite ? '❤️' : '🎯'}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No hay juegos en tu biblioteca</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Funciones helper para colores
const getPlatformColor = (platform) => {
  const colors = {
    'PC': '#6366f1',
    'PlayStation': '#003791',
    'Xbox': '#107c10',
    'Nintendo Switch': '#e60012',
    'Mobile': '#8b5cf6',
    'Otra': '#6b7280'
  };
  return colors[platform] || '#6366f1';
};

const getGenreColor = (genre) => {
  const colors = {
    'Acción': '#ef4444',
    'Aventura': '#f59e0b',
    'RPG': '#10b981',
    'Estrategia': '#3b82f6',
    'Deportes': '#8b5cf6',
    'Indie': '#ec4899',
    'Shooter': '#dc2626',
    'Simulación': '#06b6d4'
  };
  return colors[genre] || '#6366f1';
};

export default Dashboard;