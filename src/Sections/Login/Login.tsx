import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-backend.peekabox.net/api/v1/stores/auth/logIn",
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Left side with logo and slogan */}
      <header className="flex md:hidden justify-center items-center flex-col p-4 bg-white w-full">
        <h1 className="text-3xl font-bold text-pink-500">Peekabox</h1>
        <p className="text-sm italic text-pink-500 mt-2 hidden md:block">"Help us reduce waste"</p>
      </header>

      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-white p-8">
        <h1 className="text-4xl font-bold mb-2 p-2 text-pink-500">Peekabox</h1>
        <p className="text-lg italic text-pink-500 hidden md:block">"Help us reduce waste"</p>
      </div>

      {/* Right side with login form */}
      <div className="flex justify-center items-center w-full md:w-1/2 mt-12 md:mt-12">

        <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-pink-500">Partner Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 border-none hover:bg-pink-700 transition"
            >
              Login
            </button>
          </form>

          {/* Links for additional actions */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <a href="/register" className="text-pink-600 hover:underline">
              Already registered?
            </a>
            <a href="/forgot-password" className="text-pink-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
