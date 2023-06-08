import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar.js";
import CardDetails from "./Components/CardDetails";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<CardDetails />} />
      </Routes>
    </div>
  );
}

export default App;
