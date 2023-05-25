import { TfiWorld } from "react-icons/tfi";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="static bottom-0 w-full bg-black grid grid-cols-2  md:grid-cols-5  gap-x-8 text-white">
      <div className="col-span-2 md:col-span-1 mx-auto flex items-center py-4">
        <img src="./pictures/icon.png" alt="logo" className="w-[100px]" />
      </div>
      <div className="p-4">
        <h1 className="text-sm text-gray-500 font-bold cursor-default">
          ClassHEDULE
        </h1>
        <ul className="text-xs py-4">
          <li className="py-2">
            <a href="/">Home</a>
          </li>
          <li className="py-2">
            <a href="/">Trust &amp; Security </a>
          </li>
          <li className="py-2">
            <a href="/">Premium</a>
          </li>
          <li className="py-2">
            <a href="/">Templates</a>
          </li>
          <li className="py-2">
            <a href="/">GitHub</a>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <h1 className="text-sm text-gray-500 font-bold cursor-default font-bold">
          About Us
        </h1>
        <ul className="text-xs py-4">
          <li className="py-2">
            <a href="/">Team</a>
          </li>
          <li className="py-2">
            <a href="/">Design</a>
          </li>
          <li className="py-2">
            <a href="/">Planning</a>
          </li>
          <li className="py-2">
            <a href="/">Statement</a>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <h1 className="text-sm text-gray-500 font-bold cursor-default font-bold">
          Workflow Solutions
        </h1>
        <ul className="text-xs py-4">
          <li className="py-2">
            <a href="/">Class Management</a>
          </li>
          <li className="py-2">
            <a href="/">Personal Scheduler</a>
          </li>
          <li className="py-2">
            <a href="/">Increase Productivity</a>
          </li>
          <li className="py-2">
            <a href="/">To-Do Lists</a>
          </li>
          <li className="py-2">
            <a href="/">Book-and-Meet</a>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <h1 className="text-sm font-bold cursor-default text-gray-500 font-bold">
          CLassHEDULE Guide
        </h1>
        <ul className="text-xs py-4">
          <li className="py-2">
            <a href="/">Forum</a>
          </li>
          <li className="py-2">
            <a href="/">Support</a>
          </li>
          <li className="py-2">
            <a href="/">Developer &amp; API</a>
          </li>
          <li className="py-2">
            <a href="/">Accessibility</a>
          </li>
        </ul>
      </div>
      <div className="w-full col-span-2 md:col-span-5 flex justify-between py-8 bg-gray-700">
        <ul className="w-full px-4 flex flex-col md:flex-row justify-between gap-4">
          <li className="cursor-pointer">&copy; 2023 Classchedule</li>
          <li className="flex items-center cursor-pointer gap-4">
            <TfiWorld />
            Language
          </li>
          <li className="cursor-pointer">Term &amp; Privacy</li>
          <li>
            <div className="flex ">
              <FaFacebookF size={20} className="mx-4 cursor-pointer" />
              <FaTwitter size={20} className="mx-4 cursor-pointer" />
              <FaGooglePlusG size={20} className="mx-4 cursor-pointer" />
              <FaInstagram size={20} className="mx-4 cursor-pointer" />
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
}
