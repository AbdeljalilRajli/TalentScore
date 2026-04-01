import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';

export interface JobApplication {
  id?: string;
  company: string;
  role: string;
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'ghosted';
  appliedDate: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const getUserCollection = (userId: string) => 
  collection(db, 'users', userId, 'applications');

export const addApplication = async (
  userId: string, 
  data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const docRef = await addDoc(getUserCollection(userId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const getApplications = async (userId: string): Promise<JobApplication[]> => {
  const q = query(getUserCollection(userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as JobApplication));
};

export const updateApplication = async (
  userId: string, 
  appId: string, 
  data: Partial<JobApplication>
): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'applications', appId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteApplication = async (userId: string, appId: string): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'applications', appId);
  await deleteDoc(docRef);
};
