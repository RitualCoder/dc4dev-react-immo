import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  });

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await AuthService.signin(credentials);
      if (localStorage.getItem("access_token")) {
        navigate("/");
      }
    } catch (error) {
      console.log("handleSubmit error : ", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Signin" />
      </form>
    </div>
  );
};

export default Signin;
