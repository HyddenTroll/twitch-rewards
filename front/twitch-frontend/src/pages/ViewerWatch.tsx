// src/pages/ViewerWatch.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewerWatch: React.FC = () => {
  const { streamer } = useParams<{ streamer: string }>();
  const [watchTime, setWatchTime] = useState(0);
  const navigate = useNavigate();

  // 🎯 Redirection si aucun streamer dans l'URL
  useEffect(() => {
    if (!streamer) return;
    let interval: NodeJS.Timer;

    const startTimer = () => {
      interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          setWatchTime((prev) => prev + 1);
        }
      }, 1000);
    };

    startTimer();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') clearInterval(interval);
      else startTimer();
    });

    return () => clearInterval(interval);
  }, [streamer]);

  if (!streamer) {
    return <p style={{ padding: '50px', textAlign: 'center' }}>⚠️ Aucun streamer sélectionné.</p>;
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      {/* 🔙 Bouton retour vers le dashboard */}
      <button
        onClick={() => navigate('/viewer/dashboard')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: '#eee',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        ⬅ Retour au dashboard
      </button>

      <h1 style={{ fontSize: '28px' }}>🔵 Visionnage du stream de <strong>{streamer}</strong></h1>
      <p style={{ marginBottom: '20px' }}>⏱️ Temps passé à regarder : <strong>{watchTime}</strong> secondes</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        {/* 📺 Twitch Player */}
        <iframe
          src={`https://player.twitch.tv/?channel=${streamer}&parent=localhost`}
          height="500"
          width="800"
          allowFullScreen
          frameBorder="0"
        ></iframe>

        {/* 💬 Twitch Chat */}
        <iframe
          src={`https://www.twitch.tv/embed/${streamer}/chat?parent=localhost`}
          height="500"
          width="350"
          frameBorder="0"
        ></iframe>
      </div>

      <p style={{ fontStyle: 'italic', marginTop: '15px', color: '#666' }}>
        * Le stream se coupe si tu changes d’onglet 😌
      </p>
    </div>
  );
};

export default ViewerWatch;
