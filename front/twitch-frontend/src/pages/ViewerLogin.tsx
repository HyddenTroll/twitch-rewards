// src/pages/ViewerLogin.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setViewerSession } from "@/services/viewerAuth";

function ViewerLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");

    if (name) {
      localStorage.setItem("viewer", JSON.stringify({ displayName: name }));
      navigate("/viewer/dashboard");
    }
  }, []);

  const handleTwitchLogin = () => {
    console.log("🔁 Redirection vers backend Twitch");
    window.location.href = "http://localhost:4000/api/viewer/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Connexion Viewer via Twitch</h2>
        <button
          onClick={handleTwitchLogin}
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded flex items-center justify-center mx-auto"
        >
          🎮 Se connecter avec Twitch
        </button>
      </div>
    </div>
  );
}

export default ViewerLogin;
