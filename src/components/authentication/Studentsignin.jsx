import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Studentsignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/signin");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-1/3 hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={"./pictures/assets/pexels-rodolfo-quirós-1848731.jpg"}
          alt=""
        />
      </div>
      <div className="bg-gray-200 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-white p-8">
          <h2 className="text-4xl font-bold text-center">Student Sign In</h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg h-14 mt-2 p-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-lg h-14 mt-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p className="py-2">
              Don't have an account yet?{" "}
              <Link to="/signup" className="underline">
                Sign up.
              </Link>
            </p>
          </div>
          <button className="w-full h-14 my-5 py-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg">
            Sign In
          </button>
          <div className="w-full h-14 bg-teal-500 my-2 flex rounded-md p-4 text-center cursor-pointer hover:bg-teal-400 text-white font-semibold rounded-lg">
            <img
              src={"./pictures/assets/Google__G__Logo.svg.png"}
              className="h-6 mr-9"
              alt="Google Logo"
            />
            Sign in With Google
          </div>
        </form>
      </div>
    </div>
  );
};

export default Studentsignin;
