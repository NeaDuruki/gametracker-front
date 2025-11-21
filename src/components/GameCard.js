import React, { useState } from 'react';
import { gameService } from '../services/api';
import ReviewSystem from './ReviewSystem';

const GameCard = ({ game, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`¿Eliminar "${game.title}"?`)) {
      try {
        await gameService.delete(game._id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting game:', error);
        alert('Error al eliminar el juego');
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
      alert('Error al actualizar el juego');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onUpdate();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  // Si está en modo edición, mostrar el formulario de edición
  if (isEditing) {
    return (
      <EditGameForm 
        game={game}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

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
          {'⭐'.repeat(game.rating || 1)}
        </div>

        {game.description && (
          <p className="game-description">{game.description}</p>
        )}

        <div className="game-hours">
          ⏱️ {game.hoursPlayed || 0} horas jugadas
        </div>
      </div>

      <div className="game-card-actions">
        <button 
          className={game.completed ? 'btn-uncomplete' : 'btn-toggle'}
          onClick={handleToggleComplete}
        >
          {game.completed ? '↶ Reanudar' : '✅ Completar'}
        </button>
        <button className="btn-edit" onClick={handleEdit}>
          ✏️ Editar
        </button>
        <button className="btn-review" onClick={toggleReviews}>
          {showReviews ? '📖 Ocultar' : '📝 Reseñas'}
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          🗑️ Eliminar
        </button>
      </div>

      {showReviews && (
        <div className="reviews-section">
          <ReviewSystem gameId={game._id} gameTitle={game.title} />
        </div>
      )}
    </div>
  );
};

// Componente de formulario de edición integrado
const EditGameForm = ({ game, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: game.title || '',
    cover: game.cover || '',
    platform: game.platform || 'PC',
    genre: game.genre || 'Acción',
    hoursPlayed: game.hoursPlayed || 0,
    rating: game.rating || 3,
    completed: game.completed || false,
    description: game.description || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await gameService.update(game._id, formData);
      onSave();
    } catch (error) {
      console.error('Error updating game:', error);
      alert('Error al actualizar el juego');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="game-form-overlay">
      <div className="game-form-container">
        <h2>✏️ Editar Juego</h2>
        
        <form className="game-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título del Juego</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cover">URL de la Portada</label>
            <input
              type="url"
              id="cover"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              placeholder="https://ejemplo.com/portada.jpg"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="platform">Plataforma</label>
              <select 
                id="platform" 
                name="platform" 
                value={formData.platform} 
                onChange={handleChange}
              >
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Mobile">Mobile</option>
                <option value="Otra">Otra</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="genre">Género</label>
              <select 
                id="genre" 
                name="genre" 
                value={formData.genre} 
                onChange={handleChange}
              >
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
                <option value="RPG">RPG</option>
                <option value="Estrategia">Estrategia</option>
                <option value="Deportes">Deportes</option>
                <option value="Indie">Indie</option>
                <option value="Shooter">Shooter</option>
                <option value="Simulación">Simulación</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hoursPlayed">Horas Jugadas</label>
              <input
                type="number"
                id="hoursPlayed"
                name="hoursPlayed"
                value={formData.hoursPlayed}
                onChange={handleChange}
                min="0"
                step="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <select 
                id="rating" 
                name="rating" 
                value={formData.rating} 
                onChange={handleChange}
              >
                <option value="1">⭐ (1)</option>
                <option value="2">⭐⭐ (2)</option>
                <option value="3">⭐⭐⭐ (3)</option>
                <option value="4">⭐⭐⭐⭐ (4)</option>
                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              </select>
            </div>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
              />
              ¿Juego Completado?
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe tu experiencia con el juego..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              💾 Guardar Cambios
            </button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              ✖️ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameCard;