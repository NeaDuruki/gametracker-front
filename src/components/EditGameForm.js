import React, { useState, useEffect } from 'react';
import { gameService } from '../services/api';

const EditGameForm = ({ game, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    cover: '',
    platform: 'PC',
    genre: 'Acción',
    hoursPlayed: 0,
    rating: 3,
    completed: false,
    description: ''
  });

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title || '',
        cover: game.cover || '',
        platform: game.platform || 'PC',
        genre: game.genre || 'Acción',
        hoursPlayed: game.hoursPlayed || 0,
        rating: game.rating || 3,
        completed: game.completed || false,
        description: game.description || ''
      });
    }
  }, [game]);

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
          {/* Mismo formulario que GameForm pero con datos precargados */}
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

export default EditGameForm;