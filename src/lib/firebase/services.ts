import app from "./init";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";

const firestore = getFirestore(app);

export async function add(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false, error);
    });
}

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

export async function retrieveDataByName(
  collectionName: string,
  field: string,
  name: string
) {
  const keyword = name.toLowerCase();
  const q = query(collection(firestore, collectionName));
  const querySnapshot = await getDocs(q);
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    if (docData[field].toLowerCase().includes(keyword)) {
      data.push({ id: doc.id, ...docData });
    }
  });
  return data;
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}
