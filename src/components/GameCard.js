import { gameService } from '../services/api';
const GameCard = ({ game, onUpdate }) => {
  const handleDelete = async () => {
    if (window.confirm(`¿Eliminar "${game.title}"?`)) {
      try {
        await gameService.delete(game._id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  };
  return (
    <div className="game-card">
      <div className="game-cover">
        {game.cover ? (
          <img src={game.cover} alt={game.title} />
        ) : (
          <div className="no-cover">🎮</div>
        )}
      </div>
      
      <div className="game-info">
        <h3>{game.title}</h3>
        <p>Plataforma: {game.platform}</p>
        <p>Género: {game.genre}</p>
        <p>Rating: {'⭐'.repeat(game.rating)}</p>
        <p>Horas: {game.hoursPlayed}h</p>
        <p>Estado: {game.completed ? 'Completado' : 'En progreso'}</p>
      </div>

      <div className="game-actions">
        <button className="btn-danger" onClick={handleDelete}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default GameCard;