import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const BASE_URL = "http://localhost:8000/todo";

function Signup() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${BASE_URL}/signup`, {
        email: email,
        password: password,
        username: userName,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
      <div className=" w-screen h-[90vh] flex items-center justify-center">
        <div className=" bg-[#1f1f29]   w-[70%] sm:w-[50%] md:w-[30%] flex flex-col p-3 rounded-xl">
          <h2 className=" capitalize text-center text-[#f0f0f5] text-3xl py-3 border-b-2 border-b-gray-500/50">
            sign up
          </h2>
          <input
            type="text"
            className=" my-3 mt-6 rounded-md bg-[#252525] text-[#f0f0f5] text-lg capitalize py-2 px-3 outline outline-gray-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-400"
            placeholder="Enter usename"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            className=" my-3 rounded-md bg-[#252525] text-[#f0f0f5] text-lg py-2 px-3 outline outline-gray-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-400"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className=" flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              id="pass"
              className=" my-3 w-full rounded-md bg-[#252525] text-[#f0f0f5] text-lg capitalize py-2 px-3 outline outline-gray-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FeatherIcon
              onClick={togglePassword}
              icon={showPassword ? "eye-off" : "eye"}
              size={20}
              className="text-gray-500 cursor-pointer absolute right-2"
            />
          </div>
          <button
            className=" my-3 capitalize text-center bg-sky-500 px-5 py-2  text-lg text-[#f0f0f5] rounded-md "
            onClick={handleSignup}
          >
            sign up
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
