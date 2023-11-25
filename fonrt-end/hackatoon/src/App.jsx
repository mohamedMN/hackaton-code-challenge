import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RequireAuth from "./component/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}
