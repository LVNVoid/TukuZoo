import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcryptjs";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    role?: string;
    password: string;
  },
  callback: Function
) {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      callback(false);
      return;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await addDoc(collection(firestore, "users"), {
      ...userData,
      role: userData.role ?? "member",
      password: hashedPassword,
    });

    callback(true);
  } catch (error) {
    console.error("SignUp Error:", error);
    callback(false);
  }
}
export async function signIn(email: string) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
  }

  return null;
}
