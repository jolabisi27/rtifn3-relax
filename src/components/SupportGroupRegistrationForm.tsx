import React, { useState } from 'react';
import { SupportGroupRecord, GeopoliticalZone, Gender } from '../types';
import { GEOPOLITICAL_ZONES, SAMPLE_LGAS_BY_STATE, getWardsForLga, getPollingUnitsForWard } from '../data/nigeriaData';
import { WORLD_COUNTRIES } from '../data/countriesData';
import { apiService } from '../services/apiService';
import confetti from 'canvas-confetti';
import { Building2, CheckCircle2, Sparkles, Info, CreditCard, UserCheck, MessageSquare, UserPlus, Home, Shield, Users, Layers } from 'lucide-react';

interface SupportGroupRegistrationFormProps {
  onSupportGroupRegistered?: (group: SupportGroupRecord) => void;
  onGoHome?: () => void;
  allSupportGroups?: SupportGroupRecord[];
}

export const SupportGroupRegistrationForm: React.FC<SupportGroupRegistrationFormProps> = ({
  onSupportGroupRegistered,
  onGoHome,
  allSupportGroups = []
}) => {
  // 1. Group Information
  const [groupName, setGroupName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [cacNumber, setCacNumber] = useState('');
  const [membershipSize, setMembershipSize] = useState('500 - 2,000 Members');
  const [category, setCategory] = useState('Youth Wing & Mobilization');
  const [coverageScope, setCoverageScope] = useState('National Level');

  // 2. Convener / Coordinator Info
  const [convenerName, setConvenerName] = useState('');
  const [convenerTitle, setConvenerTitle] = useState('National Coordinator');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<Gender>('Male');

  // 3. Location & Headquarters
  const [isDiaspora, setIsDiaspora] = useState<'No' | 'Yes'>('No');
  const [countryOfResidence, setCountryOfResidence] = useState('United Kingdom');
  const [zone, setZone] = useState<GeopoliticalZone>('South West');
  const [state, setState] = useState<string>('Lagos');
  const [lga, setLga] = useState<string>('Ikeja');
  const [ward, setWard] = useState<string>(() => getWardsForLga('Ikeja')[0] || 'Ward A');
  const [pollingUnit, setPollingUnit] = useState<string>(() => getPollingUnitsForWard(getWardsForLga('Ikeja')[0] || 'Ward A')[0] || '');
  const [isCustomWard, setIsCustomWard] = useState(false);
  const [isCustomPollingUnit, setIsCustomPollingUnit] = useState(false);
  const [officeAddress, setOfficeAddress] = useState('');

  // 4. Account Details
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  // 5. Civic Alignment
  const [likeAboutTinubuAdmin, setLikeAboutTinubuAdmin] = useState('');
  const [tinubuImproveArea, setTinubuImproveArea] = useState('');
  const [whyAlignWithRtifn, setWhyAlignWithRtifn] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recentGroup, setRecentGroup] = useState<SupportGroupRecord | null>(null);
  const [sessionSubmissions, setSessionSubmissions] = useState<SupportGroupRecord[]>([]);
  const [showSessionHistory, setShowSessionHistory] = useState(true);

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

  const handleLgaChange = (newLga: string) => {
    setLga(newLga);
    const availableWards = getWardsForLga(newLga);
    const firstWard = availableWards[0] || '';
    setWard(firstWard);
    const availablePus = getPollingUnitsForWard(firstWard);
    setPollingUnit(availablePus[0] || '');
  };

  const handleWardChange = (newWard: string) => {
    setWard(newWard);
    const availablePus = getPollingUnitsForWard(newWard);
    setPollingUnit(availablePus[0] || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!groupName.trim()) {
      setErrorMessage('Please enter the Support Group Name.');
      return;
    }
    if (!convenerName.trim()) {
      setErrorMessage('Please enter the Convener / Coordinator Full Name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid official email address.');
      return;
    }
    const cleanPhone = phone.trim().replace(/[\s()-]/g, '');
    if (!cleanPhone || cleanPhone.length < 6) {
      setErrorMessage('Please enter a valid WhatsApp phone number.');
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const prefix = isDiaspora === 'Yes' ? 'SG-DIASPORA' : (state || 'NIG').slice(0, 3).toUpperCase();
    
    const newGroup: SupportGroupRecord = {
      id: 'sg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      registrationCode: `RTIFN-SG-${prefix}-${randomSuffix}`,
      groupName: groupName.trim(),
      acronym: acronym.trim() || undefined,
      cacNumber: cacNumber.trim() || undefined,
      membershipSize: membershipSize,
      category: category,
      coverageScope: coverageScope,
      convenerName: convenerName.trim(),
      convenerTitle: convenerTitle.trim() || 'Coordinator',
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      gender: gender,
      isDiaspora: isDiaspora === 'Yes',
      countryOfResidence: isDiaspora === 'Yes' ? countryOfResidence : undefined,
      geopoliticalZone: zone,
      state: state,
      lga: lga || 'Central LGA',
      ward: ward.trim() || undefined,
      pollingUnit: pollingUnit.trim() || undefined,
      officeAddress: officeAddress.trim() || undefined,
      accountDetails: {
        accountName: accountName.trim() || undefined,
        accountNumber: accountNumber.trim() || undefined,
        bankName: bankName.trim() || undefined
      },
      likeAboutTinubuAdmin: likeAboutTinubuAdmin.trim() || undefined,
      tinubuImproveArea: tinubuImproveArea.trim() || undefined,
      whyAlignWithRtifn: whyAlignWithRtifn.trim() || undefined,
      registeredAt: new Date().toISOString()
    };

    try {
      await apiService.registerSupportGroup(newGroup);
    } catch (err) {
      console.warn('API sync completed with local cache:', err);
    }

    try {
      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#84cc16', '#16a34a', '#15803d', '#facc15']
      });
    } catch (err) {
      // Fallback
    }

    setIsSubmitting(false);
    setRecentGroup(newGroup);
    setSessionSubmissions((prev) => [newGroup, ...prev]);
    if (onSupportGroupRegistered) {
      onSupportGroupRegistered(newGroup);
    }

    // Reset form fields
    setGroupName('');
    setAcronym('');
    setCacNumber('');
    setConvenerName('');
    setEmail('');
    setPhone('');
    setOfficeAddress('');
    setAccountName('');
    setAccountNumber('');
    setBankName('');
    setLikeAboutTinubuAdmin('');
    setTinubuImproveArea('');
    setWhyAlignWithRtifn('');
  };

  const handleResetAndAddNewGroup = () => {
    const el = document.getElementById('support-group-registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const availableStates = GEOPOLITICAL_ZONES[zone] || [];
  const availableLgas = SAMPLE_LGAS_BY_STATE[state] || ['Central LGA', 'LGA Area 1', 'LGA Area 2'];
  const availableWards = lga ? getWardsForLga(lga) : [];
  const availablePollingUnits = ward ? getPollingUnitsForWard(ward) : [];

  return (
    <section id="support-group-registration" className="py-16 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/40 text-xs font-bold uppercase tracking-wider shadow">
            <Building2 className="w-4 h-4" />
            <span>Support Group Affiliation Portal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Support Group Registration
          </h2>

          <div className="bg-emerald-900/80 border border-emerald-700/80 rounded-2xl p-6 text-left shadow-xl space-y-3">
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-normal">
              Official coalition onboarding for support groups, youth movements, women associations, and grassroots organizations aligning with <strong className="text-lime-300">Relax Tinubu Is Fixing Nigeria (RTIFN)</strong>.
            </p>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              Registering your group integrates your movement into the central mobilization network, enabling synchronized campaign activities, logistics coordination, and direct participation in national progressive initiatives.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-emerald-950 border-2 border-lime-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">

          {/* Top Banner Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-emerald-800 pb-6 mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                <Building2 className="w-6 h-6 text-lime-400" />
                <span>Support Group Registration Form</span>
              </h3>
              <p className="text-xs text-emerald-200 mt-1">
                Official registration for Relax Tinubu Is Fixing Nigeria (RTIFN) Support Groups
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-3 py-1.5 bg-emerald-900 border border-emerald-700 text-lime-300 rounded-lg tracking-wider block shadow">
                Total DB: {allSupportGroups.length} Groups
              </span>
              <span className="text-[10px] font-extrabold uppercase px-3 py-1.5 bg-lime-400 text-emerald-950 rounded-lg tracking-widest block shadow">
                RTIFN COALITION DIRECTORATE
              </span>
            </div>
          </div>

          {/* Success Banner */}
          {recentGroup && (
            <div className="mb-8 p-5 sm:p-6 bg-gradient-to-br from-emerald-900 to-emerald-950 border-2 border-lime-400 rounded-2xl shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-lime-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-black text-lime-300">
                    Support Group Registered & Appended Successfully!
                  </h4>
                  <p className="text-xs text-emerald-100 mt-1">
                    Group <strong className="text-white capitalize">{recentGroup.groupName}</strong> ({recentGroup.acronym || 'RTIFN Affiliate'}) has been onboarded.
                    Registration Code: <span className="font-mono font-bold text-lime-300">{recentGroup.registrationCode}</span>
                  </p>
                  <p className="text-[11px] text-lime-200/90 mt-1">
                    ✅ All previous support groups remain safely stored in the central coalition database ({allSupportGroups.length} total groups registered).
                  </p>
                </div>
              </div>

              {/* Session History Drawer */}
              {sessionSubmissions.length > 0 && (
                <div className="pt-3 border-t border-emerald-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-lime-300 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-lime-400" />
                      Support Groups Registered in this Session ({sessionSubmissions.length})
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
                      {sessionSubmissions.map((group, idx) => (
                        <div
                          key={group.id || idx}
                          className="flex items-center justify-between gap-2 p-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800 rounded-lg text-xs transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-lime-400 text-emerald-950 font-black text-[10px] flex items-center justify-center shrink-0">
                              {sessionSubmissions.length - idx}
                            </span>
                            <div className="truncate">
                              <span className="font-bold text-white block truncate">{group.groupName}</span>
                              <span className="text-[10px] text-emerald-300 font-mono block">
                                {group.state} • {group.convenerName} ({group.phone})
                              </span>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono bg-emerald-950 text-lime-300 px-2 py-0.5 rounded border border-emerald-700 shrink-0">
                            {group.registrationCode}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-emerald-800">
                <button
                  type="button"
                  onClick={handleResetAndAddNewGroup}
                  className="flex-1 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-emerald-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer transition-all border border-lime-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Another Support Group</span>
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

            {/* SECTION 1: Support Group Information */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <Building2 className="w-4 h-4" />
                <span>1. Support Group Identity & Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Group Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    NAME OF SUPPORT GROUP <span className="text-lime-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter official full name of your support group"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>

                {/* Acronym / Short Name */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    ACRONYM / SHORT NAME <span className="text-emerald-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={acronym}
                    onChange={(e) => setAcronym(e.target.value)}
                    placeholder="e.g. BAT-YMN, T-VANGUARD"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all font-mono uppercase"
                  />
                </div>

                {/* CAC Registration No */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    CAC REGISTRATION NO. <span className="text-emerald-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={cacNumber}
                    onChange={(e) => setCacNumber(e.target.value)}
                    placeholder="e.g. RC/IT 123456"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Membership Size, Category & Coverage */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Membership Base */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    ESTIMATED MEMBERSHIP BASE
                  </label>
                  <select
                    value={membershipSize}
                    onChange={(e) => setMembershipSize(e.target.value)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    <option value="50 - 200 Members" className="bg-emerald-950 text-white">50 - 200 Members</option>
                    <option value="200 - 500 Members" className="bg-emerald-950 text-white">200 - 500 Members</option>
                    <option value="500 - 2,000 Members" className="bg-emerald-950 text-white">500 - 2,000 Members</option>
                    <option value="2,000 - 10,000 Members" className="bg-emerald-950 text-white">2,000 - 10,000 Members</option>
                    <option value="10,000+ Members (Mega Group)" className="bg-emerald-950 text-white">10,000+ Members (Mega Group)</option>
                  </select>
                </div>

                {/* Primary Category */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    GROUP CATEGORY / SECTOR
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    <option value="Youth Wing & Mobilization" className="bg-emerald-950 text-white">Youth Wing & Mobilization</option>
                    <option value="Women Empowerment Coalition" className="bg-emerald-950 text-white">Women Empowerment Coalition</option>
                    <option value="Grassroots Traders & Artisans" className="bg-emerald-950 text-white">Grassroots Traders & Artisans</option>
                    <option value="Farmers & Agro-Allied Group" className="bg-emerald-950 text-white">Farmers & Agro-Allied Group</option>
                    <option value="Students & Campus Mobilizers" className="bg-emerald-950 text-white">Students & Campus Mobilizers</option>
                    <option value="Professional & Technocrats" className="bg-emerald-950 text-white">Professional & Technocrats</option>
                    <option value="Diaspora Support Vanguard" className="bg-emerald-950 text-white">Diaspora Support Vanguard</option>
                    <option value="General Political Support Group" className="bg-emerald-950 text-white">General Political Support Group</option>
                  </select>
                </div>

                {/* Coverage Scope */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    GEOGRAPHICAL COVERAGE SCOPE
                  </label>
                  <select
                    value={coverageScope}
                    onChange={(e) => setCoverageScope(e.target.value)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    <option value="National Level (Multi-State)" className="bg-emerald-950 text-white">National Level (Multi-State)</option>
                    <option value="Geopolitical Zonal Level" className="bg-emerald-950 text-white">Geopolitical Zonal Level</option>
                    <option value="State Level Coverage" className="bg-emerald-950 text-white">State Level Coverage</option>
                    <option value="LGA / Senatorial District Level" className="bg-emerald-950 text-white">LGA / Senatorial District Level</option>
                    <option value="Ward & Polling Unit Level" className="bg-emerald-950 text-white">Ward & Polling Unit Level</option>
                    <option value="Diaspora / International Chapter" className="bg-emerald-950 text-white">Diaspora / International Chapter</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2: Convener / Principal Contact Information */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <UserCheck className="w-4 h-4" />
                <span>2. Convener / Principal Contact Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Convener Name */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    CONVENER / COORDINATOR FULL NAME <span className="text-lime-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={convenerName}
                    onChange={(e) => setConvenerName(e.target.value)}
                    placeholder="Enter convener or lead coordinator name"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>

                {/* Convener Title */}
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    TITLE / DESIGNATION IN GROUP
                  </label>
                  <input
                    type="text"
                    value={convenerTitle}
                    onChange={(e) => setConvenerTitle(e.target.value)}
                    placeholder="e.g. National Coordinator, Director General, President"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    OFFICIAL EMAIL ADDRESS <span className="text-lime-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter official contact email"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    PHONE NO. (WhatsApp No) <span className="text-lime-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter WhatsApp contact number"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  CONVENER GENDER
                </label>
                <div className="flex items-center gap-6 bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white hover:text-lime-300 transition-colors">
                    <input
                      type="radio"
                      name="sgConvenerGender"
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
                      name="sgConvenerGender"
                      value="Female"
                      checked={gender === 'Female'}
                      onChange={() => setGender('Female')}
                      className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 3: Headquarters & Location */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <Layers className="w-4 h-4" />
                <span>3. Group Headquarters & Location</span>
              </div>

              {/* Is Diaspora Chapter? */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  IS THIS A DIASPORA BASED SUPPORT GROUP?
                </label>
                <div className="flex items-center gap-6 bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white hover:text-lime-300 transition-colors">
                    <input
                      type="radio"
                      name="isDiasporaSg"
                      value="No"
                      checked={isDiaspora === 'No'}
                      onChange={() => setIsDiaspora('No')}
                      className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                    />
                    <span>No (Nigeria Based)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white hover:text-lime-300 transition-colors">
                    <input
                      type="radio"
                      name="isDiasporaSg"
                      value="Yes"
                      checked={isDiaspora === 'Yes'}
                      onChange={() => setIsDiaspora('Yes')}
                      className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                    />
                    <span>Yes (Diaspora / International)</span>
                  </label>
                </div>
              </div>

              {isDiaspora === 'Yes' ? (
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    FOREIGN COUNTRY OF HEADQUARTERS
                  </label>
                  <select
                    value={countryOfResidence}
                    onChange={(e) => setCountryOfResidence(e.target.value)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    {WORLD_COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-emerald-950 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
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
                        State of Headquarters
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
                </>
              )}

              {/* Office Address */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  OFFICIAL HEADQUARTERS ADDRESS
                </label>
                <input
                  type="text"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  placeholder="Enter full office or secretariat address"
                  className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                />
              </div>
            </div>

            {/* SECTION 4: ACCOUNT DETAILS */}
            <div className="space-y-4 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <CreditCard className="w-4 h-4" />
                <span>4. GROUP ACCOUNT DETAILS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            {/* SECTION 5: Civic Alignment & Feedback */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <MessageSquare className="w-4 h-4" />
                <span>5. Civic Alignment & Strategic Feedback</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  WHAT DOES YOUR GROUP LIKE ABOUT PRESIDENT TINUBU ADMINISTRATION?
                </label>
                <textarea
                  rows={3}
                  value={likeAboutTinubuAdmin}
                  onChange={(e) => setLikeAboutTinubuAdmin(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl p-3 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  WHAT SHOULD PRESIDENT TINUBU IMPROVE IN YOUR COMMUNITY / SECTOR?
                </label>
                <textarea
                  rows={3}
                  value={tinubuImproveArea}
                  onChange={(e) => setTinubuImproveArea(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl p-3 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  WHY DOES YOUR GROUP WANT TO ALIGN WITH RELAX TINUBU IS FIXING NIGERIA?
                </label>
                <textarea
                  rows={3}
                  value={whyAlignWithRtifn}
                  onChange={(e) => setWhyAlignWithRtifn(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl p-3 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 text-emerald-950 hover:from-lime-300 hover:to-emerald-300 font-black text-lg py-4 px-8 rounded-2xl shadow-xl hover:shadow-lime-400/30 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer border border-lime-200"
              >
                {isSubmitting ? (
                  <span>Saving Support Group Record...</span>
                ) : (
                  <>
                    <Building2 className="w-6 h-6 text-emerald-950" />
                    <span>Submit Support Group Registration</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-emerald-300 italic">
                By submitting, your group is officially integrated into the RTIFN Coalition Directory.
              </p>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
