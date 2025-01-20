import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import l from "../../assets/images/Signup.png";
import Button from "../../Components/Button/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<"email" | "password">("email"); // Track the current step
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email === "test@example.com") {
      setStep("password");
      setError(""); // Clear any previous error
    } else {
      setError("Invalid email. Please try again.");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password === "password123") {
      navigate("/dashboard"); // Redirect to the dashboard or home page
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Image Section */}
      <div
        className="lg:w-3/5 w-full h-1/2 lg:h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${l})` }}
      ></div>

      {/* Right Form Section */}
      <div className="lg:w-2/5 w-full flex items-start justify-center bg-white">
        <div className="w-full max-w-md px-6 lg:px-16 text-center mt-16 lg:mt-32">
          <h1 className="text-xl lg:text-2xl font-bold mb-4">
            {step === "email" ? "Sign up your business" : "Enter your password"}
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mb-6">
            {step === "email"
              ? "Enter your email and get started in a few minutes!"
              : "Let’s Keep It Safe - Enter Your Password."}
          </p>

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-DarkGreen"
              />
              {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
              <Button
                type="submit"
                label="Continue"
                className="w-full py-2 bg-DarkGreen text-white rounded-md hover:bg-DarkGreen-hover"
              />
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-DarkGreen"
              />
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-sm text-gray-700 space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded text-DarkGreen focus:ring-DarkGreen"
                  />
                  <span>Keep me logged in</span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-pinkCustom hover:text-pinkCustom-hover"
                >
                  Forgot password?
                </a>
              </div>
              {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
              <Button
                type="submit"
                label="Sign In"
                className="w-full py-2 bg-DarkGreen text-white rounded-md hover:bg-DarkGreen-hover"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
