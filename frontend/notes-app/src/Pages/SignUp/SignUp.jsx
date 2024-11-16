import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/Helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [Name, SetName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, SetError] = useState(null);

  const navigate = useNavigate();
  const HandleSignup = async (e) => {
    e.preventDefault();
    if (!Name) {
      SetError("enter the name correctly");
      return;
    }
    if (!validateEmail(email)) {
      SetError("Enter a valid address");
      return;
    }
    if (!password) {
      SetError("Please enter the password");
      return;
    }
    SetError("");
    //SIGNUP API CALL
    try {
      const response = await axiosInstance.post("/signup", {
        fullName: Name,
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
        SetError(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className="p-20 bg-white border-2 flex flex-col rounded-lg">
          <form
            className="flex flex-col gap-3 justify-between"
            onSubmit={HandleSignup}
          >
            <h4 className="text-2xl font-medium">Sign Up</h4>
            <input
              className="border-2 p-3 rounded-lg outline-none"
              type="text"
              value={Name}
              onChange={(e) => {
                SetName(e.target.value);
              }}
              placeholder="Name"
            />
            <input
              className="border-2 p-3 rounded-lg outline-none"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
            />
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
            {Error && <p className="text-red-500 text-xs pb-1">{Error}</p>}
            <button
              className="p-3 bg-black text-white rounded-lg"
              type="submit"
            >
              SignUp
            </button>
            <p>
              Already have an account?{" "}
              <Link className="text-blue-500" to="/login">
                Login
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
