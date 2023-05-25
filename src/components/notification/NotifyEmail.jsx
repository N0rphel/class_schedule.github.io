import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { retrieveEmail, retrieveNoti } from "./notificationBackend";

export default function NotifyEmail({ userID, onCancel }) {
  const [notiData, setNotiData] = useState([]);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState([]);

  useEffect(() => {
    const fetchNoti = async () => {
      try {
        const noti = await retrieveNoti(userID);
        setNotiData(noti);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEmail = async () => {
      try {
        const recipients = await retrieveEmail();
        setEmailRecipients(recipients);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmail();
    fetchNoti();
  }, [userID]);

  const handleCancel = () => {
    onCancel(); // Call the onCancel callback
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const message = notiData
      .map((col, index) => {
        const action = col.type === "removed" ? "from" : "to";
        const updatedDateTime = `${col.time} on ${col.day}`;

        return `${col.code} ${col.type} ${action} ${col.blockDay} period ${col.period}\nUpdated at ${updatedDateTime} by ${col.author}\n\n`;
      })
      .join("");

    const sendNotificationEmail = async (message) => {
      // Set up email service parameters
      const serviceID = "service_h7rcs3f";
      const templateID = "template_6ig8fjv";
      const userID = "YAZotXJpj08R8erQO";

      const params = {
        from_name: "ClassSchedule",
        to_name: "jza2",
        receiverEmail: emailRecipients,
        message: message,
      };

      try {
        emailjs.send(serviceID, templateID, params, userID);
        setIsEmailSent(true);
        setTimeout(() => {
          handleCancel();
        }, 2000);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    sendNotificationEmail(message);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h1>Send Notification To all?</h1>
        <div>
          {notiData.map((not, index) => (
            <h1 key={index}>
              {not.code} {not.type} {not.type === "removed" ? "from" : "to"}{" "}
              {not.blockDay} period {not.period}
            </h1>
          ))}
        </div>
        <form onSubmit={sendEmail}>
          {isEmailSent ? (
            <p>Email has been sent.</p>
          ) : (
            <div className="flex gap-1">
              <button className="p-4 bg-gray-100 rounded-lg" type="submit">
                Send Notification Email
              </button>
              <button
                className="p-4 bg-gray-100 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
