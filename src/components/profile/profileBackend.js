import { getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { doc } from "firebase/firestore";

export const fetchData = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (err) {
    console.log(err);
  }
};

export const updateUsername = async (uid, username) => {
  try {
    const docRef = doc(db, "users", uid);
    console.log(uid);
    await updateDoc(docRef, {
      username: username,
    });
  } catch (err) {
    console.log(uid, "failed");
    console.error(err);
  }
};

export const updateBio = async (uid, bio) => {
  try {
    const docRef = doc(db, "users", uid);
    console.log(uid);
    await updateDoc(docRef, {
      bio: bio,
    });
  } catch (err) {
    console.log(uid, "failed");
    console.error(err);
  }
};

export const updateAvatar = async (uid, url) => {
  try {
    const docRef = doc(db, "users", uid);
    console.log(url);
    await updateDoc(docRef, {
      avatar: url,
    });
  } catch (err) {
    console.log(uid, "failed");
    console.error(err);
  }
};
