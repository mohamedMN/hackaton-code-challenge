// Login.js

import { useContext, useState } from "react";
import { axiosPrivate } from "../api/axiosPrivate";
import AuthContext from "../context/useContex";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    // Validate the username and password (you may want to add more validation)
    e.preventDefault();
    console.log(username, password);

    const data = {
      username: username,
      password: password,
    };

    try {
      await axiosPrivate.post("/authentication", data);
      setAuth({ username, password });
      navigate("/home");
    } catch (error) {
      setErrorMessage("Bad connection to the server. Please try again!");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h1>Login</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          required={true}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
