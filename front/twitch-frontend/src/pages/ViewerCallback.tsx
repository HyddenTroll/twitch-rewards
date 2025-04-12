// src/pages/ViewerCallback.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ViewerCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");

    if (name) {
      localStorage.setItem("viewer", JSON.stringify({ displayName: name }));
      navigate("/viewer/dashboard"); // ✅ Redirection vers le bon dashboard
    } else {
      navigate("/"); // 🔁 redirection de secours
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
      <h2>Connexion en cours...</h2>
    </div>
  );
}

export default ViewerCallback;
