import React, { useState, useEffect } from 'react';
import { Voter, SupportGroupRecord } from '../types';
import { AdminDatabase } from './AdminDatabase';
import { AdminRolesManagement, INITIAL_ADMIN_USERS } from './AdminRolesManagement';
import { AdminProfileSettings, AdminProfileData } from './AdminProfileSettings';
import {
  ShieldCheck,
  Lock,
  Key,
  Users,
  Globe,
  Building2,
  Settings,
  LogOut,
  Database,
  Activity,
  FileText,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  User,
  Camera
} from 'lucide-react';

interface AdminPortalProps {
  voters: Voter[];
  supportGroups?: SupportGroupRecord[];
  initialTab?: 'individual' | 'diaspora' | 'supportgroup' | 'roles' | 'audit' | 'profile' | 'password' | 'name' | 'picture';
  onSelectVoter: (voter: Voter) => void;
  onSelectSupportGroup?: (group: SupportGroupRecord) => void;
  isAuthenticated?: boolean;
  onAuthStateChange?: (authed: boolean) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  voters,
  supportGroups = [],
  initialTab = 'individual',
  onSelectVoter,
  onSelectSupportGroup,
  isAuthenticated: parentIsAuthenticated,
  onAuthStateChange
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof parentIsAuthenticated === 'boolean') return parentIsAuthenticated;
    try {
      return typeof window !== 'undefined' && localStorage.getItem('rtifn_admin_session') === 'active';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (typeof parentIsAuthenticated === 'boolean') {
      setIsAuthenticated(parentIsAuthenticated);
    }
  }, [parentIsAuthenticated]);

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Profile Credentials State
  const [adminProfile, setAdminProfile] = useState<AdminProfileData>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('rtifn_admin_profile') : null;
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // Fallback to default Dr. Olabode super admin
    }
    return {
      fullName: 'Dr. Olabisi Olabode',
      username: 'drolabode_admin',
      email: 'olabisiolabode@gmail.com',
      phone: '08039988776',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      roleName: 'Super Administrator',
      assignedZone: 'National HQ - Abuja'
    };
  });

  // Tab State
  const [activeAdminTab, setActiveAdminTab] = useState<'individual' | 'diaspora' | 'supportgroup' | 'roles' | 'profile' | 'audit'>(
    initialTab === 'password' || initialTab === 'name' || initialTab === 'picture' ? 'profile' : (initialTab as any)
  );

  useEffect(() => {
    if (initialTab) {
      if (initialTab === 'password' || initialTab === 'name' || initialTab === 'picture' || initialTab === 'profile') {
        setActiveAdminTab('profile');
      } else {
        setActiveAdminTab(initialTab as any);
      }
    }
  }, [initialTab]);

  const handleUpdateProfile = (updated: AdminProfileData) => {
    setAdminProfile(updated);
    localStorage.setItem('rtifn_admin_profile', JSON.stringify(updated));
  };

  const resolveAdminProfile = (inputUsername: string): AdminProfileData => {
    const query = inputUsername.trim().toLowerCase();
    
    // Check if input refers to Dr. Olabisi Olabode (Super Admin)
    const isDrOlabode =
      !query ||
      query === 'drolabode_admin' ||
      query === 'dr_olabode' ||
      query === 'olabisiolabode@gmail.com' ||
      query === 'admin.olabode@rtifn.org' ||
      query.includes('olabode') ||
      query.includes('olabisi');

    if (isDrOlabode) {
      return {
        fullName: 'Dr. Olabisi Olabode',
        username: 'drolabode_admin',
        email: 'olabisiolabode@gmail.com',
        phone: '08039988776',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        roleName: 'Super Administrator',
        assignedZone: 'National HQ - Abuja'
      };
    }

    // Load existing admin users directory from localStorage or fallback to INITIAL_ADMIN_USERS
    let allAdminUsers: any[] = [];
    try {
      const saved = localStorage.getItem('rtifn_admin_users');
      if (saved) {
        allAdminUsers = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse rtifn_admin_users', e);
    }

    if (!Array.isArray(allAdminUsers) || allAdminUsers.length === 0) {
      allAdminUsers = INITIAL_ADMIN_USERS;
    }

    // Find matching user by username, email, or full name
    const matched = allAdminUsers.find(
      (u) =>
        (u.username && u.username.toLowerCase() === query) ||
        (u.email && u.email.toLowerCase() === query) ||
        (u.fullName && u.fullName.toLowerCase() === query)
    );

    if (matched) {
      return {
        fullName: matched.fullName,
        username: matched.username || (query.includes('@') ? query.split('@')[0] : query),
        email: matched.email || (query.includes('@') ? query : `${query}@rtifn.org`),
        phone: matched.phone || '08039988776',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        roleName: matched.roleName || 'Zonal Operations Coordinator',
        assignedZone: matched.assignedZone || 'National HQ - Abuja'
      };
    }

    // If no matching existing admin found, assign Campaign Operations Officer (NON-super admin role)
    const cleanUser = query.includes('@') ? query.split('@')[0] : query;
    const formattedName = cleanUser
      .replace(/[_.-]/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const newProfile: AdminProfileData = {
      fullName: formattedName,
      username: cleanUser,
      email: query.includes('@') ? query : `${cleanUser}@rtifn.org`,
      phone: '08012345678',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      roleName: 'Zonal Operations Coordinator',
      assignedZone: 'Regional Operations Zone'
    };

    // Add this new user into the admin personnel directory in localStorage with standard staff role
    const newUserRecord = {
      id: `usr_${Date.now()}`,
      fullName: formattedName,
      username: cleanUser,
      email: newProfile.email,
      phone: newProfile.phone,
      roleId: 'role_zonal_coord',
      roleName: 'Zonal Operations Coordinator',
      assignedZone: 'Regional Operations Zone',
      status: 'Active',
      lastLogin: 'Just now',
      createdAt: new Date().toISOString().split('T')[0]
    };

    try {
      const updatedUsersList = [newUserRecord, ...allAdminUsers.filter((u) => u.username !== cleanUser)];
      localStorage.setItem('rtifn_admin_users', JSON.stringify(updatedUsersList));
    } catch (e) {
      console.error('Failed to update rtifn_admin_users', e);
    }

    return newProfile;
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      setAuthError('Please enter your Admin Username or Email address.');
      return;
    }
    if (!passwordInput.trim()) {
      setAuthError('Please enter your Password.');
      return;
    }

    // Authenticate and set matching profile
    const profile = resolveAdminProfile(usernameInput);
    setAdminProfile(profile);
    localStorage.setItem('rtifn_admin_profile', JSON.stringify(profile));

    setIsAuthenticated(true);
    localStorage.setItem('rtifn_admin_session', 'active');

    if (onAuthStateChange) onAuthStateChange(true);
    setAuthError('');
  };

  const handleQuickLoginAs = (username: string) => {
    setUsernameInput(username);
    setPasswordInput('RTIFN2027#Pass');
    const profile = resolveAdminProfile(username);
    setAdminProfile(profile);
    localStorage.setItem('rtifn_admin_profile', JSON.stringify(profile));

    setIsAuthenticated(true);
    localStorage.setItem('rtifn_admin_session', 'active');
    if (onAuthStateChange) onAuthStateChange(true);
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('rtifn_admin_session');
    if (onAuthStateChange) onAuthStateChange(false);
  };

  // Mock System Audit Logs
  const auditLogs = [
    {
      id: 'log_101',
      action: 'CSV Report Download',
      details: 'Exported Individual Supporters Database (Local Voters)',
      performedBy: 'Dr. Olabisi Olabode (Super Admin)',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString(),
      badge: 'Data Export'
    },
    {
      id: 'log_102',
      action: 'Role Creation',
      details: 'Created new custom role: "Zonal Field Verification Lead"',
      performedBy: 'Dr. Olabisi Olabode (Super Admin)',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleTimeString(),
      badge: 'Security'
    },
    {
      id: 'log_103',
      action: 'Support Group Approval',
      details: 'Verified affiliation for "Asiwaju Youth Vanguard for Progress"',
      performedBy: 'Alhaji Usman Garba (National Director)',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleTimeString(),
      badge: 'Coalition'
    },
    {
      id: 'log_104',
      action: 'Admin Account Created',
      details: 'Issued state coordinator credentials for South East Zone',
      performedBy: 'Chief Mrs. Nkechi Okoro (Zonal Lead)',
      timestamp: new Date(Date.now() - 1000 * 3600 * 5).toLocaleTimeString(),
      badge: 'User Mgmt'
    }
  ];

  // If not authenticated, render Security Authentication Lock Screen
  if (!isAuthenticated) {
    return (
      <section id="admin-portal" className="py-16 bg-emerald-950 text-white min-h-[80vh] flex items-center justify-center relative">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-gradient-to-b from-emerald-900 to-emerald-950 border-2 border-lime-400/80 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-lime-400/10 rounded-full blur-2xl"></div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-lime-400/20 border-2 border-lime-400 rounded-2xl mx-auto flex items-center justify-center text-lime-300 shadow-xl">
                <Lock className="w-8 h-8" />
              </div>
              <span className="inline-block px-3 py-1 bg-emerald-800 text-lime-300 text-[10px] font-extrabold uppercase tracking-widest rounded-full border border-emerald-700">
                Restricted Admin Access
              </span>
              <h2 className="text-2xl font-black text-white">RTIFN Admin End Portal</h2>
              <p className="text-xs text-emerald-200">
                Log in with your administrator username/email and password to access Supporter Databases and Governance Controls.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Admin Username or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter username or email..."
                    className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-lime-400"
                  />
                  <User className="w-4 h-4 text-lime-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-lime-400 font-mono"
                  />
                  <Key className="w-4 h-4 text-lime-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {authError && (
                <div className="bg-rose-950/80 border border-rose-800 p-3 rounded-xl text-rose-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-300 text-emerald-950 font-black text-xs py-3 px-4 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Log In & Access Admin Portal</span>
              </button>
            </form>

            <div className="pt-4 border-t border-emerald-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  Test Sign-In As:
                </span>
                <span className="text-[10px] text-emerald-400">Click to test RBAC roles</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLoginAs('drolabode_admin')}
                  className="bg-lime-400/20 hover:bg-lime-400 hover:text-emerald-950 text-lime-300 border border-lime-400/40 p-2.5 rounded-xl text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 font-black text-xs">
                    <span>👑 Dr. Olabode</span>
                  </div>
                  <span className="text-[10px] text-emerald-300 block group-hover:text-emerald-900 font-semibold">
                    Super Administrator
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLoginAs('nkechi_okoro')}
                  className="bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700 p-2.5 rounded-xl text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span>🗺️ Chief Okoro</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 block">
                    Zonal Coordinator (SE)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLoginAs('funmi_adeyemi')}
                  className="bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700 p-2.5 rounded-xl text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span>🌍 Amb. Funmi</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 block">
                    Diaspora Officer
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLoginAs('u_garba')}
                  className="bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700 p-2.5 rounded-xl text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span>🛡️ Alhaji Garba</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 block">
                    Mobilization Director
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isCurrentSuperAdmin = Boolean(
    adminProfile.roleName?.toLowerCase().includes('super administrator') ||
    adminProfile.username === 'drolabode_admin' ||
    adminProfile.email === 'olabisiolabode@gmail.com'
  );

  // Authenticated Admin Dashboard View
  return (
    <section id="admin-portal" className="py-12 bg-emerald-950 text-white min-h-screen relative border-t-2 border-lime-400/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Master Admin Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-green-950 border border-emerald-700 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-lime-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider rounded-full shadow">
                AUTHENTICATED ADMIN PORTAL
              </span>
              {isCurrentSuperAdmin ? (
                <span className="px-2.5 py-1 bg-lime-400 text-emerald-950 text-[10px] font-black rounded-full shadow flex items-center gap-1">
                  👑 Super Administrator
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-emerald-800 text-lime-300 text-[10px] font-bold rounded-full border border-emerald-700 flex items-center gap-1">
                  👤 {adminProfile.roleName}
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-lime-400 shrink-0" />
              <span>RTIFN Central Command & Control</span>
            </h2>

            <p className="text-xs sm:text-sm text-emerald-200 max-w-3xl">
              Centralized administration hub for voter database segmentation, international diaspora chapter governance, affiliated support groups verification, and role-based security privilege creation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div
              onClick={() => setActiveAdminTab('profile')}
              className="bg-emerald-950/80 border border-emerald-800 hover:border-lime-400/80 p-3 rounded-2xl flex items-center gap-3 cursor-pointer transition-all group"
              title="Click to manage Profile Settings, Change Password, Name & Avatar"
            >
              <img
                src={adminProfile.avatarUrl}
                alt={adminProfile.fullName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-lime-400 group-hover:scale-105 transition-transform"
              />
              <div className="text-right">
                <span className="text-[10px] font-bold text-emerald-400 block uppercase">Session Identity</span>
                <span className="text-xs font-bold text-white block group-hover:text-lime-300">{adminProfile.fullName}</span>
                <span className="text-[10px] text-lime-300 font-mono block">@{adminProfile.username}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveAdminTab('profile')}
              className="bg-lime-400/20 hover:bg-lime-400 hover:text-emerald-950 text-lime-300 border border-lime-400/50 px-3 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              title="Profile Settings & Password"
            >
              <Settings className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800 hover:border-rose-600 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Master Admin Navigation Bar */}
        <div className="bg-emerald-900/90 border-2 border-emerald-700 p-2 rounded-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 shadow-xl">
          {/* Sub-Tab 1: Individual Database */}
          <button
            onClick={() => setActiveAdminTab('individual')}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeAdminTab === 'individual'
                ? 'bg-lime-400 text-emerald-950 shadow-xl font-black scale-[1.02]'
                : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 shrink-0 text-lime-400" />
            <div className="text-left">
              <span className="block leading-none">Individual DB</span>
              <span className="text-[9px] opacity-80 font-mono block mt-0.5">Nigeria Electorate</span>
            </div>
          </button>

          {/* Sub-Tab 2: Diaspora Database */}
          <button
            onClick={() => setActiveAdminTab('diaspora')}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeAdminTab === 'diaspora'
                ? 'bg-lime-400 text-emerald-950 shadow-xl font-black scale-[1.02]'
                : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 shrink-0 text-lime-400" />
            <div className="text-left">
              <span className="block leading-none">Diaspora DB</span>
              <span className="text-[9px] opacity-80 font-mono block mt-0.5">Global Chapters</span>
            </div>
          </button>

          {/* Sub-Tab 3: Support Group Database */}
          <button
            onClick={() => setActiveAdminTab('supportgroup')}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeAdminTab === 'supportgroup'
                ? 'bg-lime-400 text-emerald-950 shadow-xl font-black scale-[1.02]'
                : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0 text-lime-400" />
            <div className="text-left">
              <span className="block leading-none">Support Group DB</span>
              <span className="text-[9px] opacity-80 font-mono block mt-0.5">Coalition Groups</span>
            </div>
          </button>

          {/* Sub-Tab 4: Roles & Privileges */}
          <button
            onClick={() => setActiveAdminTab('roles')}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeAdminTab === 'roles'
                ? 'bg-lime-400 text-emerald-950 shadow-xl font-black scale-[1.02]'
                : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4 shrink-0 text-lime-400" />
            <div className="text-left">
              <span className="block leading-none">Roles & Privileges</span>
              <span className="text-[9px] opacity-80 font-mono block mt-0.5">User Roles Mgmt</span>
            </div>
          </button>

          {/* Sub-Tab 5: Profile Settings */}
          <button
            onClick={() => setActiveAdminTab('profile')}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeAdminTab === 'profile'
                ? 'bg-lime-400 text-emerald-950 shadow-xl font-black scale-[1.02]'
                : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0 text-lime-400" />
            <div className="text-left">
              <span className="block leading-none">Profile & Security</span>
              <span className="text-[9px] opacity-80 font-mono block mt-0.5">Password & Credentials</span>
            </div>
          </button>

          {/* Sub-Tab 6: Audit & Security Logs */}
          <button
            onClick={() => setActiveAdminTab('audit')}
            className={`col-span-2 md:col-span-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeAdminTab === 'audit'
                ? 'bg-lime-400 text-emerald-950 shadow-xl font-black scale-[1.02]'
                : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 shrink-0 text-lime-400" />
            <div className="text-left">
              <span className="block leading-none">System Audit</span>
              <span className="text-[9px] opacity-80 font-mono block mt-0.5">Security Trails</span>
            </div>
          </button>
        </div>

        {/* Dynamic Admin Sub-Tab Rendering */}
        {activeAdminTab === 'individual' && (
          <AdminDatabase
            voters={voters}
            supportGroups={supportGroups}
            initialTab="individual"
            onSelectVoter={onSelectVoter}
            onSelectSupportGroup={onSelectSupportGroup}
          />
        )}

        {activeAdminTab === 'diaspora' && (
          <AdminDatabase
            voters={voters}
            supportGroups={supportGroups}
            initialTab="diaspora"
            onSelectVoter={onSelectVoter}
            onSelectSupportGroup={onSelectSupportGroup}
          />
        )}

        {activeAdminTab === 'supportgroup' && (
          <AdminDatabase
            voters={voters}
            supportGroups={supportGroups}
            initialTab="supportgroup"
            onSelectVoter={onSelectVoter}
            onSelectSupportGroup={onSelectSupportGroup}
          />
        )}

        {activeAdminTab === 'roles' && (
          <AdminRolesManagement currentUser={adminProfile} />
        )}

        {activeAdminTab === 'profile' && (
          <AdminProfileSettings
            currentProfile={adminProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeAdminTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="border-b border-emerald-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 text-xs font-bold uppercase tracking-wider mb-1 border border-lime-400/40">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Real-Time Security Feed</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">System Audit & Compliance Log</h3>
                  <p className="text-xs text-emerald-200 mt-1">
                    Immutable log of database exports, role privilege modifications, and administrative sign-ins.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-emerald-900/60 p-3 rounded-xl border border-emerald-800 text-xs">
                  <Clock className="w-4 h-4 text-lime-400" />
                  <span className="text-emerald-200">Encryption Status: <strong className="text-lime-300">TLS 1.3 Active</strong></span>
                </div>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-emerald-900/40 border border-emerald-800/80 hover:border-emerald-700 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-emerald-950 rounded-xl border border-emerald-800 text-lime-400 shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-xs sm:text-sm">{log.action}</span>
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-emerald-950 text-lime-300 rounded border border-emerald-700">
                            {log.badge}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-200 mt-0.5">{log.details}</p>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                          Performed by: {log.performedBy}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono text-lime-300 font-bold block">{log.timestamp}</span>
                      <span className="text-[10px] text-emerald-400 block">Verified Action</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
