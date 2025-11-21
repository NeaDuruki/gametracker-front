import React, { useState, useEffect } from 'react';
import { reviewService } from '../services/api';

const ReviewSystem = ({ gameId, gameTitle }) => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    author: '',
    rating: 5,
    hoursPlayed: 0,
    completed: false
  });

  useEffect(() => {
    loadReviews();
  }, [gameId]);

  const loadReviews = async () => {
    try {
      const response = await reviewService.getByGame(gameId);
      setReviews(response.data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviewService.create({
        ...formData,
        gameId: gameId
      });
      setFormData({
        content: '',
        author: '',
        rating: 5,
        hoursPlayed: 0,
        completed: false
      });
      setShowForm(false);
      loadReviews();
    } catch (error) {
      console.error('Error creating review:', error);
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

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('¿Eliminar esta reseña?')) {
      try {
        await reviewService.delete(reviewId);
        loadReviews();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  return (
    <div className="review-system">
      <div className="review-header">
        <h3>📝 Reseñas de "{gameTitle}"</h3>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✖️ Cancelar' : '✍️ Escribir Reseña'}
        </button>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tu Nombre (opcional)</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Anónimo"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rating</label>
              <select name="rating" value={formData.rating} onChange={handleChange}>
                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                <option value="4">⭐⭐⭐⭐ (4)</option>
                <option value="3">⭐⭐⭐ (3)</option>
                <option value="2">⭐⭐ (2)</option>
                <option value="1">⭐ (1)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Horas Jugadas</label>
              <input
                type="number"
                name="hoursPlayed"
                value={formData.hoursPlayed}
                onChange={handleChange}
                min="0"
              />
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
              ¿Completaste el juego?
            </label>
          </div>

          <div className="form-group">
            <label>Tu Reseña *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Comparte tu experiencia con este juego..."
              rows="4"
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            📤 Publicar Reseña
          </button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">Aún no hay reseñas para este juego.</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <strong>{review.author || 'Anónimo'}</strong>
                  <span className="review-rating">
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                <div className="review-meta">
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  {review.completed && <span className="completed-badge">✅ Completado</span>}
                  <span>⏱️ {review.hoursPlayed}h</span>
                </div>
              </div>
              
              <p className="review-content">{review.content}</p>
              
              <button 
                className="btn-danger btn-small"
                onClick={() => handleDeleteReview(review._id)}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;