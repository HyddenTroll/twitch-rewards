import { useEffect, useState } from 'react';

type Streamer = {
  _id: string;
  username: string;
  email: string;
  isActive: boolean;
};

function AdminDashboard() {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [error, setError] = useState('');

  const fetchStreamers = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/admin/streamers');
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erreur');

      setStreamers(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/admin/streamers/${id}/toggle`, {
        method: 'PATCH',
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erreur');

      fetchStreamers();
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Confirmer la suppression du compte ?')) return;

    try {
      const res = await fetch(`http://localhost:4000/api/admin/streamers/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erreur');

      fetchStreamers();
    } catch (err: any) {
      alert('Erreur: ' + err.message);
    }
  };

  useEffect(() => {
    fetchStreamers();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🎮 Admin Dashboard - Streamers
      </h1>

      {error && (
        <div className="text-red-600 mb-4">
          ❌ {error}
        </div>
      )}

      {streamers.length > 0 ? (
        <table className="w-full text-left border mt-4">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2">Pseudo</th>
              <th className="p-2">Email</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {streamers.map((s) => (
              <tr key={s._id} className="border-b hover:bg-gray-100">
                <td className="p-2">{s.username}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.isActive ? '✅ Actif' : '🚫 Inactif'}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleToggle(s._id)}
                    className="bg-yellow-400 text-black px-2 py-1 rounded text-sm"
                  >
                    {s.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-400">Aucun streamer à afficher.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
