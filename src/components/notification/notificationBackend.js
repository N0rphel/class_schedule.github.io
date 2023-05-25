import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../backend/firebase";

export const notify = async (noti, uid) => {
  try {
    await setDoc(doc(db, "notification", uid), {
      noti,
    });
    alert(`${uid} created`);
  } catch (err) {
    console.log(err);
  }
};

export const retrieveNoti = async (userID) => {
  try {
    const docRef = doc(db, "notification", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.data().noti;
  } catch (err) {
    alert(userID);

    console.error(err);
    return [];
  }
};

export const retrieveEmail = async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);
    const emails = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const email = data.email;
      if (email) {
        emails.push(email);
      }
    });

    return emails;
  } catch (err) {
    console.error(err);
    return [];
  }
};
