import React, { useState } from 'react';

const GameForm = ({ onSubmit, onCancel }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // No resetear el form aquí para mantener los datos hasta que se cierre
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
        <h2>➕ Agregar Nuevo Juego</h2>
        
        <form className="game-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título del Juego</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ej: The Legend of Zelda: Breath of the Wild"
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
              placeholder="https://ejemplo.com/portada.jpg"
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
              placeholder="Describe tu experiencia con el juego..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              🎮 Guardar Juego
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

export default GameForm;