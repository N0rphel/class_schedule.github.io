import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const [isRole, setIsRole] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (email !== "" && password !== "") {
      try {
        await createUser(email, password, isRole);
        navigate("/");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };
  console.log(isRole);
  return (
    <div className="flex justify-center">
      <div className="w-1/2 hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={"./pictures/assets/pexels-miguel-á-padriñán-194094.jpg"}
          alt=""
        />
      </div>
      <div className="bg-gray-200 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto rounded-lg bg-white p-8"
        >
          <div>
            <button
              className={`text-sm font-semibold my-2 px-4 rounded focus:outline-none ${
                isRole === "teacher"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => setIsRole("teacher")}
            >
              Teacher
            </button>
            <button
              className={`text-sm font-semibold my-2 px-4 rounded focus:outline-none ${
                isRole === "cr"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => setIsRole("cr")}
            >
              CR
            </button>
            <button
              className={`text-sm font-semibold my-2 px-4 rounded focus:outline-none ${
                isRole === "student"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => setIsRole("student")}
            >
              Student
            </button>
          </div>
          <h2 className="text-4xl font-bold text-center">Sign Up</h2>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-lg h-14 mt-2 focus:border-blue-500 focus:bg-gray-100 focus:outline-none"
              type="email"
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
              <input className="mr-2" type="checkbox" /> I agree to the Terms
              and Conditions
            </p>
          </div>

          <button className="w-full h-14 my-5 py-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg">
            Sign Up
          </button>
          <div className="w-full h-14 bg-teal-500 my-2 flex rounded-md p-4 text-center cursor-pointer hover:bg-teal-400 text-white font-semibold rounded-lg">
            <img
              src={"./pictures/assets/Google__G__Logo.svg.png"}
              className="h-6 mr-9"
              alt="Google Logo"
            />
            Sign Up With Google
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
