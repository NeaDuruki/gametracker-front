import GameCard from './GameCard';
function GameLibrary({ games, onGameUpdate }) {
  if (games.length === 0) {
    return (
      <div className="game-library empty">
        <h2>Tu Biblioteca</h2>
        <p>No hay juegos en tu biblioteca. ¡Agrega el primero!</p>
      </div>
    );
  }

  return (
    <div className="game-library">
      <h2>📚 Tu Biblioteca ({games.length} juegos)</h2>
      <div className="games-grid">
        {games.map(game => (
          <GameCard
            key={game._id}
            game={game}
            onUpdate={onGameUpdate} />
        ))}
      </div>
    </div>
  );
};


export default GameLibrary;