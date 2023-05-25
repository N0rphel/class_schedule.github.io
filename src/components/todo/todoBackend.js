import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../backend/firebase";

export const addItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, "items"), { data: item });
    return docRef.id;
  } catch (err) {
    console.error(err);
  }
};
