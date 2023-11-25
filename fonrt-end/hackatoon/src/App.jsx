import Login from "./pages/Login";
import { Route, Router } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Router>
  );
}
