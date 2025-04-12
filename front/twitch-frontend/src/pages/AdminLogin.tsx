import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'Yohan' && password === 'test') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion Admin 🔐</h2>

        {error && (
          <div className="bg-red-500 p-2 mb-4 rounded text-sm text-white">{error}</div>
        )}

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      </div>
    </div>
  );
}

export default AdminLogin;
