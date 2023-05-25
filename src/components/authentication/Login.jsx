import React, { useState } from "react";
import TeacherSignIn from "./Teachersignin";
import StudentSignIn from "./Studentsignin";
import CRSignIn from "./Crsignin";
//log in is actually sign up
const Login = () => {
  const [activeTab, setActiveTab] = useState("student");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log(activeTab);
  return (
    <div className="container  py-8 px-4">
      <div className=" bg-green shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-200 py-2">
          <div className="flex flex-wrap items-center justify-center">
            <button
              className={`text-sm font-semibold mr-4 my-2 px-4 rounded focus:outline-none ${
                activeTab === "teacher"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => handleTabClick("teacher")}
            >
              Teacher
            </button>
            <button
              className={`text-sm font-semibold mr-4 my-2 px-4 rounded focus:outline-none ${
                activeTab === "student"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => handleTabClick("student")}
            >
              Student
            </button>
            <button
              className={`text-sm font-semibold my-2 px-4 rounded focus:outline-none ${
                activeTab === "cr"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => handleTabClick("cr")}
            >
              CR
            </button>
          </div>
        </div>
        <TeacherSignIn role={activeTab} />
      </div>
    </div>
  );
};

export default Login;
