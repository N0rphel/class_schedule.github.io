import React, { useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import ListSchedules from "./ListSchedules";

const TeachSchedules = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teachersData, setTeachersData] = useState([]);

  useEffect(() => {
    const getAllTeachers = async () => {
      const db = getFirestore();
      const collectionRef = collection(db, "users");

      try {
        const querySnapshot = await getDocs(collectionRef);
        const teachers = querySnapshot.docs
          .filter((doc) => doc.data().role === "teacher") // Filter users with role "teacher"
          .map((doc) => {
            const teacherData = doc.data();
            return {
              id: doc.id,
              name: teacherData.username,
              image: teacherData.avatar,
            };
          });
        setTeachersData(teachers);
      } catch (error) {
        console.error("Error getting teachers:", error);
      }
    };

    getAllTeachers();
  }, []);

  const teacherHandler = (teacher) => {
    setSelectedTeacher(teacher);
  };

  return (
    <div>
      <h1>Teachers</h1>
      <div className="flex">
        {teachersData.map((teacher) => (
          <div
            key={teacher.id}
            className="cursor-pointer"
            onClick={() => teacherHandler(teacher.id)}
          >
            <img
              src={teacher.image || "/pictures/profile/people-default.svg"}
              alt={teacher.name}
              className="h-[200px] w-[200px]"
            />
            <span>{teacher.username || "Username_Undefined"}</span>
          </div>
        ))}
      </div>
      {selectedTeacher && (
        <ListSchedules key={selectedTeacher} uid={selectedTeacher} />
      )}
    </div>
  );
};

export default TeachSchedules;
