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
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from './config';

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  graduationDate: string;
  description: string;
}

export interface SkillEntry {
  id: string;
  name: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  associatedExperience: string;
  description: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  dateAcquired: string;
  description: string;
}

export interface ResumeData {
  id?: string;
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  template?: string;
  sectionOrder?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const getUserCollection = (userId: string) => 
  collection(db, 'users', userId, 'resumes');

export const saveResume = async (
  userId: string, 
  data: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const docRef = await addDoc(getUserCollection(userId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateResume = async (
  userId: string,
  resumeId: string,
  data: Partial<ResumeData>
): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'resumes', resumeId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const getResumes = async (userId: string): Promise<ResumeData[]> => {
  const q = query(getUserCollection(userId), orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as ResumeData));
};

export const getResume = async (userId: string, resumeId: string): Promise<ResumeData | null> => {
  const docRef = doc(db, 'users', userId, 'resumes', resumeId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as ResumeData;
};

export const deleteResume = async (userId: string, resumeId: string): Promise<void> => {
  const docRef = doc(db, 'users', userId, 'resumes', resumeId);
  await deleteDoc(docRef);
};
