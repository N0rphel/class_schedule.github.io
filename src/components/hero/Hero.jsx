import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../authentication/Login";
import Signin from "../authentication/Signin";
import SignUp from "../authentication/Signup";
import ClassTable from "../class schedule/ClassTable";
import Footer from "../footer/Footer";
import Home from "../home/Home";
import Navbar from "../navbar/Navbar";
import Todo from "../todo/Todo";
import ProtectedRoute from "../authentication/ProtectedRoute";
import TeachDisplay from "../teacherSchedules/TeachDisplay";

import ProfilePage from "../profile/ProfilePage";

export default function Hero() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/signin";

  const renderNavbar = !(isLoginPage || isSignUpPage || isSignInPage);
  return (
    <div className="flex flex-col m-0">
      {renderNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ccs"
          element={
            <ProtectedRoute>
              <ClassTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scs"
          element={
            <ProtectedRoute>
              <TeachDisplay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}
