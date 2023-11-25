import Login from "./pages/Login";
import Register from "./Register";
import Home from "./Home";
import { Route, Router,  } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
    </Router>
  );
}
