import React, { useState, useEffect } from 'react';
import { Voter, SupportGroupRecord } from './types';
import { apiService } from './services/apiService';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SlideBanner } from './components/SlideBanner';
import { VoterRegistrationForm } from './components/VoterRegistrationForm';
import { DiasporaRegistrationForm } from './components/DiasporaRegistrationForm';
import { SupportGroupRegistrationForm } from './components/SupportGroupRegistrationForm';
import { CoreFocus } from './components/CoreFocus';
import { SlidesDeck } from './components/SlidesDeck';
import { CallCentre } from './components/CallCentre';
import { InecDirectory } from './components/InecDirectory';
import { AdminDatabase } from './components/AdminDatabase';
import { AdminPortal } from './components/AdminPortal';
import { DonationPortal } from './components/DonationPortal';
import { MembershipCardModal } from './components/MembershipCardModal';
import { Footer } from './components/Footer';

// Seed initial registered supporters
const INITIAL_VOTERS: Voter[] = [
  {
    id: 'seed_1',
    registrationCode: 'RTIFN-2027-FC-88219',
    fullName: 'Alhaji Ibrahim Danladi',
    email: 'ibrahim.danladi@gmail.com',
    phone: '08034567891',
    geopoliticalZone: 'North Central',
    state: 'FCT Abuja',
    lga: 'Abuja Municipal (AMAC)',
    ward: 'Garki Ward 02',
    pvcStatus: 'Have PVC',
    preferredRole: 'Ward Coordinator',
    registeredAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'seed_2',
    registrationCode: 'RTIFN-2027-LA-99201',
    fullName: 'Chief Mrs. Funke Adebayo',
    email: 'funke.adebayo@yahoo.com',
    phone: '08023456789',
    geopoliticalZone: 'South West',
    state: 'Lagos',
    lga: 'Ikeja',
    ward: 'GRA Ikeja',
    pvcStatus: 'Have PVC',
    preferredRole: 'Mobilizer',
    registeredAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'seed_3',
    registrationCode: 'RTIFN-2027-KN-44102',
    fullName: 'Usman Sani Garba',
    email: 'usman.garba@hotmail.com',
    phone: '08061234567',
    geopoliticalZone: 'North West',
    state: 'Kano',
    lga: 'Kano Municipal',
    ward: 'Gandun Albasa',
    pvcStatus: 'Awaiting PVC / Registered',
    preferredRole: 'Polling Unit Agent',
    registeredAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'seed_4',
    registrationCode: 'RTIFN-2027-RI-33910',
    fullName: 'Grace Chinedu Okonkwo',
    email: 'grace.okonkwo@gmail.com',
    phone: '08059876543',
    geopoliticalZone: 'South South',
    state: 'Rivers',
    lga: 'Port Harcourt',
    ward: 'Mile 1 Diobu',
    pvcStatus: 'Have PVC',
    preferredRole: 'Volunteer',
    registeredAt: new Date().toISOString()
  },
  {
    id: 'seed_diaspora_1',
    registrationCode: 'RTIFN-2027-DIASPORA-77102',
    fullName: 'Chief Mrs. Amaka Egwu',
    email: 'amaka.egwu@diaspora-usa.com',
    phone: '+1 202 555 0188',
    gender: 'Female',
    geopoliticalZone: 'South East',
    state: 'Enugu',
    lga: 'Enugu North',
    ward: 'Independence Layout',
    pvcStatus: 'Have PVC',
    preferredRole: 'Ward Coordinator',
    isDiaspora: true,
    countryOfResidence: 'United States',
    foreignAddress: '1200 Pennsylvania Ave NW, Washington, DC',
    registeredAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'seed_diaspora_2',
    registrationCode: 'RTIFN-2027-DIASPORA-99182',
    fullName: 'Engr. Kenneth Adeleke',
    email: 'k.adeleke@toronto.ca',
    phone: '+1 416 555 0199',
    gender: 'Male',
    geopoliticalZone: 'South West',
    state: 'Oyo',
    lga: 'Ibadan North',
    ward: 'Bodija Ward 03',
    pvcStatus: 'Have PVC',
    preferredRole: 'Volunteer',
    isDiaspora: true,
    countryOfResidence: 'Canada',
    foreignAddress: '100 Yonge St, Toronto, ON M5C 2W1',
    registeredAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

// Seed initial support group records
const INITIAL_SUPPORT_GROUPS: SupportGroupRecord[] = [
  {
    id: 'sg_seed_1',
    registrationCode: 'RTIFN-SG-LA-10821',
    groupName: 'Asiwaju Youth Vanguard for Progress',
    acronym: 'AYVP',
    cacNumber: 'CAC/IT/881203',
    membershipSize: '2,000 - 10,000 Members',
    category: 'Youth Wing & Mobilization',
    coverageScope: 'National Level (Multi-State)',
    convenerName: 'Comrade Seyi Oladipo',
    convenerTitle: 'National Coordinator',
    email: 'info@ayvp-tinubu.org',
    phone: '08031123456',
    gender: 'Male',
    isDiaspora: false,
    geopoliticalZone: 'South West',
    state: 'Lagos',
    lga: 'Ikeja',
    officeAddress: '14 Allen Avenue, Ikeja, Lagos State',
    accountDetails: {
      accountName: 'Asiwaju Youth Vanguard',
      accountNumber: '0123456789',
      bankName: 'First Bank of Nigeria'
    },
    likeAboutTinubuAdmin: 'Bold economic reforms, student loan scheme, and youth empowerment initiatives.',
    tinubuImproveArea: 'Increased job creation and digital tech hubs across geopolitical zones.',
    whyAlignWithRtifn: 'To mobilize over 10,000 youth voters at polling unit level for 2027.',
    registeredAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'sg_seed_2',
    registrationCode: 'RTIFN-SG-FC-20419',
    groupName: 'Tinubu Women Grassroots Mobilization Movement',
    acronym: 'TWGMM',
    cacNumber: 'CAC/IT/994120',
    membershipSize: '10,000+ Members (Mega Group)',
    category: 'Women Empowerment Coalition',
    coverageScope: 'National Level (Multi-State)',
    convenerName: 'Hajiya Amina Bello',
    convenerTitle: 'Director General',
    email: 'contact@twgmm.ng',
    phone: '08028876543',
    gender: 'Female',
    isDiaspora: false,
    geopoliticalZone: 'North Central',
    state: 'FCT Abuja',
    lga: 'Abuja Municipal (AMAC)',
    officeAddress: 'Suite 302, CBD, Abuja',
    accountDetails: {
      accountName: 'TWGMM National Account',
      accountNumber: '2034567891',
      bankName: 'Zenith Bank'
    },
    likeAboutTinubuAdmin: 'Social welfare schemes, MSME grants for market women, and female appointments.',
    tinubuImproveArea: 'Further expansion of agricultural grants for rural female farmers.',
    whyAlignWithRtifn: 'Unified grassroots network for 2027 presidential endorsement.',
    registeredAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'sg_seed_3',
    registrationCode: 'RTIFN-SG-DIASPORA-30112',
    groupName: 'Diaspora Coalition for Tinubu 2027',
    acronym: 'DCT-UK',
    cacNumber: 'UK-REG-991204',
    membershipSize: '500 - 2,000 Members',
    category: 'Diaspora Support Vanguard',
    coverageScope: 'Diaspora / International Chapter',
    convenerName: 'Dr. Babatunde Opeyemi',
    convenerTitle: 'UK & Europe Chapter President',
    email: 'uk@diasporatinubu.org',
    phone: '+44 7700 900077',
    gender: 'Male',
    isDiaspora: true,
    countryOfResidence: 'United Kingdom',
    geopoliticalZone: 'South West',
    state: 'Lagos',
    lga: 'Ikeja',
    officeAddress: '45 Canary Wharf, London, E14 5AB',
    accountDetails: {
      accountName: 'Diaspora Coalition UK',
      accountNumber: '7789012345',
      bankName: 'Guaranty Trust Bank (GTB)'
    },
    likeAboutTinubuAdmin: 'Infrastructural drive, unification of foreign exchange, and diplomatic engagement.',
    tinubuImproveArea: 'Diaspora voting rights legislation in National Assembly.',
    whyAlignWithRtifn: 'Connecting Nigerians in Diaspora with ongoing economic transformations.',
    registeredAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && localStorage.getItem('rtifn_admin_session') === 'active';
    } catch (e) {
      return false;
    }
  });

  const [voters, setVoters] = useState<Voter[]>(() => {
    try {
      const saved = localStorage.getItem('rtifn_voters_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // Fallback
    }
    return INITIAL_VOTERS;
  });

  const [supportGroups, setSupportGroups] = useState<SupportGroupRecord[]>(() => {
    try {
      const saved = localStorage.getItem('rtifn_support_groups_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // Fallback
    }
    return INITIAL_SUPPORT_GROUPS;
  });

  const [activeModalVoter, setActiveModalVoter] = useState<Voter | null>(null);

  // Sync with central server on mount
  useEffect(() => {
    let isMounted = true;
    const loadCentralData = async () => {
      try {
        const [serverVoters, serverGroups] = await Promise.all([
          apiService.fetchVoters(),
          apiService.fetchSupportGroups()
        ]);
        if (isMounted) {
          if (Array.isArray(serverVoters) && serverVoters.length > 0) {
            setVoters(serverVoters);
          }
          if (Array.isArray(serverGroups) && serverGroups.length > 0) {
            setSupportGroups(serverGroups);
          }
        }
      } catch (err) {
        console.warn('Initial server sync completed with local cache');
      }
    };
    loadCentralData();
    return () => { isMounted = false; };
  }, []);

  // Save to localStorage when voters or support groups update
  useEffect(() => {
    try {
      localStorage.setItem('rtifn_voters_db', JSON.stringify(voters));
    } catch (e) {
      // Storage limits
    }
  }, [voters]);

  useEffect(() => {
    try {
      localStorage.setItem('rtifn_support_groups_db', JSON.stringify(supportGroups));
    } catch (e) {
      // Storage limits
    }
  }, [supportGroups]);

  const handleVoterRegistered = (newVoter: Voter) => {
    setVoters((prev) => [newVoter, ...prev.filter(v => v.id !== newVoter.id)]);
    setActiveModalVoter(newVoter);
  };

  const handleSupportGroupRegistered = (group: SupportGroupRecord) => {
    setSupportGroups((prev) => [group, ...prev.filter(g => g.id !== group.id)]);

    const voterRecord: Voter = {
      id: group.id,
      registrationCode: group.registrationCode,
      fullName: group.convenerName,
      email: group.email,
      phone: group.phone,
      gender: group.gender,
      occupation: 'Business',
      geopoliticalZone: group.geopoliticalZone,
      state: group.state,
      lga: group.lga,
      ward: group.ward || 'Central Office',
      pvcStatus: 'Have PVC',
      preferredRole: 'Mobilizer',
      hasSupportGroup: 'Yes',
      supportGroupName: `${group.groupName} (${group.acronym || 'Affiliate'})`,
      isDiaspora: group.isDiaspora,
      countryOfResidence: group.countryOfResidence,
      accountDetails: group.accountDetails,
      likeAboutTinubuAdmin: group.likeAboutTinubuAdmin,
      tinubuImproveArea: group.tinubuImproveArea,
      whyJoinRtifn: group.whyAlignWithRtifn,
      registeredAt: group.registeredAt
    };

    setVoters((prev) => [voterRecord, ...prev.filter(v => v.id !== voterRecord.id)]);
    setActiveModalVoter(voterRecord);
  };

  const handleRegisterClick = () => {
    setActiveTab('registration');
    const el = document.getElementById('registration');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSlidesClick = () => {
    setActiveTab('slides');
    const el = document.getElementById('slides');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddNewMember = () => {
    setActiveModalVoter(null);
    setActiveTab('registration');
    setTimeout(() => {
      const el = document.getElementById('registration');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleGoHome = () => {
    setActiveModalVoter(null);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-emerald-950 font-sans text-white selection:bg-lime-400 selection:text-emerald-950">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        registeredCount={voters.length + 125480}
        isAdminAuthenticated={isAdminAuthenticated}
        onAdminLogout={() => {
          setIsAdminAuthenticated(false);
          localStorage.removeItem('rtifn_admin_session');
        }}
      />

      {/* Main Content Area */}
      <main>
        {activeTab === 'home' && (
          <>
            <SlideBanner
              onRegisterClick={handleRegisterClick}
              onCallCentreClick={() => {
                setActiveTab('callcentre');
                const el = document.getElementById('callcentre');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSlidesClick={handleSlidesClick}
            />
            <Hero
              onRegisterClick={handleRegisterClick}
              onSlidesClick={handleSlidesClick}
              registeredCount={voters.length + 125480}
            />
            <VoterRegistrationForm
              onVoterRegistered={handleVoterRegistered}
              onGoHome={handleGoHome}
              allVoters={voters}
              onSelectVoter={(v) => setActiveModalVoter(v)}
            />
            <CoreFocus onRegisterClick={handleRegisterClick} />
            <SlidesDeck />
            <CallCentre />
            <InecDirectory />
            <AdminPortal
              voters={voters}
              supportGroups={supportGroups}
              onSelectVoter={(v) => setActiveModalVoter(v)}
              isAuthenticated={isAdminAuthenticated}
              onAuthStateChange={(authed) => setIsAdminAuthenticated(authed)}
            />
          </>
        )}

        {activeTab === 'registration' && (
          <div className="py-8">
            <VoterRegistrationForm
              onVoterRegistered={handleVoterRegistered}
              onGoHome={handleGoHome}
              allVoters={voters}
              onSelectVoter={(v) => setActiveModalVoter(v)}
            />
          </div>
        )}

        {activeTab === 'diaspora' && (
          <div className="py-8">
            <DiasporaRegistrationForm
              onVoterRegistered={handleVoterRegistered}
              onGoHome={handleGoHome}
              allVoters={voters}
              onSelectVoter={(v) => setActiveModalVoter(v)}
            />
          </div>
        )}

        {activeTab === 'donate' && (
          <div className="py-8">
            <DonationPortal onGoHome={handleGoHome} />
          </div>
        )}

        {activeTab === 'supportgroup' && (
          <div className="py-8">
            <SupportGroupRegistrationForm
              onSupportGroupRegistered={handleSupportGroupRegistered}
              onGoHome={handleGoHome}
              allSupportGroups={supportGroups}
            />
          </div>
        )}

        {activeTab === 'focus' && (
          <div className="py-8">
            <CoreFocus onRegisterClick={handleRegisterClick} />
          </div>
        )}

        {activeTab === 'slides' && (
          <div className="py-8">
            <SlidesDeck />
          </div>
        )}

        {activeTab === 'callcentre' && (
          <div className="py-8">
            <CallCentre />
          </div>
        )}

        {activeTab === 'inec' && (
          <div className="py-8">
            <InecDirectory />
          </div>
        )}

        {(activeTab === 'admin' ||
          activeTab.startsWith('admin-') ||
          activeTab === 'database' ||
          activeTab.startsWith('database-')) && (
          <div className="py-8">
            <AdminPortal
              voters={voters}
              supportGroups={supportGroups}
              initialTab={
                activeTab === 'admin-diaspora' || activeTab === 'database-diaspora'
                  ? 'diaspora'
                  : activeTab === 'admin-supportgroup' || activeTab === 'database-supportgroup'
                  ? 'supportgroup'
                  : activeTab === 'admin-roles'
                  ? 'roles'
                  : activeTab === 'admin-profile'
                  ? 'profile'
                  : activeTab === 'admin-password'
                  ? 'password'
                  : activeTab === 'admin-name'
                  ? 'name'
                  : activeTab === 'admin-picture'
                  ? 'picture'
                  : activeTab === 'admin-audit'
                  ? 'audit'
                  : 'individual'
              }
              onSelectVoter={(v) => setActiveModalVoter(v)}
              isAuthenticated={isAdminAuthenticated}
              onAuthStateChange={(authed) => setIsAdminAuthenticated(authed)}
            />
          </div>
        )}
      </main>

      {/* Official Membership Card Modal */}
      <MembershipCardModal
        voter={activeModalVoter}
        onClose={() => setActiveModalVoter(null)}
        onAddNewMember={handleAddNewMember}
        onGoHome={handleGoHome}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        isAdminAuthenticated={isAdminAuthenticated}
      />

    </div>
  );
}
