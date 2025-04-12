import { useState } from 'react';

function StreamerRegister() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    setSuccess(false);

    if (!email || !username || !password || !confirmPassword) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte Streamer 🧙‍♂️</h2>

        {error && (
          <div className="bg-red-500 p-2 mb-4 rounded text-sm text-white">{error}</div>
        )}
        {success && (
          <div className="bg-green-500 p-2 mb-4 rounded text-sm text-white">
            ✅ Compte créé avec succès !
          </div>
        )}

        <input
          type="text"
          placeholder="Pseudo"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="w-full p-2 mb-6 rounded bg-gray-700 border border-gray-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 hover:bg-purple-700 transition rounded p-2 font-semibold"
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
}

export default StreamerRegister;
