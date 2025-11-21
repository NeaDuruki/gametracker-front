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
    setFormData({
      title: '',
      cover: '',
      platform: 'PC',
      genre: 'Acción',
      hoursPlayed: 0,
      rating: 3,
      completed: false,
      description: ''
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="game-form-overlay">
      <form className="game-form" onSubmit={handleSubmit}>
        <h3>➕ Agregar Nuevo Juego</h3>
        
        <input
          type="text"
          name="title"
          placeholder="Título del juego *"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="cover"
          placeholder="URL de la portada"
          value={formData.cover}
          onChange={handleChange}
        />

        <select name="platform" value={formData.platform} onChange={handleChange}>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Mobile">Mobile</option>
        </select>

        <select name="genre" value={formData.genre} onChange={handleChange}>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Deportes">Deportes</option>
          <option value="Indie">Indie</option>
        </select>

        <div className="form-row">
          <label>
            Horas jugadas:
            <input
              type="number"
              name="hoursPlayed"
              value={formData.hoursPlayed}
              onChange={handleChange}
              min="0"
            />
          </label>

          <label>
            Rating:
            <select name="rating" value={formData.rating} onChange={handleChange}>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </label>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          ¿Completado?
        </label>

        <textarea
          name="description"
          placeholder="Descripción del juego..."
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Guardar Juego
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameForm;