import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import TeacherTable from "../teachers/TeacherTable";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { getRole } from "../class schedule/class";
import { useEffect } from "react";
import { updateAvatar, updateBio, updateUsername } from "./profileBackend";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../backend/firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

const ProfilePage = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [url, setUrl] = useState(null);

  const asd = getAuth();
  const user = asd.currentUser;

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username);
          setEmail(userData.email);
          setBio(userData.bio);
          setPhotoURL(userData.avatar);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfileData();
  }, [user]);
  // Call the getRole function to retrieve the role value
  useEffect(() => {
    getRole(user).then((userRole) => {
      setRole(userRole);
    });
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const profileRef = ref(storage, "profiles");

    const filename = `${avatar.name}_${user.uid}`;

    const imageRef = ref(profileRef, filename);

    uploadBytes(imageRef, avatar)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            updateAvatar(user.uid, url);
          })
          .catch((err) => {
            console.error(err);
          });

        setAvatar(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full mt-[110px] m-0">
      <div className="w-full m-0 flex rounded-lg shadow-small">
        <div className="w-1/2 flex flex-col items-center ">
          <div className="p-4">
            <img
              src={photoURL || "./pictures/profile/people-default.svg"}
              alt="profile"
              className="h-[300px] w-[300px]"
            />
          </div>
          <div className="flex">
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSubmit}>Save Button</button>
          </div>
        </div>

        {
          //Details
        }

        <div className="w-1/2 p-2 ">
          <h1 className="text-gray-600 text-xl py-2 font-bold">User Details</h1>
          <div className="flex y-2">
            <input
              className="border-2 w-2/3 rounded-lg shadow-sm m p-2"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ outline: "none" }}
            />
            {
              <FaCheckCircle
                size={20}
                style={{ color: "green" }}
                className="-translate-x-8 translate-y-3 cursor-pointer"
                title="Update"
                onClick={() => updateUsername(user.uid, username)}
              />
            }
          </div>
          <div className="flex my-2">
            <input
              className="border-2 w-2/3  rounded-lg shadow-sm  p-2"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ outline: "none" }}
            />

            {
              <FaCheckCircle
                size={20}
                style={{ color: "green" }}
                className="-translate-x-8 translate-y-3 cursor-pointer"
                title="Update"
                onClick={() => updateBio(user.uid, bio)}
              />
            }
          </div>

          <div className="flex my-2">
            <textarea
              className="border-2 w-2/3 h-[150px] rounded-lg shadow-sm p-2"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write About Yourself..."
              style={{ outline: "none" }}
            />
            {
              <FaCheckCircle
                size={20}
                style={{ color: "green" }}
                onClick={() => updateBio(user.uid, bio)}
                className="-translate-x-8 translate-y-3 cursor-pointer"
                title="Update"
              />
            }
          </div>
        </div>
      </div>
      {
        //Timetable
      }

      {role !== null && role === "teacher" ? (
        <TeacherTable uid={user.uid} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePage;
