// src/pages/Home.tsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2">
        🎮 Bienvenue sur Twitch Loyalty
      </h1>

      {/* Bloc Streamer */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">🧙‍♂️ Je suis Streamer</h2>
        <p className="mb-4">Accédez à votre dashboard et gérez vos récompenses.</p>
        <Link
          to="/login/streamer"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Connexion Streamer
        </Link>
      </div>

      {/* Bloc Viewer */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">👥 Je suis Viewer</h2>
        <p className="mb-4">Connectez-vous avec Twitch pour collecter vos points !</p>
        <Link
          to="/login/viewer"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Connexion Viewer
        </Link>
      </div>
    </div>
  );
}

export default Home;
