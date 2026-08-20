import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Voter, SupportGroupRecord } from '../types';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Use custom firestoreDatabaseId if provided, or default
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const COLLECTIONS = {
  VOTERS: 'voters',
  SUPPORT_GROUPS: 'support_groups',
  INQUIRIES: 'inquiries'
};

export const firebaseDbService = {
  // --- VOTERS ---
  async fetchVoters(): Promise<Voter[]> {
    try {
      const votersRef = collection(db, COLLECTIONS.VOTERS);
      const q = query(votersRef, limit(2000));
      const querySnapshot = await getDocs(q);
      const list: Voter[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Voter;
        list.push({
          ...data,
          id: data.id || docSnap.id
        });
      });

      // Sort newest first
      list.sort((a, b) => new Date(b.registeredAt || 0).getTime() - new Date(a.registeredAt || 0).getTime());
      return list;
    } catch (err) {
      console.warn('Firestore fetch voters failed, falling back:', err);
      return [];
    }
  },

  async saveVoter(voter: Voter): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.VOTERS, voter.id);
      // Strip undefined values for clean Firestore storage
      const cleanData = JSON.parse(JSON.stringify(voter));
      await setDoc(docRef, {
        ...cleanData,
        _updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (err) {
      console.error('Firestore save voter error:', err);
      return false;
    }
  },

  async deleteVoter(id: string): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.VOTERS, id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.error('Firestore delete voter error:', err);
      return false;
    }
  },

  // --- SUPPORT GROUPS ---
  async fetchSupportGroups(): Promise<SupportGroupRecord[]> {
    try {
      const sgRef = collection(db, COLLECTIONS.SUPPORT_GROUPS);
      const q = query(sgRef, limit(1000));
      const querySnapshot = await getDocs(q);
      const list: SupportGroupRecord[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as SupportGroupRecord;
        list.push({
          ...data,
          id: data.id || docSnap.id
        });
      });
      list.sort((a, b) => new Date(b.registeredAt || 0).getTime() - new Date(a.registeredAt || 0).getTime());
      return list;
    } catch (err) {
      console.warn('Firestore fetch support groups failed:', err);
      return [];
    }
  },

  async saveSupportGroup(group: SupportGroupRecord): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.SUPPORT_GROUPS, group.id);
      const cleanData = JSON.parse(JSON.stringify(group));
      await setDoc(docRef, {
        ...cleanData,
        _updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (err) {
      console.error('Firestore save support group error:', err);
      return false;
    }
  },

  // --- INQUIRIES ---
  async saveInquiry(inquiry: { id: string; name: string; phone: string; category: string; message: string; createdAt: string }): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.INQUIRIES, inquiry.id);
      await setDoc(docRef, {
        ...inquiry,
        _updatedAt: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.error('Firestore save inquiry error:', err);
      return false;
    }
  }
};
