// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewerWatch from "./pages/ViewerWatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/viewer/watch" element={<ViewerWatch />} />
      </Routes>
    </Router>
  );
}

export default App;
