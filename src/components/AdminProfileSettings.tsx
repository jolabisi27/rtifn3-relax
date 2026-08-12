import React, { useState } from 'react';
import {
  User,
  Key,
  Camera,
  CheckCircle2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Save,
  Sparkles,
  Upload,
  RefreshCw,
  UserCheck
} from 'lucide-react';

export interface AdminProfileData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
  roleName: string;
  assignedZone: string;
}

interface AdminProfileSettingsProps {
  currentProfile: AdminProfileData;
  onUpdateProfile: (updated: AdminProfileData) => void;
  onPasswordChanged?: () => void;
}

// Preset Official Avatars for Quick Selection
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
];

export const AdminProfileSettings: React.FC<AdminProfileSettingsProps> = ({
  currentProfile,
  onUpdateProfile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'avatar' | 'security'>('info');

  // Personal Info Form State
  const [fullName, setFullName] = useState(currentProfile.fullName);
  const [username, setUsername] = useState(currentProfile.username);
  const [email, setEmail] = useState(currentProfile.email);
  const [phone, setPhone] = useState(currentProfile.phone);
  const [infoSavedMsg, setInfoSavedMsg] = useState('');

  // Avatar Form State
  const [selectedAvatar, setSelectedAvatar] = useState(currentProfile.avatarUrl);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [avatarSavedMsg, setAvatarSavedMsg] = useState('');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccessMsg, setPwSuccessMsg] = useState('');

  // Password Strength Calculation
  const getPasswordStrength = (pw: string) => {
    if (!pw) return { score: 0, label: 'None', color: 'bg-emerald-900' };
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;

    if (score === 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Strong', color: 'bg-lime-400' };
    return { score: 4, label: 'Very Strong', color: 'bg-emerald-400' };
  };

  const pwStrength = getPasswordStrength(newPassword);

  // Save Name & Username
  const handleSaveInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert('Full Name cannot be empty.');
      return;
    }
    if (!username.trim()) {
      alert('Username cannot be empty.');
      return;
    }

    const updated: AdminProfileData = {
      ...currentProfile,
      fullName: fullName.trim(),
      username: username.trim().toLowerCase().replace(/\s+/g, '_'),
      email: email.trim(),
      phone: phone.trim()
    };

    onUpdateProfile(updated);
    setInfoSavedMsg('Success! Your admin profile name, username, and contact details have been updated.');
    setTimeout(() => setInfoSavedMsg(''), 4000);
  };

  // Save Profile Picture
  const handleSaveAvatar = (urlToSave: string) => {
    setSelectedAvatar(urlToSave);
    const updated: AdminProfileData = {
      ...currentProfile,
      avatarUrl: urlToSave
    };
    onUpdateProfile(updated);
    setAvatarSavedMsg('Success! Profile picture updated successfully.');
    setTimeout(() => setAvatarSavedMsg(''), 4000);
  };

  // Custom Avatar URL submit
  const handleCustomAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAvatarInput.trim()) return;
    handleSaveAvatar(customAvatarInput.trim());
    setCustomAvatarInput('');
  };

  // Handle Change Password Submit
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwSuccessMsg('');

    if (!currentPassword) {
      setPwError('Please enter your current admin password.');
      return;
    }
    if (newPassword.length < 6) {
      setPwError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('New password and password confirmation do not match.');
      return;
    }

    setPwSuccessMsg('Security credentials updated! Your admin password has been changed successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPwSuccessMsg(''), 5000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-green-950 border border-emerald-700/80 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img
              src={currentProfile.avatarUrl}
              alt={currentProfile.fullName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-lime-400 shadow-xl"
            />
            <button
              onClick={() => setActiveSubTab('avatar')}
              className="absolute -bottom-1 -right-1 p-1.5 bg-lime-400 text-emerald-950 rounded-lg shadow-md hover:scale-110 transition-transform cursor-pointer"
              title="Change Profile Picture"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lime-400/20 text-lime-300 text-[10px] font-extrabold uppercase tracking-wider mb-1 border border-lime-400/40">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Profile Settings</span>
            </div>
            <h3 className="text-2xl font-black text-white">{currentProfile.fullName}</h3>
            <p className="text-xs text-emerald-200 font-mono mt-0.5">
              Username: <strong className="text-lime-300">@{currentProfile.username}</strong> | Role: <span className="text-emerald-300 font-bold">{currentProfile.roleName}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveSubTab('info')}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'info'
                ? 'bg-lime-400 text-emerald-950 shadow-md font-black'
                : 'bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Edit Name & Info</span>
          </button>

          <button
            onClick={() => setActiveSubTab('avatar')}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'avatar'
                ? 'bg-lime-400 text-emerald-950 shadow-md font-black'
                : 'bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Profile Picture</span>
          </button>

          <button
            onClick={() => setActiveSubTab('security')}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'security'
                ? 'bg-lime-400 text-emerald-950 shadow-md font-black'
                : 'bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* --- SUB-TAB 1: EDIT NAME & USERNAME & CONTACT DETAILS --- */}
      {activeSubTab === 'info' && (
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-emerald-800 pb-4">
            <h4 className="text-lg font-extrabold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-lime-400" />
              <span>Change Admin Name & Username Credentials</span>
            </h4>
            <p className="text-xs text-emerald-200 mt-1">
              Update your administrative display name, login username, and official communication email & telephone line.
            </p>
          </div>

          {infoSavedMsg && (
            <div className="bg-emerald-900/90 border-2 border-lime-400/80 p-4 rounded-xl text-xs text-lime-300 font-bold flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
              <span>{infoSavedMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveInfoSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Full Display Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Olabisi Olabode"
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Admin Username (@handle) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-lime-400 font-mono text-xs font-bold">@</span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="drolabode_admin"
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl py-3 pl-8 pr-3 text-xs text-lime-300 placeholder-emerald-500 focus:outline-none focus:border-lime-400 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Official Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rtifn.org"
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Official Phone Line
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08039988776"
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-900/50 border border-emerald-800 rounded-xl space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-lime-400 block">Governance Role & Assigned Jurisdiction</span>
              <p className="text-white font-bold">
                {currentProfile.roleName} ({currentProfile.assignedZone})
              </p>
              <p className="text-[11px] text-emerald-300">
                To modify administrative role scopes or granted privileges, navigate to the <strong>Roles & Privileges</strong> tab.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-black text-xs py-3 px-6 rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Credentials</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- SUB-TAB 2: CHANGE PROFILE PICTURE --- */}
      {activeSubTab === 'avatar' && (
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-emerald-800 pb-4">
            <h4 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-lime-400" />
              <span>Change Admin Profile Picture</span>
            </h4>
            <p className="text-xs text-emerald-200 mt-1">
              Select an official executive portrait preset or supply a custom profile image URL.
            </p>
          </div>

          {avatarSavedMsg && (
            <div className="bg-emerald-900/90 border-2 border-lime-400/80 p-4 rounded-xl text-xs text-lime-300 font-bold flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
              <span>{avatarSavedMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Active Avatar Preview Card */}
            <div className="bg-emerald-900/60 border border-emerald-800 p-5 rounded-2xl text-center space-y-4">
              <span className="text-[10px] font-extrabold uppercase text-lime-400 tracking-wider block">Current Active Picture</span>
              <img
                src={selectedAvatar}
                alt="Active Avatar"
                referrerPolicy="no-referrer"
                className="w-32 h-32 rounded-3xl object-cover mx-auto border-4 border-lime-400 shadow-2xl"
              />
              <div>
                <h5 className="text-sm font-black text-white">{currentProfile.fullName}</h5>
                <span className="text-[11px] text-lime-300 font-mono">@{currentProfile.username}</span>
              </div>
            </div>

            {/* Presets Grid & Custom URL */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Presets */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-lime-300">
                  Select Official Executive Avatar Preset
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSaveAvatar(url)}
                      className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group hover:scale-105 ${
                        selectedAvatar === url
                          ? 'border-lime-400 ring-2 ring-lime-400/50'
                          : 'border-emerald-800 hover:border-emerald-600'
                      }`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-16 object-cover" />
                      {selectedAvatar === url && (
                        <div className="absolute inset-0 bg-lime-400/30 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-950 font-bold" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Image URL Form */}
              <form onSubmit={handleCustomAvatarSubmit} className="space-y-3 bg-emerald-900/40 border border-emerald-800 p-4 rounded-xl">
                <label className="block text-xs font-bold text-emerald-200">
                  Provide Custom Profile Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customAvatarInput}
                    onChange={(e) => setCustomAvatarInput(e.target.value)}
                    placeholder="https://example.com/my-official-photo.jpg"
                    className="flex-1 bg-emerald-950 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-lime-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs px-4 rounded-xl shadow cursor-pointer shrink-0"
                  >
                    Apply URL
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* --- SUB-TAB 3: CHANGE PASSWORD --- */}
      {activeSubTab === 'security' && (
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-emerald-800 pb-4">
            <h4 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-lime-400" />
              <span>Change Security Passcode / Password</span>
            </h4>
            <p className="text-xs text-emerald-200 mt-1">
              Ensure your administrative account remains protected with a strong, multi-factor passcode.
            </p>
          </div>

          {pwSuccessMsg && (
            <div className="bg-emerald-900/90 border-2 border-lime-400/80 p-4 rounded-xl text-xs text-lime-300 font-bold flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
              <span>{pwSuccessMsg}</span>
            </div>
          )}

          {pwError && (
            <div className="bg-rose-950/90 border border-rose-800 p-4 rounded-xl text-xs text-rose-200 font-bold flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{pwError}</span>
            </div>
          )}

          <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1">
                Current Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrentPw ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current passcode..."
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 pr-10 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3 top-3 text-emerald-400 hover:text-white cursor-pointer"
                >
                  {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1">
                New Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPw ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password..."
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 pr-10 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-3 text-emerald-400 hover:text-white cursor-pointer"
                >
                  {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {newPassword && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-emerald-300">Password Strength:</span>
                    <span className="text-lime-300">{pwStrength.label}</span>
                  </div>
                  <div className="w-full bg-emerald-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${pwStrength.color}`}
                      style={{ width: `${(pwStrength.score / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1">
                Confirm New Password <span className="text-rose-400">*</span>
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password..."
                className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400 font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-black text-xs py-3 px-6 rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Update Password Credentials</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
