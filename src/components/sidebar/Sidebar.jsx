import { IoIosNotifications } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdFeedback } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";

export default function SideBar() {
  return (
    <div className="w-[80px] md:w-[210px] py-4 shadow-lg">
      <div className=" ">
        <div className="flex items-center p-4">
          <img
            src="./pictures/ss.png"
            alt="profile"
            className="w-[7vh] rounded-full mr-4"
          />
          <div className="hidden md:flex flex-col text-gray-900">
            <span className="text-sm font-bold">Tshering Norphel</span>
            <span className="text-sm text-gray-700">@Nofaillegal</span>
          </div>
        </div>
        <ul className="px-4 flex-col items-center">
          <li className="py-4 flex  gap-4 items-center">
            <IoIosNotifications size={40} />
            <span className="hidden md:flex text-sm font-bold">
              Notification
            </span>
          </li>
          <li className="py-4 flex  gap-4 items-center">
            <AiFillSetting size={40} />
            <span className="hidden md:flex text-sm font-bold">Setting</span>
          </li>
          <li className="py-4 flex  gap-4 items-center">
            <MdFeedback size={40} />
            <span className="hidden md:flex text-sm font-bold">Feedback</span>
          </li>
          <li className="py-4 flex  gap-4 items-center">
            <FiLogOut size={40} />
            <span className="hidden md:flex text-sm font-bold">Log out</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
