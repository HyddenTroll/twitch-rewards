// src/pages/ViewerDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TwitchChannel {
  id: string;
  display_name: string;
  is_live: boolean;
  thumbnail_url: string;
  title: string;
  broadcaster_login: string;
}

const ViewerDashboard: React.FC = () => {
  const [viewerName] = useState('hyddentroll'); // À remplacer plus tard par session
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<TwitchChannel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim().length < 2) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/twitch/search?q=${searchTerm}`);
        const sorted = res.data.sort((a: TwitchChannel, b: TwitchChannel) =>
          b.is_live === a.is_live ? 0 : b.is_live ? 1 : -1
        );
        setResults(sorted);
      } catch (err) {
        console.error('Erreur recherche :', err);
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div style={{ padding: '30px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>📊 Dashboard Viewer</h1>
      <h2 style={{ textAlign: 'center' }}>Bienvenue <strong>{viewerName}</strong> 👋</h2>

      {/* 🔍 Barre de recherche */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="🔍 Rechercher un streamer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px', borderRadius: '6px' }}
        />
      </div>

      {/* Résultats */}
      {results.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: '600px', margin: '20px auto' }}>
          {results.map((channel) => (
            <li
              key={channel.id}
              onClick={() => navigate(`/viewer/watch/${channel.broadcaster_login}`)}
              style={{
                cursor: 'pointer',
                background: '#f5f5f5',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <img
                src={channel.thumbnail_url}
                alt={channel.display_name}
                width="50"
                height="50"
                style={{ borderRadius: '50%' }}
              />
              <div style={{ flex: 1 }}>
                <strong>{channel.display_name}</strong>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  {channel.is_live ? '🔴 En live' : '⚫ Hors ligne'}
                </p>
                <p style={{ margin: 0, fontSize: '13px' }}>{channel.title}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🧠 Stats mockées pour le moment */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h3>📈 Tes statistiques :</h3>
        <p>⏱️ Temps total regardé : <strong>2400 secondes</strong></p>
        <p>📺 Nombre de streams regardés : <strong>7</strong></p>
      </div>
    </div>
  );
};

export default ViewerDashboard;
