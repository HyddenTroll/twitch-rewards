import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StreamerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      // Stocker le token pour l’auth future
      localStorage.setItem('token', data.token);

      alert('✅ Connexion réussie');
      navigate('/dashboard'); // On y va juste après
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion Streamer 🔐</h2>

        {error && (
          <div className="bg-red-500 p-2 mb-4 rounded text-sm text-white">
            ❌ {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Adresse email"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 mb-6 rounded bg-gray-700 border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 transition rounded p-2 font-semibold"
        >
          Se connecter
        </button>

        <p className="mt-4 text-sm text-center text-gray-300">
          Pas encore de compte ?{' '}
          <a
            href="/register/streamer"
            className="text-purple-400 hover:underline"
          >
            S'inscrire ici
          </a>
        </p>
      </div>
    </div>
  );
}

export default StreamerLogin;
