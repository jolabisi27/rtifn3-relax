import { Voter, SupportGroupRecord } from '../types';
import { firebaseDbService } from './firebase';

const API_BASE = '/api';

// Helper to perform fetch with quick timeout so client is snappy
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 2500): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export const apiService = {
  // --- VOTERS / SUPPORTERS ---
  async fetchVoters(): Promise<Voter[]> {
    // 1. Try Firebase Firestore Cloud Database first
    try {
      const firestoreVoters = await firebaseDbService.fetchVoters();
      if (Array.isArray(firestoreVoters) && firestoreVoters.length > 0) {
        try {
          localStorage.setItem('rtifn_voters_db', JSON.stringify(firestoreVoters));
        } catch (e) { /* ignore */ }
        return firestoreVoters;
      }
    } catch (err) {
      console.warn('Firestore fetch voters skipped:', err);
    }

    // 2. Try Node.js Express server API if running on fullstack container
    try {
      const res = await fetchWithTimeout(`${API_BASE}/voters`, {
        headers: { 'Accept': 'application/json' }
      }, 2000);
      
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          try {
            localStorage.setItem('rtifn_voters_db', JSON.stringify(json.data));
          } catch (e) { /* ignore */ }
          return json.data;
        }
      }
    } catch (err) {
      // Quiet fallback
    }

    // 3. Fallback to browser local cache
    try {
      const saved = localStorage.getItem('rtifn_voters_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { /* ignore */ }

    return [];
  },

  async registerVoter(voter: Voter): Promise<{ success: boolean; voter: Voter; total?: number }> {
    // 1. Instant local persistence for zero delay
    try {
      const saved = localStorage.getItem('rtifn_voters_db');
      const existing: Voter[] = saved ? JSON.parse(saved) : [];
      const updated = [voter, ...existing.filter(v => v.id !== voter.id)];
      localStorage.setItem('rtifn_voters_db', JSON.stringify(updated));
    } catch (e) { /* ignore */ }

    // 2. Save directly to Firebase Firestore
    const firestorePromise = firebaseDbService.saveVoter(voter).catch((err) => {
      console.warn('Firestore background save note:', err);
    });

    // 3. Save to Express server endpoint
    const apiPromise = fetchWithTimeout(`${API_BASE}/voters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(voter)
    }, 2500).catch(() => null);

    await Promise.race([
      Promise.all([firestorePromise, apiPromise]),
      new Promise(resolve => setTimeout(resolve, 800)) // Max 800ms wait so user never hangs
    ]);

    return { success: true, voter };
  },

  async deleteVoter(id: string): Promise<boolean> {
    try {
      const saved = localStorage.getItem('rtifn_voters_db');
      if (saved) {
        const existing: Voter[] = JSON.parse(saved);
        const filtered = existing.filter(v => v.id !== id);
        localStorage.setItem('rtifn_voters_db', JSON.stringify(filtered));
      }
    } catch (e) { /* ignore */ }

    try {
      await firebaseDbService.deleteVoter(id);
    } catch (e) { /* ignore */ }

    try {
      await fetchWithTimeout(`${API_BASE}/voters/${id}`, { method: 'DELETE' }, 2000);
    } catch (err) { /* ignore */ }

    return true;
  },

  // --- SUPPORT GROUPS ---
  async fetchSupportGroups(): Promise<SupportGroupRecord[]> {
    // 1. Firebase Firestore first
    try {
      const firestoreGroups = await firebaseDbService.fetchSupportGroups();
      if (Array.isArray(firestoreGroups) && firestoreGroups.length > 0) {
        try {
          localStorage.setItem('rtifn_support_groups_db', JSON.stringify(firestoreGroups));
        } catch (e) { /* ignore */ }
        return firestoreGroups;
      }
    } catch (err) {
      console.warn('Firestore fetch support groups skipped:', err);
    }

    // 2. Express Server API
    try {
      const res = await fetchWithTimeout(`${API_BASE}/support-groups`, {
        headers: { 'Accept': 'application/json' }
      }, 2000);
      
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          try {
            localStorage.setItem('rtifn_support_groups_db', JSON.stringify(json.data));
          } catch (e) { /* ignore */ }
          return json.data;
        }
      }
    } catch (err) { /* ignore */ }

    // 3. Local storage
    try {
      const saved = localStorage.getItem('rtifn_support_groups_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { /* ignore */ }

    return [];
  },

  async registerSupportGroup(group: SupportGroupRecord): Promise<{ success: boolean; group: SupportGroupRecord; total?: number }> {
    // 1. Local storage
    try {
      const saved = localStorage.getItem('rtifn_support_groups_db');
      const existing: SupportGroupRecord[] = saved ? JSON.parse(saved) : [];
      const updated = [group, ...existing.filter(g => g.id !== group.id)];
      localStorage.setItem('rtifn_support_groups_db', JSON.stringify(updated));
    } catch (e) { /* ignore */ }

    // 2. Firebase Firestore
    const firestorePromise = firebaseDbService.saveSupportGroup(group).catch(() => null);

    // 3. Express server
    const apiPromise = fetchWithTimeout(`${API_BASE}/support-groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(group)
    }, 2500).catch(() => null);

    await Promise.race([
      Promise.all([firestorePromise, apiPromise]),
      new Promise(resolve => setTimeout(resolve, 800))
    ]);

    return { success: true, group };
  },

  // --- INQUIRIES ---
  async submitInquiry(inquiry: { name: string; phone: string; category: string; message: string }): Promise<boolean> {
    const id = `inq_${Date.now()}`;
    const payload = {
      id,
      ...inquiry,
      createdAt: new Date().toISOString()
    };

    try {
      firebaseDbService.saveInquiry(payload).catch(() => null);
    } catch (e) { /* ignore */ }

    try {
      await fetchWithTimeout(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      }, 2500);
      return true;
    } catch (err) {
      return true;
    }
  }
};
