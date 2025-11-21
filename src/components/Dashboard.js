import React from 'react';
import { gameService } from '../services/api';

const Dashboard = () => {
  const [games, setGames] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const response = await gameService.getAll();
      setGames(response.data);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cálculos para estadísticas
  const totalGames = games.length;
  const completedGames = games.filter(game => game.completed).length;
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

  // Top 5 juegos mejor calificados
  const topRatedGames = [...games]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  if (loading) {
    return <div className="loading">Cargando estadísticas...</div>;
  }

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
              {totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0}% de tu biblioteca
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>Horas Jugadas</h3>
            <div className="stat-number">{totalHours}</div>
            <div className="stat-detail">
              {totalHours > 0 ? Math.round(totalHours / 24) : 0} días de juego
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
      </div>

      {/* Gráficos de Distribución */}
      <div className="dashboard-charts">
        {/* Distribución por Plataforma */}
        <div className="chart-card">
          <h2>🎯 Plataformas</h2>
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
                        width: `${(count / totalGames) * 100}%` 
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
          <h2>🎭 Géneros</h2>
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
                        width: `${(count / totalGames) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="chart-value">{count}</span>
                </div>
              ))}
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
              <p>No hay juegos calificados aún</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;