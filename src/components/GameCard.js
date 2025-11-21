import React from 'react';
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

  const handleToggleComplete = async () => {
    try {
      await gameService.update(game._id, {
        completed: !game.completed
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  return (
    <div className={`game-card ${game.completed ? 'completed' : ''}`}>
      <div className="game-card-header">
        {game.cover ? (
          <img src={game.cover} alt={game.title} className="game-cover" />
        ) : (
          <div className="game-cover-placeholder">🎮</div>
        )}
        {game.completed && (
          <div className="completed-badge">✅ Completado</div>
        )}
      </div>
      
      <div className="game-card-body">
        <h3 className="game-title">{game.title}</h3>
        
        <div className="game-meta">
          <span className="game-platform">{game.platform}</span>
          <span className="game-genre">{game.genre}</span>
        </div>

        <div className="game-rating">
          {'⭐'.repeat(game.rating)}
        </div>

        {game.description && (
          <p className="game-description">{game.description}</p>
        )}

        <div className="game-hours">
          ⏱️ {game.hoursPlayed} horas jugadas
        </div>
      </div>

      <div className="game-card-actions">
        <button 
          className={game.completed ? 'btn-uncomplete' : 'btn-toggle'}
          onClick={handleToggleComplete}
        >
          {game.completed ? '↶ Reanudar' : '✅ Completar'}
        </button>
        <button className="btn-edit">
          ✏️ Editar
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default GameCard;