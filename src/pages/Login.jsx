import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

  const res = await axios.post(
    "https://dummyjson.com/auth/login",
    {
      username: username.trim(),
      password: password.trim(),
      expiresInMins: 30,
    }
  );

  localStorage.setItem(
    "user",
    JSON.stringify(res.data)
  );

  alert("Login successful");

  if (res.data.username === "emilys") {

    localStorage.setItem(
      "role",
      "admin"
    );

    navigate("/dashboard");
  }

  else {

    localStorage.setItem(
      "role",
      "user"
    );

    alert(
      `Welcome ${res.data.firstName}`
    );

    navigate("/products");
  }

} catch (error) {

  console.log(error);

  alert("Invalid username or password");
}
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4" style={{ width: "400px" }}>
        <h2 className="mb-4">Login</h2>

        <Form onSubmit={handleLogin}>


  <Form.Group className="mb-3">
    <Form.Control
      type="text"
      placeholder="Username"

      value={username}

      onChange={(e) =>
        setUsername(e.target.value)
      }
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Control
      type="password"
      placeholder="Password"

      value={password}

      onChange={(e) =>
        setPassword(e.target.value)
      }
    />
  </Form.Group>

    <Button type="submit">
      Login
    </Button>

      </Form>  
      </Card>
    </Container>
  );
}

export default Login;