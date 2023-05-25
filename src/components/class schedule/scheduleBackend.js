import { db } from "../../backend/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { TeacherData } from "../data/schedule";
import { getAuth } from "firebase/auth";

export const user = getAuth();

export const createTable = async (uid) => {
  try {
    await setDoc(doc(db, "teachers", uid), {
      TeacherData,
    });
    alert("Created");
  } catch (err) {
    console.error(err);
  }
};

export const retrieveTable = async (uid) => {
  try {
    const docRef = doc(db, "teachers", uid);
    const docSnap = await getDoc(docRef);
    alert("success Retrieval");
    return docSnap.data().TeacherData;
  } catch (err) {
    alert(err);
    console.log(err);
    return [];
  }
};

export const saveTable = async (data, uid) => {
  const TeacherData = data;
  try {
    const docRef = doc(db, "teachers", uid);
    await setDoc(docRef, {
      TeacherData,
    });
    alert("Save successful");
  } catch (err) {
    console.error(err);
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
