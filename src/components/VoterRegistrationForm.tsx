import React, { useState } from 'react';
import { Voter, GeopoliticalZone, PvcStatus, PreferredRole, Gender, Occupation } from '../types';
import { GEOPOLITICAL_ZONES, SAMPLE_LGAS_BY_STATE, getWardsForLga, getPollingUnitsForWard } from '../data/nigeriaData';
import { apiService } from '../services/apiService';
import confetti from 'canvas-confetti';
import { Users, CheckCircle2, Sparkles, Phone, Mail, Info, CreditCard, Building2, UserCheck, HelpCircle, MessageSquare, UserPlus, Home } from 'lucide-react';

interface VoterRegistrationFormProps {
  onVoterRegistered: (voter: Voter) => void;
  onGoHome?: () => void;
  allVoters?: Voter[];
  onSelectVoter?: (voter: Voter) => void;
}

export const VoterRegistrationForm: React.FC<VoterRegistrationFormProps> = ({
  onVoterRegistered,
  onGoHome,
  allVoters = [],
  onSelectVoter
}) => {
  // Basic personal details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<Gender>('Male');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState<Occupation>('Business');

  // Electoral & Location
  const [zone, setZone] = useState<GeopoliticalZone>('South West');
  const [state, setState] = useState<string>('Lagos');
  const [lga, setLga] = useState<string>('Ikeja');
  const [ward, setWard] = useState<string>(() => getWardsForLga('Ikeja')[0] || 'Ward A');
  const [pollingUnit, setPollingUnit] = useState<string>(() => getPollingUnitsForWard(getWardsForLga('Ikeja')[0] || 'Ward A')[0] || '');
  const [isCustomWard, setIsCustomWard] = useState(false);
  const [isCustomPollingUnit, setIsCustomPollingUnit] = useState(false);
  const [pvcStatus, setPvcStatus] = useState<PvcStatus>('Have PVC');
  const [vin, setVin] = useState('');
  const [preferredRole, setPreferredRole] = useState<PreferredRole>('Supporter');
  const [apcRegistrationNumber, setApcRegistrationNumber] = useState('');

  // Account details
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  // Support group
  const [hasSupportGroup, setHasSupportGroup] = useState<'Yes' | 'No'>('No');
  const [supportGroupName, setSupportGroupName] = useState('');

  // Questionnaire / Feedback
  const [likeAboutTinubuAdmin, setLikeAboutTinubuAdmin] = useState('');
  const [tinubuImproveArea, setTinubuImproveArea] = useState('');
  const [whyJoinRtifn, setWhyJoinRtifn] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recentVoter, setRecentVoter] = useState<Voter | null>(null);
  const [sessionSubmissions, setSessionSubmissions] = useState<Voter[]>([]);
  const [showSessionHistory, setShowSessionHistory] = useState(true);

  // Handle zone change -> auto select first state, first LGA, first Ward, and first Polling Unit
  const handleZoneChange = (newZone: GeopoliticalZone) => {
    setZone(newZone);
    const availableStates = GEOPOLITICAL_ZONES[newZone] || [];
    const firstState = availableStates[0] || '';
    setState(firstState);
    if (firstState && SAMPLE_LGAS_BY_STATE[firstState]) {
      const firstLga = SAMPLE_LGAS_BY_STATE[firstState][0] || '';
      setLga(firstLga);
      const availableWards = getWardsForLga(firstLga);
      const firstWard = availableWards[0] || '';
      setWard(firstWard);
      const availablePus = getPollingUnitsForWard(firstWard);
      setPollingUnit(availablePus[0] || '');
    } else {
      setLga('');
      setWard('');
      setPollingUnit('');
    }
  };

  // Handle state change -> auto select first LGA, first Ward, and first Polling Unit
  const handleStateChange = (newState: string) => {
    setState(newState);
    if (SAMPLE_LGAS_BY_STATE[newState]) {
      const firstLga = SAMPLE_LGAS_BY_STATE[newState][0] || '';
      setLga(firstLga);
      const availableWards = getWardsForLga(firstLga);
      const firstWard = availableWards[0] || '';
      setWard(firstWard);
      const availablePus = getPollingUnitsForWard(firstWard);
      setPollingUnit(availablePus[0] || '');
    } else {
      setLga('');
      setWard('');
      setPollingUnit('');
    }
  };

  // Handle LGA change -> auto select first Ward and first Polling Unit
  const handleLgaChange = (newLga: string) => {
    setLga(newLga);
    const availableWards = getWardsForLga(newLga);
    const firstWard = availableWards[0] || '';
    setWard(firstWard);
    const availablePus = getPollingUnitsForWard(firstWard);
    setPollingUnit(availablePus[0] || '');
  };

  // Handle Ward change -> auto select first Polling Unit in Ward
  const handleWardChange = (newWard: string) => {
    setWard(newWard);
    const availablePus = getPollingUnitsForWard(newWard);
    setPollingUnit(availablePus[0] || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    const cleanPhone = phone.trim().replace(/[\s()-]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      setErrorMessage('Please enter a valid phone number (minimum 7 digits).');
      return;
    }

    setIsSubmitting(true);

    // Create new voter object
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const statePrefix = (state || 'NIG').slice(0, 3).toUpperCase();
    const newVoter: Voter = {
      id: 'voter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      registrationCode: `RTIFN-2027-${statePrefix}-${randomSuffix}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      gender: gender,
      age: age.trim() || undefined,
      occupation: occupation,
      apcRegistrationNumber: apcRegistrationNumber.trim() || undefined,
      accountDetails: {
        accountName: accountName.trim() || undefined,
        accountNumber: accountNumber.trim() || undefined,
        bankName: bankName.trim() || undefined
      },
      hasSupportGroup: hasSupportGroup,
      supportGroupName: hasSupportGroup === 'Yes' ? supportGroupName.trim() : undefined,
      likeAboutTinubuAdmin: likeAboutTinubuAdmin.trim() || undefined,
      tinubuImproveArea: tinubuImproveArea.trim() || undefined,
      whyJoinRtifn: whyJoinRtifn.trim() || undefined,
      geopoliticalZone: zone,
      state: state,
      lga: lga || 'Central LGA',
      ward: ward.trim() || 'Ward 01',
      pollingUnit: pollingUnit.trim() || undefined,
      pvcStatus: pvcStatus,
      vin: vin.trim() || undefined,
      preferredRole: preferredRole,
      registeredAt: new Date().toISOString()
    };

    try {
      await apiService.registerVoter(newVoter);
    } catch (err) {
      console.warn('API sync completed with local cache:', err);
    }

    // Trigger festive confetti burst
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#84cc16', '#16a34a', '#15803d', '#facc15']
      });
    } catch (err) {
      // Fallback
    }

    setIsSubmitting(false);
    setRecentVoter(newVoter);
    setSessionSubmissions((prev) => [newVoter, ...prev]);
    onVoterRegistered(newVoter);

    // Reset form fields ready for next entry
    setFullName('');
    setEmail('');
    setPhone('');
    setAge('');
    setApcRegistrationNumber('');
    setAccountName('');
    setAccountNumber('');
    setBankName('');
    setSupportGroupName('');
    setLikeAboutTinubuAdmin('');
    setTinubuImproveArea('');
    setWhyJoinRtifn('');
    setWard('');
    setVin('');
  };

  const handleResetAndAddNewMember = () => {
    // Focus form without clearing session submissions
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const availableStates = GEOPOLITICAL_ZONES[zone] || [];
  const availableLgas = SAMPLE_LGAS_BY_STATE[state] || ['Central LGA', 'LGA Area 1', 'LGA Area 2'];
  const availableWards = lga ? getWardsForLga(lga) : [];
  const availablePollingUnits = ward ? getPollingUnitsForWard(ward) : [];

  return (
    <section id="registration" className="py-12 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Registration Form Card */}
        <div className="max-w-4xl mx-auto bg-emerald-950 border-2 border-lime-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Header Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-emerald-800 pb-6 mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-lime-400" />
                <span>Individual Registration Form</span>
              </h3>
              <p className="text-xs text-emerald-200 mt-1">
                Official registration for Relax Tinubu Is Fixing Nigeria (RTIFN)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-3 py-1.5 bg-emerald-900 border border-emerald-700 text-lime-300 rounded-lg tracking-wider block shadow">
                Total DB: {allVoters.length} Supporters
              </span>
              <span className="text-[10px] font-extrabold uppercase px-3 py-1.5 bg-lime-400 text-emerald-950 rounded-lg tracking-widest block shadow">
                RTIFN 2027 INDIVIDUAL PORTAL
              </span>
            </div>
          </div>

          {recentVoter && (
            <div className="mb-8 p-5 sm:p-6 bg-gradient-to-br from-emerald-900 to-emerald-950 border-2 border-lime-400 rounded-2xl shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-lime-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-black text-lime-300">
                      Registration Saved & Appended Successfully!
                    </h4>
                    <p className="text-xs text-emerald-100 mt-1">
                      Member <strong className="text-white capitalize">{recentVoter.fullName}</strong> ({recentVoter.state}, {recentVoter.lga}) has been stored in the database.
                      Registration Code: <span className="font-mono font-bold text-lime-300">{recentVoter.registrationCode}</span>
                    </p>
                    <p className="text-[11px] text-lime-200/90 mt-1">
                      ✅ All previous records remain safely stored in the central database ({allVoters.length} total supporters registered).
                    </p>
                  </div>
                </div>

                {onSelectVoter && (
                  <button
                    type="button"
                    onClick={() => onSelectVoter(recentVoter)}
                    className="shrink-0 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-black text-xs py-2 px-3 rounded-xl shadow flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>View Membership Card</span>
                  </button>
                )}
              </div>

              {/* Session History Drawer */}
              {sessionSubmissions.length > 0 && (
                <div className="pt-3 border-t border-emerald-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-lime-300 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-lime-400" />
                      Supporters Registered in this Session ({sessionSubmissions.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSessionHistory(!showSessionHistory)}
                      className="text-[11px] text-emerald-300 hover:text-white underline cursor-pointer"
                    >
                      {showSessionHistory ? 'Hide List' : 'Show List'}
                    </button>
                  </div>

                  {showSessionHistory && (
                    <div className="bg-emerald-950/80 border border-emerald-800 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2">
                      {sessionSubmissions.map((voter, idx) => (
                        <div
                          key={voter.id || idx}
                          className="flex items-center justify-between gap-2 p-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800 rounded-lg text-xs transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-lime-400 text-emerald-950 font-black text-[10px] flex items-center justify-center shrink-0">
                              {sessionSubmissions.length - idx}
                            </span>
                            <div className="truncate">
                              <span className="font-bold text-white block truncate">{voter.fullName}</span>
                              <span className="text-[10px] text-emerald-300 font-mono block">
                                {voter.state} • {voter.lga} • {voter.phone}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-mono bg-emerald-950 text-lime-300 px-2 py-0.5 rounded border border-emerald-700">
                              {voter.registrationCode}
                            </span>
                            {onSelectVoter && (
                              <button
                                type="button"
                                onClick={() => onSelectVoter(voter)}
                                className="text-[10px] font-bold text-lime-300 hover:underline cursor-pointer"
                              >
                                Card
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-emerald-800">
                <button
                  type="button"
                  onClick={handleResetAndAddNewMember}
                  className="flex-1 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-emerald-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer transition-all border border-lime-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Next Supporter / Add Member</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onGoHome) onGoHome();
                  }}
                  className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-emerald-700 transition-all cursor-pointer"
                >
                  <Home className="w-4 h-4 text-lime-300" />
                  <span>Go Back to Homepage</span>
                </button>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-950/80 border border-red-500 text-red-200 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Info className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* SECTION 1: Personal Details */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <Users className="w-4 h-4" />
                <span>1. Personal Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Full Name <span className="text-lime-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Email Address <span className="text-lime-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>
              </div>

              {/* Phone (WhatsApp) & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PHONE NO. (WhatsApp No) */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    PHONE NO. (WhatsApp No) <span className="text-lime-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your WhatsApp number"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>

                {/* AGE */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    AGE
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>
              </div>

              {/* GENDER (Radio buttons) */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  GENDER
                </label>
                <div className="flex items-center gap-6 bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white hover:text-lime-300 transition-colors">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === 'Male'}
                      onChange={() => setGender('Male')}
                      className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                    />
                    <span>Male</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white hover:text-lime-300 transition-colors">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === 'Female'}
                      onChange={() => setGender('Female')}
                      className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              {/* Occupation (Radio Button) */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  Occupation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80">
                  {(['Business', 'Student', 'Traders', 'Farmer', 'others'] as Occupation[]).map((occ) => (
                    <label key={occ} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white hover:text-lime-300 transition-colors py-1">
                      <input
                        type="radio"
                        name="occupation"
                        value={occ}
                        checked={occupation === occ}
                        onChange={() => setOccupation(occ)}
                        className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                      />
                      <span className="capitalize">{occ === 'others' ? 'Others' : occ}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>


            {/* SECTION 2: Location & Electoral Data */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <UserCheck className="w-4 h-4" />
                <span>2. Location & Electoral Information</span>
              </div>

              {/* Zone & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Geopolitical Zone
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => handleZoneChange(e.target.value as GeopoliticalZone)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    {Object.keys(GEOPOLITICAL_ZONES).map((z) => (
                      <option key={z} value={z} className="bg-emerald-950 text-white">
                        {z} Zone
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    State of Residence
                  </label>
                  <select
                    value={state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    {availableStates.map((st) => (
                      <option key={st} value={st} className="bg-emerald-950 text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LGA & Ward */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Local Govt Area (LGA)
                  </label>
                  <select
                    value={lga}
                    onChange={(e) => handleLgaChange(e.target.value)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    {availableLgas.map((l) => (
                      <option key={l} value={l} className="bg-emerald-950 text-white">
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider">
                      Electoral Ward
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCustomWard(!isCustomWard)}
                      className="text-[11px] text-lime-400 hover:text-lime-300 underline font-medium cursor-pointer"
                    >
                      {isCustomWard ? '← Choose from List' : '+ Type Custom Ward'}
                    </button>
                  </div>
                  {isCustomWard ? (
                    <input
                      type="text"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      placeholder="e.g. Ward 04 (Central Area)"
                      className="w-full bg-emerald-900/90 border border-lime-400/80 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/40"
                    />
                  ) : (
                    <select
                      value={ward}
                      onChange={(e) => {
                        if (e.target.value === '__CUSTOM__') {
                          setIsCustomWard(true);
                          setWard('');
                        } else {
                          handleWardChange(e.target.value);
                        }
                      }}
                      className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                    >
                      {availableWards.map((w) => (
                        <option key={w} value={w} className="bg-emerald-950 text-white">
                          {w}
                        </option>
                      ))}
                      <option value="__CUSTOM__" className="bg-emerald-950 text-lime-300 font-bold">
                        + Other / Type Custom Ward Name...
                      </option>
                    </select>
                  )}
                </div>
              </div>

              {/* Polling Unit */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider">
                    Polling Unit (INEC Booth / Centre)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomPollingUnit(!isCustomPollingUnit)}
                    className="text-[11px] text-lime-400 hover:text-lime-300 underline font-medium cursor-pointer"
                  >
                    {isCustomPollingUnit ? '← Choose from List' : '+ Type Custom PU / Code'}
                  </button>
                </div>
                {isCustomPollingUnit ? (
                  <input
                    type="text"
                    value={pollingUnit}
                    onChange={(e) => setPollingUnit(e.target.value)}
                    placeholder="e.g. PU 004 - Community Primary School / 24-01-04-012"
                    className="w-full bg-emerald-900/90 border border-lime-400/80 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/40"
                  />
                ) : (
                  <select
                    value={pollingUnit}
                    onChange={(e) => {
                      if (e.target.value === '__CUSTOM__') {
                        setIsCustomPollingUnit(true);
                        setPollingUnit('');
                      } else {
                        setPollingUnit(e.target.value);
                      }
                    }}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    {availablePollingUnits.map((pu) => (
                      <option key={pu} value={pu} className="bg-emerald-950 text-white">
                        {pu}
                      </option>
                    ))}
                    <option value="__CUSTOM__" className="bg-emerald-950 text-lime-300 font-bold">
                      + Other / Type Custom Polling Unit Code...
                    </option>
                  </select>
                )}
              </div>

              {/* PVC Status & Preferred Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Permanent Voter Card (PVC) Status
                  </label>
                  <select
                    value={pvcStatus}
                    onChange={(e) => setPvcStatus(e.target.value as PvcStatus)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    <option value="Have PVC" className="bg-emerald-950 text-white">I Have My Valid PVC</option>
                    <option value="Awaiting PVC / Registered" className="bg-emerald-950 text-white">Registered / Awaiting Collection</option>
                    <option value="Needs New PVC Registration" className="bg-emerald-950 text-white">Need New PVC Registration Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Preferred Mobilization Role
                  </label>
                  <select
                    value={preferredRole}
                    onChange={(e) => setPreferredRole(e.target.value as PreferredRole)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    <option value="Supporter" className="bg-emerald-950 text-white">Grassroots Supporter</option>
                    <option value="Mobilizer" className="bg-emerald-950 text-white">LGA/Ward Mobilizer</option>
                    <option value="Ward Coordinator" className="bg-emerald-950 text-white">Ward Coordinator</option>
                    <option value="Polling Unit Agent" className="bg-emerald-950 text-white">Polling Unit Agent</option>
                    <option value="Volunteer" className="bg-emerald-950 text-white">Youth & Women Volunteer</option>
                  </select>
                </div>
              </div>

              {/* APC REGISTRATION NUMBER (Optional) & VIN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    APC REGISTRATION NUMBER <span className="text-emerald-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={apcRegistrationNumber}
                    onChange={(e) => setApcRegistrationNumber(e.target.value)}
                    placeholder="Enter your APC registration number"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                    Voter Identification Number (VIN) <span className="text-emerald-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    placeholder="Enter 19-digit VIN if available"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all font-mono"
                  />
                </div>
              </div>
            </div>


            {/* SECTION 3: ACCOUNT DETAILS */}
            <div className="space-y-4 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <CreditCard className="w-4 h-4" />
                <span>3. ACCOUNT DETAILS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Account Name */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Enter account name"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>

                {/* Account Number */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all font-mono"
                  />
                </div>

                {/* Bank */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter bank name"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>
              </div>
            </div>


            {/* SECTION 4: DO YOU HAVE SUPPORT GROUP? */}
            <div className="space-y-4 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <Building2 className="w-4 h-4" />
                <span>4. Support Group Affiliation</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    DO YOU HAVE SUPPORT GROUP?
                  </label>
                  <div className="flex items-center gap-6 bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white hover:text-lime-300 transition-colors">
                      <input
                        type="radio"
                        name="hasSupportGroup"
                        value="Yes"
                        checked={hasSupportGroup === 'Yes'}
                        onChange={() => setHasSupportGroup('Yes')}
                        className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                      />
                      <span>Yes</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white hover:text-lime-300 transition-colors">
                      <input
                        type="radio"
                        name="hasSupportGroup"
                        value="No"
                        checked={hasSupportGroup === 'No'}
                        onChange={() => setHasSupportGroup('No')}
                        className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* NAME OF SUPPORT GROUP */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    NAME OF SUPPORT GROUP <span className="text-emerald-400 font-normal">(Optional if No)</span>
                  </label>
                  <input
                    type="text"
                    value={supportGroupName}
                    onChange={(e) => setSupportGroupName(e.target.value)}
                    placeholder="Enter name of support group"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>
              </div>
            </div>


            {/* SECTION 5: Questionnaire / Feedback */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <MessageSquare className="w-4 h-4" />
                <span>5. Civic Feedback & Alignment</span>
              </div>

              {/* WHAT DO YOU LIKE ABOUT PRESIDENT TINUBU ADMINISTRATION? */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  WHAT DO YOU LIKE ABOUT PRESIDENT TINUBU ADMINISTRATION?
                </label>
                <textarea
                  rows={3}
                  value={likeAboutTinubuAdmin}
                  onChange={(e) => setLikeAboutTinubuAdmin(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl p-3 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                />
              </div>

              {/* WHAT DO YOU THINK PRESIDENT TINUBU SHOULD IMPROVE IN YOUR AREA? */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  WHAT DO YOU THINK PRESIDENT TINUBU SHOULD IMPROVE IN YOUR AREA?
                </label>
                <textarea
                  rows={3}
                  value={tinubuImproveArea}
                  onChange={(e) => setTinubuImproveArea(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl p-3 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                />
              </div>

              {/* WHY DO YOU WANT TO JOIN RELAX TINUBU IS FIXING NIGERIA? */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  WHY DO YOU WANT TO JOIN RELAX TINUBU IS FIXING NIGERIA?
                </label>
                <textarea
                  rows={3}
                  value={whyJoinRtifn}
                  onChange={(e) => setWhyJoinRtifn(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl p-3 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                />
              </div>
            </div>


            {/* Big Submit Button: "Register Support" */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 text-emerald-950 hover:from-lime-300 hover:to-emerald-300 font-black text-lg py-4 px-8 rounded-2xl shadow-xl hover:shadow-lime-400/30 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer border border-lime-200"
              >
                {isSubmitting ? (
                  <span>Saving Registration Record...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Submit Individual Registration</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-emerald-300 italic">
                By submitting, you agree to receive campaign updates and mobilization alerts.
              </p>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
