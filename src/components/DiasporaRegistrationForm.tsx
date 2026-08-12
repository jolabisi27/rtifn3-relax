import React, { useState } from 'react';
import { Voter, GeopoliticalZone, PvcStatus, PreferredRole, Gender, Occupation } from '../types';
import { GEOPOLITICAL_ZONES, SAMPLE_LGAS_BY_STATE, getWardsForLga, getPollingUnitsForWard } from '../data/nigeriaData';
import { WORLD_COUNTRIES } from '../data/countriesData';
import confetti from 'canvas-confetti';
import { Globe, CheckCircle2, Sparkles, Info, CreditCard, Building2, UserCheck, MessageSquare, UserPlus, Home, MapPin, Users } from 'lucide-react';

interface DiasporaRegistrationFormProps {
  onVoterRegistered: (voter: Voter) => void;
  onGoHome?: () => void;
}

export const DiasporaRegistrationForm: React.FC<DiasporaRegistrationFormProps> = ({ onVoterRegistered, onGoHome }) => {
  // Basic personal details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<Gender>('Male');
  const [age, setAge] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('United Kingdom');
  const [foreignAddress, setForeignAddress] = useState('');
  const [occupation, setOccupation] = useState<Occupation>('Business');

  // Electoral & Location
  const [zone, setZone] = useState<GeopoliticalZone>('South West');
  const [state, setState] = useState<string>('Lagos');
  const [lga, setLga] = useState<string>('Ikeja');
  const [ward, setWard] = useState<string>(() => getWardsForLga('Ikeja')[0] || 'Ward A');
  const [pollingUnit, setPollingUnit] = useState<string>(() => getPollingUnitsForWard(getWardsForLga('Ikeja')[0] || 'Ward A')[0] || '');
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

  const handleSubmit = (e: React.FormEvent) => {
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
    if (!phone.trim() || phone.length < 8) {
      setErrorMessage('Please enter a valid WhatsApp phone number.');
      return;
    }
    if (!countryOfResidence) {
      setErrorMessage('Please select your foreign country of residence.');
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const statePrefix = state.slice(0, 3).toUpperCase();
    const newVoter: Voter = {
      id: 'diaspora_' + Date.now(),
      registrationCode: `RTIFN-DIASPORA-${statePrefix}-${randomSuffix}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      gender: gender,
      age: age.trim() || undefined,
      isDiaspora: true,
      countryOfResidence: countryOfResidence,
      foreignAddress: foreignAddress.trim() || undefined,
      occupation: occupation,
      apcRegistrationNumber: apcRegistrationNumber.trim() || undefined,
      accountDetails: {
        accountName: accountName.trim() || undefined,
        accountNumber: accountNumber.trim() || undefined,
        bankName: bankName.trim() || undefined
      },
      hasSupportGroup: hasSupportGroup,
      supportGroupName: supportGroupName.trim() || undefined,
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

    setTimeout(() => {
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
      onVoterRegistered(newVoter);

      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setAge('');
      setForeignAddress('');
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
    }, 600);
  };

  const handleResetAndAddNewMember = () => {
    setRecentVoter(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setAge('');
    setForeignAddress('');
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

    const el = document.getElementById('diaspora-registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const availableStates = GEOPOLITICAL_ZONES[zone] || [];
  const availableLgas = SAMPLE_LGAS_BY_STATE[state] || ['Central LGA', 'LGA Area 1', 'LGA Area 2'];
  const availableWards = lga ? getWardsForLga(lga) : [];
  const availablePollingUnits = ward ? getPollingUnitsForWard(ward) : [];

  return (
    <section id="diaspora-registration" className="py-16 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/40 text-xs font-bold uppercase tracking-wider shadow">
            <Globe className="w-4 h-4" />
            <span>Diaspora Registration Portal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Diaspora Registration Form
          </h2>

          <div className="bg-emerald-900/80 border border-emerald-700/80 rounded-2xl p-6 text-left shadow-xl space-y-3">
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-normal">
              Official registration for <strong className="text-lime-300">Relax Tinubu Is Fixing Nigeria (RTIFN)</strong> Diaspora Chapter.
            </p>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              Connecting Nigerians in the Diaspora across the globe to contribute strategic ideas, resources, and civic support toward national development and the 2027 progressive mandate.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-emerald-950 border-2 border-lime-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">

          {/* Top Banner Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-emerald-800 pb-6 mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-lime-400" />
                <span>Diaspora Registration Form</span>
              </h3>
              <p className="text-xs text-emerald-200 mt-1">
                Official registration for Relax Tinubu Is Fixing Nigeria (RTIFN)
              </p>
            </div>
            <div className="shrink-0">
              <span className="text-[10px] font-extrabold uppercase px-3 py-1.5 bg-lime-400 text-emerald-950 rounded-lg tracking-widest block shadow">
                RTIFN DIASPORA NETWORK
              </span>
            </div>
          </div>

          {/* Success Banner */}
          {recentVoter && (
            <div className="mb-8 p-5 bg-gradient-to-br from-emerald-900 to-emerald-950 border-2 border-lime-400 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-lime-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-black text-lime-300">
                    Diaspora Registration Submitted Successfully!
                  </h4>
                  <p className="text-xs text-emerald-100 mt-1">
                    Member <strong className="text-white capitalize">{recentVoter.fullName}</strong> ({recentVoter.countryOfResidence}) has been saved.
                    Code: <span className="font-mono font-bold text-lime-300">{recentVoter.registrationCode}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-emerald-800">
                <button
                  type="button"
                  onClick={handleResetAndAddNewMember}
                  className="flex-1 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-emerald-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer transition-all border border-lime-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add New Member</span>
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

            {/* SECTION 1: Personal Information */}
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

              {/* Phone & Age */}
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

              {/* GENDER */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  GENDER
                </label>
                <div className="flex items-center gap-6 bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-white hover:text-lime-300 transition-colors">
                    <input
                      type="radio"
                      name="diasporaGender"
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
                      name="diasporaGender"
                      value="Female"
                      checked={gender === 'Female'}
                      onChange={() => setGender('Female')}
                      className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              {/* FOREIGN COUNTRY OF RESIDENCE & Foreign Residential Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    FOREIGN COUNTRY OF RESIDENCE <span className="text-lime-400">*</span>
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

                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Foreign Residential Address
                  </label>
                  <input
                    type="text"
                    value={foreignAddress}
                    onChange={(e) => setForeignAddress(e.target.value)}
                    placeholder="Enter overseas street address & city"
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all"
                  />
                </div>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  Occupation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80">
                  {(['Business', 'Student', 'Traders', 'Farmer', 'others'] as Occupation[]).map((occ) => (
                    <label key={occ} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white hover:text-lime-300 transition-colors py-1">
                      <input
                        type="radio"
                        name="diasporaOccupation"
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

            {/* SECTION 2: Location & Electoral Information (Nigerian State & LGA of Origin/Registration) */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <UserCheck className="w-4 h-4" />
                <span>2. Location & Electoral Information (Nigeria)</span>
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
                    State of Residence / Origin
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
                  <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                    Electoral Ward List
                  </label>
                  <select
                    value={ward}
                    onChange={(e) => handleWardChange(e.target.value)}
                    className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                  >
                    {availableWards.map((w) => (
                      <option key={w} value={w} className="bg-emerald-950 text-white">
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Polling Unit */}
              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase tracking-wider mb-2">
                  Polling Unit List (from Electoral Ward)
                </label>
                <select
                  value={pollingUnit}
                  onChange={(e) => setPollingUnit(e.target.value)}
                  className="w-full bg-emerald-900/90 border border-emerald-700/80 focus:border-lime-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-400/30 transition-all cursor-pointer"
                >
                  {availablePollingUnits.map((pu) => (
                    <option key={pu} value={pu} className="bg-emerald-950 text-white">
                      {pu}
                    </option>
                  ))}
                </select>
              </div>

              {/* PVC Status & Role */}
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

            {/* SECTION 4: Support Group Affiliation */}
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
                        name="diasporaHasSupportGroup"
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
                        name="diasporaHasSupportGroup"
                        value="No"
                        checked={hasSupportGroup === 'No'}
                        onChange={() => setHasSupportGroup('No')}
                        className="w-4 h-4 text-lime-400 accent-lime-400 focus:ring-lime-400"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

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

            {/* SECTION 5: Civic Feedback & Alignment */}
            <div className="space-y-5 bg-emerald-900/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/80">
              <div className="flex items-center gap-2 text-lime-400 font-extrabold text-sm uppercase tracking-wider border-b border-emerald-800 pb-3">
                <MessageSquare className="w-4 h-4" />
                <span>5. Civic Feedback & Alignment</span>
              </div>

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

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 text-emerald-950 hover:from-lime-300 hover:to-emerald-300 font-black text-lg py-4 px-8 rounded-2xl shadow-xl hover:shadow-lime-400/30 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer border border-lime-200"
              >
                {isSubmitting ? (
                  <span>Saving Diaspora Record...</span>
                ) : (
                  <>
                    <Globe className="w-6 h-6 text-emerald-950" />
                    <span>Submit Diaspora Registration</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-emerald-300 italic">
                By submitting, you join the official RTIFN International Diaspora Directorate.
              </p>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
