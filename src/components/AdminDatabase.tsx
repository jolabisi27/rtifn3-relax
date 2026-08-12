import React, { useState, useEffect } from 'react';
import { Voter, SupportGroupRecord, GeopoliticalZone } from '../types';
import { GEOPOLITICAL_ZONES } from '../data/nigeriaData';
import {
  Database,
  Search,
  Download,
  Filter,
  Users,
  Globe,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Award,
  CreditCard,
  Layers,
  MapPin,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface AdminDatabaseProps {
  voters: Voter[];
  supportGroups?: SupportGroupRecord[];
  initialTab?: 'individual' | 'diaspora' | 'supportgroup';
  onSelectVoter: (voter: Voter) => void;
  onSelectSupportGroup?: (group: SupportGroupRecord) => void;
}

export const AdminDatabase: React.FC<AdminDatabaseProps> = ({
  voters,
  supportGroups = [],
  initialTab = 'individual',
  onSelectVoter,
  onSelectSupportGroup
}) => {
  const [activeDbTab, setActiveDbTab] = useState<'individual' | 'diaspora' | 'supportgroup'>(initialTab);

  // Synchronize initialTab if parent changes tab
  useEffect(() => {
    if (initialTab) {
      setActiveDbTab(initialTab);
    }
  }, [initialTab]);

  // Common Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('ALL');
  const [selectedPvcFilter, setSelectedPvcFilter] = useState<string>('ALL');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');

  // --- 1. SEPARATE DATABASES DATA ---
  // Individual Database (Nigeria-based, non-diaspora, non-group reps)
  const individualVoters = voters.filter((v) => !v.isDiaspora);

  // Diaspora Database (International / Diaspora supporters)
  const diasporaVoters = voters.filter((v) => v.isDiaspora === true);

  // Support Group Database
  // All support group records
  const supportGroupRecords = supportGroups;

  // --- 2. SEARCH & FILTER LOGIC PER DATABASE TAB ---
  const filteredIndividualVoters = individualVoters.filter((v) => {
    const matchesSearch =
      v.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.phone.includes(searchQuery) ||
      v.registrationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.lga.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesZone = selectedZoneFilter === 'ALL' || v.geopoliticalZone === selectedZoneFilter;
    const matchesPvc = selectedPvcFilter === 'ALL' || v.pvcStatus === selectedPvcFilter;

    return matchesSearch && matchesZone && matchesPvc;
  });

  const filteredDiasporaVoters = diasporaVoters.filter((v) => {
    const matchesSearch =
      v.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.phone.includes(searchQuery) ||
      v.registrationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.countryOfResidence && v.countryOfResidence.toLowerCase().includes(searchQuery.toLowerCase())) ||
      v.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountryFilter === 'ALL' || v.countryOfResidence === selectedCountryFilter;
    const matchesPvc = selectedPvcFilter === 'ALL' || v.pvcStatus === selectedPvcFilter;

    return matchesSearch && matchesCountry && matchesPvc;
  });

  const filteredSupportGroups = supportGroupRecords.filter((g) => {
    const matchesSearch =
      g.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.acronym && g.acronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
      g.convenerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phone.includes(searchQuery) ||
      g.registrationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.cacNumber && g.cacNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      g.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategoryFilter === 'ALL' || g.category === selectedCategoryFilter;
    const matchesZone = selectedZoneFilter === 'ALL' || g.geopoliticalZone === selectedZoneFilter;

    return matchesSearch && matchesCategory && matchesZone;
  });

  // Unique countries list for Diaspora filter
  const diasporaCountries = Array.from(
    new Set(diasporaVoters.map((v) => v.countryOfResidence).filter(Boolean))
  );

  // Unique categories list for Support Group filter
  const groupCategories = Array.from(new Set(supportGroupRecords.map((g) => g.category)));

  // --- 3. CSV EXPORTER LOGIC ---
  const handleExportIndividualCsv = () => {
    if (individualVoters.length === 0) {
      alert('No individual voter records to export.');
      return;
    }
    const headers = [
      'Registration Code',
      'Full Name',
      'Email',
      'Phone (WhatsApp)',
      'Gender',
      'Age',
      'Occupation',
      'APC Reg Number',
      'Account Name',
      'Account Number',
      'Bank Name',
      'Has Support Group',
      'Support Group Name',
      'Geopolitical Zone',
      'State',
      'LGA',
      'Ward',
      'Polling Unit',
      'PVC Status',
      'Preferred Role',
      'Registered At'
    ];
    const rows = individualVoters.map((v) => [
      v.registrationCode,
      `"${v.fullName}"`,
      v.email,
      v.phone,
      v.gender || '',
      v.age || '',
      v.occupation || '',
      v.apcRegistrationNumber || '',
      `"${v.accountDetails?.accountName || ''}"`,
      `"${v.accountDetails?.accountNumber || ''}"`,
      `"${v.accountDetails?.bankName || ''}"`,
      v.hasSupportGroup || '',
      `"${v.supportGroupName || ''}"`,
      v.geopoliticalZone,
      v.state,
      v.lga,
      v.ward || '',
      `"${v.pollingUnit || ''}"`,
      v.pvcStatus,
      v.preferredRole,
      v.registeredAt
    ]);

    downloadCsvFile('RTIFN_Individual_Supporters_Database.csv', headers, rows);
  };

  const handleExportDiasporaCsv = () => {
    if (diasporaVoters.length === 0) {
      alert('No diaspora supporter records to export.');
      return;
    }
    const headers = [
      'Registration Code',
      'Full Name',
      'Foreign Country',
      'Foreign Address',
      'Email',
      'Phone (WhatsApp)',
      'Gender',
      'Occupation',
      'State of Origin',
      'LGA of Origin',
      'PVC Status',
      'Preferred Role',
      'Registered At'
    ];
    const rows = diasporaVoters.map((v) => [
      v.registrationCode,
      `"${v.fullName}"`,
      `"${v.countryOfResidence || ''}"`,
      `"${v.foreignAddress || ''}"`,
      v.email,
      v.phone,
      v.gender || '',
      v.occupation || '',
      v.state,
      v.lga,
      v.pvcStatus,
      v.preferredRole,
      v.registeredAt
    ]);

    downloadCsvFile('RTIFN_Diaspora_Supporters_Database.csv', headers, rows);
  };

  const handleExportSupportGroupCsv = () => {
    if (supportGroupRecords.length === 0) {
      alert('No support group records to export.');
      return;
    }
    const headers = [
      'Registration Code',
      'Group Name',
      'Acronym',
      'CAC Number',
      'Membership Size',
      'Category',
      'Coverage Scope',
      'Convener Name',
      'Convener Title',
      'Email',
      'Phone (WhatsApp)',
      'Is Diaspora',
      'Country HQ',
      'Zone HQ',
      'State HQ',
      'LGA HQ',
      'Office Address',
      'Account Name',
      'Account Number',
      'Bank Name',
      'Registered At'
    ];
    const rows = supportGroupRecords.map((g) => [
      g.registrationCode,
      `"${g.groupName}"`,
      g.acronym || '',
      g.cacNumber || '',
      `"${g.membershipSize}"`,
      `"${g.category}"`,
      `"${g.coverageScope}"`,
      `"${g.convenerName}"`,
      `"${g.convenerTitle}"`,
      g.email,
      g.phone,
      g.isDiaspora ? 'Yes' : 'No',
      g.countryOfResidence || 'Nigeria',
      g.geopoliticalZone,
      g.state,
      g.lga,
      `"${g.officeAddress || ''}"`,
      `"${g.accountDetails?.accountName || ''}"`,
      `"${g.accountDetails?.accountNumber || ''}"`,
      `"${g.accountDetails?.bankName || ''}"`,
      g.registeredAt
    ]);

    downloadCsvFile('RTIFN_Support_Groups_Database.csv', headers, rows);
  };

  const downloadCsvFile = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to trigger card modal for Support Group Record
  const handleSupportGroupCardClick = (group: SupportGroupRecord) => {
    if (onSelectSupportGroup) {
      onSelectSupportGroup(group);
      return;
    }
    // Fallback: convert to Voter structure for MembershipCardModal
    const voterAdaptor: Voter = {
      id: group.id,
      registrationCode: group.registrationCode,
      fullName: `${group.groupName} (${group.acronym || 'Support Group'})`,
      email: group.email,
      phone: group.phone,
      gender: group.gender,
      occupation: `Convener: ${group.convenerName} (${group.convenerTitle})`,
      geopoliticalZone: group.geopoliticalZone,
      state: group.state,
      lga: group.lga,
      ward: group.coverageScope,
      pvcStatus: 'Have PVC',
      preferredRole: 'Mobilizer',
      hasSupportGroup: 'Yes',
      supportGroupName: group.groupName,
      isDiaspora: group.isDiaspora,
      countryOfResidence: group.countryOfResidence,
      accountDetails: group.accountDetails,
      likeAboutTinubuAdmin: group.likeAboutTinubuAdmin,
      tinubuImproveArea: group.tinubuImproveArea,
      whyJoinRtifn: group.whyAlignWithRtifn,
      registeredAt: group.registeredAt
    };
    onSelectVoter(voterAdaptor);
  };

  return (
    <section id="database" className="py-16 bg-emerald-950 text-white relative border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/20 text-lime-300 text-xs font-bold uppercase tracking-wider mb-2 border border-lime-400/40">
              <Database className="w-4 h-4" />
              <span>Centralized Electorate Records</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              RTIFN Supporter Databases
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1">
              Categorized data portal for local individual voters, international diaspora chapters, and affiliated support groups.
            </p>
          </div>

          {/* Export Button matching Active Tab */}
          <div className="flex items-center gap-3">
            {activeDbTab === 'individual' && (
              <button
                onClick={handleExportIndividualCsv}
                className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-xs py-3 px-5 rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Individual CSV ({individualVoters.length})</span>
              </button>
            )}

            {activeDbTab === 'diaspora' && (
              <button
                onClick={handleExportDiasporaCsv}
                className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-xs py-3 px-5 rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Diaspora CSV ({diasporaVoters.length})</span>
              </button>
            )}

            {activeDbTab === 'supportgroup' && (
              <button
                onClick={handleExportSupportGroupCsv}
                className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-xs py-3 px-5 rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Support Groups CSV ({supportGroupRecords.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* --- MAIN DATABASE CATEGORY TABS --- */}
        <div className="bg-emerald-900/90 border-2 border-emerald-700/80 p-2 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-2 shadow-xl">
          {/* Tab 1: Individual Database */}
          <button
            onClick={() => {
              setActiveDbTab('individual');
              setSearchQuery('');
            }}
            className={`flex items-center justify-center gap-3 py-4 px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeDbTab === 'individual'
                ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-emerald-950 shadow-xl border border-lime-200 scale-[1.01]'
                : 'text-emerald-200 hover:bg-emerald-800/80 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5 shrink-0" />
            <div className="text-left">
              <span className="block leading-none">Individual Database</span>
              <span className="text-[10px] opacity-80 font-mono mt-0.5 block">
                {individualVoters.length} Local Supporters
              </span>
            </div>
          </button>

          {/* Tab 2: Diaspora Database */}
          <button
            onClick={() => {
              setActiveDbTab('diaspora');
              setSearchQuery('');
            }}
            className={`flex items-center justify-center gap-3 py-4 px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeDbTab === 'diaspora'
                ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-emerald-950 shadow-xl border border-lime-200 scale-[1.01]'
                : 'text-emerald-200 hover:bg-emerald-800/80 hover:text-white'
            }`}
          >
            <Globe className="w-5 h-5 shrink-0" />
            <div className="text-left">
              <span className="block leading-none">Diaspora Database</span>
              <span className="text-[10px] opacity-80 font-mono mt-0.5 block">
                {diasporaVoters.length} Global Supporters
              </span>
            </div>
          </button>

          {/* Tab 3: Support Group Database */}
          <button
            onClick={() => {
              setActiveDbTab('supportgroup');
              setSearchQuery('');
            }}
            className={`flex items-center justify-center gap-3 py-4 px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeDbTab === 'supportgroup'
                ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-emerald-950 shadow-xl border border-lime-200 scale-[1.01]'
                : 'text-emerald-200 hover:bg-emerald-800/80 hover:text-white'
            }`}
          >
            <Building2 className="w-5 h-5 shrink-0" />
            <div className="text-left">
              <span className="block leading-none">Support Group Database</span>
              <span className="text-[10px] opacity-80 font-mono mt-0.5 block">
                {supportGroupRecords.length} Affiliated Groups
              </span>
            </div>
          </button>
        </div>

        {/* --- VIEW TAB 1: INDIVIDUAL DATABASE --- */}
        {activeDbTab === 'individual' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Stat Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">Nigeria Total</span>
                <span className="text-2xl font-black text-lime-300">{individualVoters.length}</span>
                <span className="text-[10px] text-emerald-200 block">Registered Voters</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">PVC Holders</span>
                <span className="text-2xl font-black text-white">
                  {individualVoters.filter((v) => v.pvcStatus === 'Have PVC').length}
                </span>
                <span className="text-[10px] text-emerald-200 block">Ready Voters</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">States Covered</span>
                <span className="text-2xl font-black text-lime-300">
                  {new Set(individualVoters.map((v) => v.state)).size}
                </span>
                <span className="text-[10px] text-emerald-200 block">States & FCT</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">Mobilizers</span>
                <span className="text-2xl font-black text-white">
                  {individualVoters.filter((v) => v.preferredRole === 'Mobilizer' || v.preferredRole === 'Ward Coordinator').length}
                </span>
                <span className="text-[10px] text-emerald-200 block">Field Officers</span>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-emerald-900/80 border border-emerald-700/80 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-6 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by voter name, phone, state, LGA or registration code..."
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-lime-400"
                />
                <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3.5" />
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedZoneFilter}
                  onChange={(e) => setSelectedZoneFilter(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="ALL">All Geopolitical Zones</option>
                  {Object.keys(GEOPOLITICAL_ZONES).map((z) => (
                    <option key={z} value={z}>{z} Zone</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedPvcFilter}
                  onChange={(e) => setSelectedPvcFilter(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="ALL">All PVC Statuses</option>
                  <option value="Have PVC">Have Valid PVC</option>
                  <option value="Awaiting PVC / Registered">Awaiting PVC</option>
                  <option value="Needs New PVC Registration">Needs New PVC</option>
                </select>
              </div>
            </div>

            {/* Individual Voters Table */}
            <div className="bg-emerald-950 border border-emerald-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-emerald-100">
                  <thead className="bg-emerald-900/90 text-lime-300 font-bold uppercase tracking-wider border-b border-emerald-800">
                    <tr>
                      <th className="py-4 px-4">Code</th>
                      <th className="py-4 px-4">Full Name</th>
                      <th className="py-4 px-4">Contact</th>
                      <th className="py-4 px-4">State & LGA</th>
                      <th className="py-4 px-4">PVC Status</th>
                      <th className="py-4 px-4">Role</th>
                      <th className="py-4 px-4 text-right">Card</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-800/60">
                    {filteredIndividualVoters.length > 0 ? (
                      filteredIndividualVoters.map((voter) => (
                        <tr key={voter.id} className="hover:bg-emerald-900/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-lime-300">{voter.registrationCode}</td>
                          <td className="py-3.5 px-4 font-bold text-white capitalize">{voter.fullName}</td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="text-white">{voter.phone}</div>
                            <div className="text-[10px] text-emerald-300">{voter.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-white block">{voter.state}</span>
                            <span className="text-[10px] text-emerald-300 block">{voter.lga} {voter.ward ? `• ${voter.ward}` : ''}</span>
                            {voter.pollingUnit && (
                              <span className="text-[10px] text-lime-300/90 font-medium block truncate max-w-[180px]" title={voter.pollingUnit}>
                                {voter.pollingUnit}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-emerald-800 text-lime-300 rounded text-[10px] font-bold border border-emerald-700">
                              {voter.pvcStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-emerald-200">{voter.preferredRole}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => onSelectVoter(voter)}
                              className="bg-emerald-800 hover:bg-emerald-700 text-lime-300 font-bold text-[11px] px-3 py-1.5 rounded-lg border border-emerald-700 transition-colors cursor-pointer"
                            >
                              View ID
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-emerald-300">
                          No matching individual supporters found in database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-emerald-900/60 px-6 py-4 border-t border-emerald-800 flex justify-between items-center text-xs text-emerald-300 font-medium">
                <span>Showing {filteredIndividualVoters.length} of {individualVoters.length} individual supporters</span>
                <span className="text-lime-300 font-bold">Local Individual Node: Active</span>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW TAB 2: DIASPORA DATABASE --- */}
        {activeDbTab === 'diaspora' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Stat Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">Diaspora Total</span>
                <span className="text-2xl font-black text-lime-300">{diasporaVoters.length}</span>
                <span className="text-[10px] text-emerald-200 block">Global Supporters</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">Countries</span>
                <span className="text-2xl font-black text-white">{diasporaCountries.length}</span>
                <span className="text-[10px] text-emerald-200 block">Foreign Nations</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">State Roots</span>
                <span className="text-2xl font-black text-lime-300">
                  {new Set(diasporaVoters.map((v) => v.state)).size}
                </span>
                <span className="text-[10px] text-emerald-200 block">Nigerian States</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">Diaspora PVC Rate</span>
                <span className="text-2xl font-black text-white">
                  {diasporaVoters.length > 0
                    ? Math.round((diasporaVoters.filter((v) => v.pvcStatus === 'Have PVC').length / diasporaVoters.length) * 100)
                    : 0}%
                </span>
                <span className="text-[10px] text-emerald-200 block">Registered Voters</span>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-emerald-900/80 border border-emerald-700/80 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-6 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by diaspora member, country, state of origin, or code..."
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-lime-400"
                />
                <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3.5" />
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedCountryFilter}
                  onChange={(e) => setSelectedCountryFilter(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="ALL">All Diaspora Countries</option>
                  {diasporaCountries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedPvcFilter}
                  onChange={(e) => setSelectedPvcFilter(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="ALL">All PVC Statuses</option>
                  <option value="Have PVC">Have Valid PVC</option>
                  <option value="Awaiting PVC / Registered">Awaiting PVC</option>
                </select>
              </div>
            </div>

            {/* Diaspora Table */}
            <div className="bg-emerald-950 border border-emerald-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-emerald-100">
                  <thead className="bg-emerald-900/90 text-lime-300 font-bold uppercase tracking-wider border-b border-emerald-800">
                    <tr>
                      <th className="py-4 px-4">Code</th>
                      <th className="py-4 px-4">Full Name</th>
                      <th className="py-4 px-4">Country & Foreign Address</th>
                      <th className="py-4 px-4">Contact (WhatsApp)</th>
                      <th className="py-4 px-4">State of Origin</th>
                      <th className="py-4 px-4">PVC Status</th>
                      <th className="py-4 px-4 text-right">Card</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-800/60">
                    {filteredDiasporaVoters.length > 0 ? (
                      filteredDiasporaVoters.map((voter) => (
                        <tr key={voter.id} className="hover:bg-emerald-900/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-lime-300">{voter.registrationCode}</td>
                          <td className="py-3.5 px-4 font-bold text-white capitalize">{voter.fullName}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-lime-300 block flex items-center gap-1">
                              🌍 {voter.countryOfResidence}
                            </span>
                            <span className="text-[10px] text-emerald-300 block truncate max-w-[180px]">
                              {voter.foreignAddress || 'Diaspora Chapter'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="text-white font-mono">{voter.phone}</div>
                            <div className="text-[10px] text-emerald-300">{voter.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-white block">{voter.state} State</span>
                            <span className="text-[10px] text-emerald-300 block">{voter.lga}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-emerald-800 text-lime-300 rounded text-[10px] font-bold border border-emerald-700">
                              {voter.pvcStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => onSelectVoter(voter)}
                              className="bg-emerald-800 hover:bg-emerald-700 text-lime-300 font-bold text-[11px] px-3 py-1.5 rounded-lg border border-emerald-700 transition-colors cursor-pointer"
                            >
                              View Card
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-emerald-300">
                          No matching diaspora supporters found in database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-emerald-900/60 px-6 py-4 border-t border-emerald-800 flex justify-between items-center text-xs text-emerald-300 font-medium">
                <span>Showing {filteredDiasporaVoters.length} of {diasporaVoters.length} diaspora supporters</span>
                <span className="text-lime-300 font-bold">Diaspora Global Node: Active</span>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW TAB 3: SUPPORT GROUP DATABASE --- */}
        {activeDbTab === 'supportgroup' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Stat Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">Total Groups</span>
                <span className="text-2xl font-black text-lime-300">{supportGroupRecords.length}</span>
                <span className="text-[10px] text-emerald-200 block">Registered Support Groups</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">National Coalitions</span>
                <span className="text-2xl font-black text-white">
                  {supportGroupRecords.filter((g) => g.coverageScope.toLowerCase().includes('national')).length}
                </span>
                <span className="text-[10px] text-emerald-200 block">Multi-State Reach</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">Categories</span>
                <span className="text-2xl font-black text-lime-300">{groupCategories.length}</span>
                <span className="text-[10px] text-emerald-200 block">Sectors & Wings</span>
              </div>
              <div className="bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">CAC Registered</span>
                <span className="text-2xl font-black text-white">
                  {supportGroupRecords.filter((g) => Boolean(g.cacNumber)).length}
                </span>
                <span className="text-[10px] text-emerald-200 block">Formal Entities</span>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-emerald-900/80 border border-emerald-700/80 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-6 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by support group name, acronym, CAC number, convener or state..."
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-lime-400"
                />
                <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3.5" />
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="ALL">All Categories / Wings</option>
                  {groupCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <select
                  value={selectedZoneFilter}
                  onChange={(e) => setSelectedZoneFilter(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 px-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="ALL">All Geopolitical Zones</option>
                  {Object.keys(GEOPOLITICAL_ZONES).map((z) => (
                    <option key={z} value={z}>{z} Zone</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Support Group Table */}
            <div className="bg-emerald-950 border border-emerald-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-emerald-100">
                  <thead className="bg-emerald-900/90 text-lime-300 font-bold uppercase tracking-wider border-b border-emerald-800">
                    <tr>
                      <th className="py-4 px-4">Code</th>
                      <th className="py-4 px-4">Support Group Name</th>
                      <th className="py-4 px-4">Category & Scope</th>
                      <th className="py-4 px-4">Membership Base</th>
                      <th className="py-4 px-4">Convener / Coordinator</th>
                      <th className="py-4 px-4">Contact & HQ</th>
                      <th className="py-4 px-4 text-right">Affiliation Slip</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-800/60">
                    {filteredSupportGroups.length > 0 ? (
                      filteredSupportGroups.map((group) => (
                        <tr key={group.id} className="hover:bg-emerald-900/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-lime-300">{group.registrationCode}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-extrabold text-white text-sm">
                              {group.groupName}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {group.acronym && (
                                <span className="bg-lime-400 text-emerald-950 font-mono text-[9px] font-black px-1.5 py-0.5 rounded">
                                  {group.acronym}
                                </span>
                              )}
                              {group.cacNumber && (
                                <span className="text-[10px] text-emerald-300 font-mono">
                                  CAC: {group.cacNumber}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <span className="font-bold text-lime-200 block">{group.category}</span>
                            <span className="text-[10px] text-emerald-300 block">{group.coverageScope}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 bg-emerald-900 text-lime-300 rounded-lg text-[10px] font-bold border border-emerald-700 inline-block">
                              👥 {group.membershipSize}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="font-bold text-white">{group.convenerName}</div>
                            <div className="text-[10px] text-emerald-300">{group.convenerTitle}</div>
                          </td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="text-white font-mono">{group.phone}</div>
                            <div className="text-[10px] text-emerald-300">
                              {group.isDiaspora ? `🌍 ${group.countryOfResidence}` : `${group.state} State`}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleSupportGroupCardClick(group)}
                              className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow"
                            >
                              View Slip
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-emerald-300">
                          No matching support groups found in database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-emerald-900/60 px-6 py-4 border-t border-emerald-800 flex justify-between items-center text-xs text-emerald-300 font-medium">
                <span>Showing {filteredSupportGroups.length} of {supportGroupRecords.length} registered support groups</span>
                <span className="text-lime-300 font-bold">Coalition Directorate Node: Active</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
