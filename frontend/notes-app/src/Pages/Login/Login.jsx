import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/Helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //LOGIN API CALL
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div>
  
      <div className=" flex justify-center items-center h-screen">
        <div className="p-20 bg-white border-2 flex flex-col rounded-lg">
          <form
            className="flex flex-col gap-3 justify-between"
            onSubmit={HandleLogin}
          >
            <h4 className="text-2xl font-medium">Login</h4>
            <input
              className="border-2 p-3 rounded-lg outline-none"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button
              className="p-3 bg-black text-white rounded-lg"
              type="submit"
            >
              Login
            </button>
            <p>
              Not registered yet?{" "}
              <Link className="text-blue-500" to="/signup">
                Create an account
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
