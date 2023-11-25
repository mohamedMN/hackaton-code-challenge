// Login.js

import { useState } from "react";

const Login = () => {
  // State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login
  const handleLogin = () => {
    // Validate the username and password (you may want to add more validation)
    if (username === "yourUsername" && password === "yourPassword") {
      alert("Login successful!");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
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
