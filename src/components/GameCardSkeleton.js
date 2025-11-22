import React from 'react';

const GameCardSkeleton = () => {
  return (
    <div className="game-card skeleton">
      <div className="game-card-header skeleton-item">
        <div className="game-cover-placeholder skeleton-shimmer"></div>
      </div>
      
      <div className="game-card-body">
        <div className="skeleton-title skeleton-shimmer"></div>
        
        <div className="game-meta">
          <span className="skeleton-meta skeleton-shimmer"></span>
          <span className="skeleton-meta skeleton-shimmer"></span>
        </div>

        <div className="skeleton-rating skeleton-shimmer"></div>
        <div className="skeleton-description skeleton-shimmer"></div>
        <div className="skeleton-hours skeleton-shimmer"></div>
      </div>

      <div className="game-card-actions">
        <div className="skeleton-button skeleton-shimmer"></div>
        <div className="skeleton-button skeleton-shimmer"></div>
        <div className="skeleton-button skeleton-shimmer"></div>
        <div className="skeleton-button skeleton-shimmer"></div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;