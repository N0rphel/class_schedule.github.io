import { useEffect } from "react";
import { useState } from "react";
import { retrieveNoti } from "./notificationBackend";

const Notification = ({ userID }) => {
  const [notiData, setNotiData] = useState([]);

  useEffect(() => {
    const fetchNoti = async () => {
      try {
        const noti = await retrieveNoti(userID);
        setNotiData(noti);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNoti();
  }, [userID]);

  return (
    <div className="w-full m-4">
      <h1 className="text-gray-600 text-xl font-bold">Notification</h1>
      <div className="flex flex-col gap-4 p-4 bg-green-200 rounded-lg shadow-lg w-1/3">
        {notiData.map((col, index) => (
          <div
            key={index}
            className="flex flex-col p-4 bg-green-300 rounded-lg "
          >
            <p className="text-lg font-bold text-gray-900">
              {col.code} {col.type} {col.type === "removed" ? "from" : "to"}{" "}
              {col.blockDay} period {col.period}
            </p>
            <p className="text-sm font-bold text-gray-600">
              Updated at {col.time} on {col.day} by {col.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
