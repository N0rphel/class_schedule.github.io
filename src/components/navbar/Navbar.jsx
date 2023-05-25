import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../../backend/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setPhotoURL(userData.avatar);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav
      className={`${
        scrolled ? "bg-gray-100 shadow-lg" : "bg-transparent"
      } transition-colors duration-500 fixed w-full z-20`}
    >
      <div className="flex items-center font-medium justify-between">
        <div className="flex z-10 py-4 items-center justify-between md:w-auto w-full pl-4">
          <img className="w-20 h-20" src="./pictures/icon.png" alt="/" />
          <div className="flex flex-col">
            <h3 className="text-xl text-black uppercase">Classhedule</h3>
            <span>Stay Organized</span>
          </div>
          <div className="sm:hidden px-4 " onClick={() => setOpen(!open)}>
            {open ? <FaBars size={20} /> : <FaTimes size={20} />}
          </div>
        </div>
        <ul className="md:flex  text-white hidden uppercase items-center gap-8 pr-4">
          <li>
            <Link
              to="/home"
              className={`text-gray-800 duration-500 hover:text-purple-300`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/ccs"
              className={`text-gray-800 duration-500 hover:text-purple-300`}
            >
              CLASS
            </Link>
          </li>
          <li>
            <Link
              to="/scs"
              className={`text-gray-800 duration-500 hover:text-purple-300`}
            >
              TEACHERS
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              className={`text-gray-800 duration-500 hover:text-purple-300`}
            >
              To-Do
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`text-gray-800 duration-500 hover:text-purple-300`}
            >
              Contact
            </Link>
          </li>
          <li>
            <img
              onClick={() => setOpenProfile(!openProfile)}
              src={photoURL || "./pictures/profile/people-default.svg"}
              alt="profile"
              className="rounded-full w-10 h-10 cursor-pointer ring-2 hover:ring-purple-600 duration-500"
            />
          </li>
        </ul>

        {/*mobile nav*/}
        <ul
          className={`sm:hidden absolute bg-gray-100 w-full h-screen bottom-0 py-24 pl-4
        duration-500 ${open ? "left-[-100%] top-0 " : "left-0 top-0"}`}
        >
          <li
            className="px-3 py-8 text-left md:cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className="px-3 py-8 text-left md:cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            <Link to="/profile">profile</Link>
          </li>
          <li
            className="px-3 py-8  text-left md:cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            <Link to="/ccs">CCS</Link>
          </li>
          <li
            className="px-3 py-8 text-left md:cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            <Link to="/scs">SCS</Link>
          </li>
          <li
            className="px-3 py-8  text-left md:cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            <Link to="/todo">To-Do</Link>
          </li>
          <li
            className="px-3 py-8  text-left md:cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      {openProfile && (
        <ul className="absolute right-1 top-[104px] mt-2 py-2 bg-white rounded shadow-lg">
          {/* Dropdown list items */}
          <li className="px-4 py-2 hover:bg-gray-200 duration-500 cursor-pointer">
            <Link to="/account">Account</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 duration-500 cursor-pointer">
            Switch Accounts
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 duration-500 cursor-pointer">
            Help
          </li>
          <li
            onClick={() => signOut(auth)}
            className="px-4 py-2 hover:bg-gray-200 duration-500 cursor-pointer"
          >
            Log Out
          </li>
        </ul>
      )}
    </nav>
  );
}
