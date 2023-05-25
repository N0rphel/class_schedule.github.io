import { db } from "../../backend/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { TeacherData } from "../data/schedule";
import { getAuth } from "firebase/auth";

const asd = getAuth();
export const user = asd.currentUser;

export const getRole = async (user) => {
  if (user != null) {
    const uid = user.uid;
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().role;
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const createClass = async () => {
  const class2IT = TeacherData;
  try {
    await setDoc(doc(db, "class", "2IT"), {
      class2IT,
    });
    alert("ClassScheduleCreated");
  } catch (err) {
    console.err(err);
  }
};

export const saveTable = async (data) => {
  const class2IT = data;
  try {
    const docRef = doc(db, "class", "2IT");
    await setDoc(docRef, {
      class2IT,
    });
    alert("Save successful");
  } catch (err) {
    console.error(err);
  }
};

export const retrieveTable = async () => {
  try {
    const docRef = doc(db, "class", "2IT");
    const docSnap = await getDoc(docRef);
    return docSnap.data().class2IT;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const generateDay = (num) => {
  if (num > 0 && num <= 7) {
    return "Monday";
  }
  if (num > 7 && num <= 14) {
    return "Tuesday";
  }
  if (num > 14 && num <= 21) {
    return "Wednesday";
  }
  if (num > 21 && num <= 28) {
    return "Thursday";
  }
  if (num > 28 && num <= 35) {
    return "Friday";
  }
  if (num > 35 && num <= 42) {
    return "Saturday";
  }
};

export const retrieveUsername = async (userID) => {
  try {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const username = userData.username;
      return username;
    } else {
      console.log("User document does not exist");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
