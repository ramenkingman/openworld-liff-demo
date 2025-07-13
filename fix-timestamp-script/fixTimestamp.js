// fixTimestamp.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwqG7to68d7O9KQ2EPWaU1DUFm_Cq9HXo",
  authDomain: "openworld-liff.firebaseapp.com",
  projectId: "openworld-liff",
  storageBucket: "openworld-liff.appspot.com",
  messagingSenderId: "79997022356",
  appId: "1:79997022356:web:89e7081d808bc5fc418481",
  measurementId: "G-SRK6BVFDYN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixRegisteredAtFields() {
  const membersRef = collection(db, "members");
  const snapshot = await getDocs(membersRef);

  let count = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const registeredAt = data.registeredAt;

    if (typeof registeredAt === "string") {
      const newTimestamp = Timestamp.fromDate(new Date(registeredAt));
      const docRef = doc(db, "members", docSnap.id);

      await updateDoc(docRef, { registeredAt: newTimestamp });
      console.log(`✔️ updated: ${docSnap.id}`);
      count++;
    }
  }

  console.log(`✅ 完了！${count} 件の registeredAt を修正しました。`);
}

fixRegisteredAtFields();
