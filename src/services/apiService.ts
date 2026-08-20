import { Voter, SupportGroupRecord } from '../types';

const API_BASE = '/api';

export const apiService = {
  // --- VOTERS / SUPPORTERS ---
  async fetchVoters(): Promise<Voter[]> {
    try {
      const res = await fetch(`${API_BASE}/voters`, {
        headers: { 'Accept': 'application/json' }
      });
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
      console.warn('Could not fetch voters from server API, falling back to local store:', err);
    }

    // Fallback to local storage
    try {
      const saved = localStorage.getItem('rtifn_voters_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) { /* ignore */ }

    return [];
  },

  async registerVoter(voter: Voter): Promise<{ success: boolean; voter: Voter; total?: number }> {
    // 1. Always update local storage first so user has immediate optimistic persistence
    try {
      const saved = localStorage.getItem('rtifn_voters_db');
      const existing: Voter[] = saved ? JSON.parse(saved) : [];
      const updated = [voter, ...existing.filter(v => v.id !== voter.id)];
      localStorage.setItem('rtifn_voters_db', JSON.stringify(updated));
    } catch (e) { /* ignore */ }

    // 2. Post to central server
    try {
      const res = await fetch(`${API_BASE}/voters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(voter)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.voter) {
          return { success: true, voter: json.voter, total: json.total };
        }
      }
    } catch (err) {
      console.warn('Central server sync pending; saved locally:', err);
    }

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
      const res = await fetch(`${API_BASE}/voters/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch (err) {
      return true;
    }
  },

  // --- SUPPORT GROUPS ---
  async fetchSupportGroups(): Promise<SupportGroupRecord[]> {
    try {
      const res = await fetch(`${API_BASE}/support-groups`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          try {
            localStorage.setItem('rtifn_support_groups_db', JSON.stringify(json.data));
          } catch (e) { /* ignore */ }
          return json.data;
        }
      }
    } catch (err) {
      console.warn('Could not fetch support groups from server API:', err);
    }

    // Fallback to local storage
    try {
      const saved = localStorage.getItem('rtifn_support_groups_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) { /* ignore */ }

    return [];
  },

  async registerSupportGroup(group: SupportGroupRecord): Promise<{ success: boolean; group: SupportGroupRecord; total?: number }> {
    // 1. Update local storage
    try {
      const saved = localStorage.getItem('rtifn_support_groups_db');
      const existing: SupportGroupRecord[] = saved ? JSON.parse(saved) : [];
      const updated = [group, ...existing.filter(g => g.id !== group.id)];
      localStorage.setItem('rtifn_support_groups_db', JSON.stringify(updated));
    } catch (e) { /* ignore */ }

    // 2. Post to central server
    try {
      const res = await fetch(`${API_BASE}/support-groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(group)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.group) {
          return { success: true, group: json.group, total: json.total };
        }
      }
    } catch (err) {
      console.warn('Central server sync pending; saved locally:', err);
    }

    return { success: true, group };
  },

  // --- INQUIRIES ---
  async submitInquiry(inquiry: { name: string; phone: string; category: string; message: string }): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(inquiry)
      });
      return res.ok;
    } catch (err) {
      return true;
    }
  }
};
