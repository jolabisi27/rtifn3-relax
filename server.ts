import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface AccountDetails {
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
}

interface Voter {
  id: string;
  registrationCode: string;
  fullName: string;
  email: string;
  phone: string;
  gender?: 'Male' | 'Female';
  age?: string;
  occupation?: string;
  apcRegistrationNumber?: string;
  accountDetails?: AccountDetails;
  hasSupportGroup?: 'Yes' | 'No';
  supportGroupName?: string;
  likeAboutTinubuAdmin?: string;
  tinubuImproveArea?: string;
  whyJoinRtifn?: string;
  whyAlignWithRtifn?: string;
  geopoliticalZone: string;
  state: string;
  lga: string;
  ward: string;
  pollingUnit?: string;
  pvcStatus: string;
  vin?: string;
  preferredRole: string;
  isDiaspora?: boolean;
  countryOfResidence?: string;
  foreignAddress?: string;
  registeredAt: string;
}

interface SupportGroupRecord {
  id: string;
  registrationCode: string;
  groupName: string;
  acronym?: string;
  cacNumber?: string;
  membershipSize: string;
  category: string;
  coverageScope: string;
  convenerName: string;
  convenerTitle: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  isDiaspora: boolean;
  countryOfResidence?: string;
  geopoliticalZone: string;
  state: string;
  lga: string;
  ward?: string;
  pollingUnit?: string;
  officeAddress?: string;
  accountDetails?: AccountDetails;
  likeAboutTinubuAdmin?: string;
  tinubuImproveArea?: string;
  whyAlignWithRtifn?: string;
  registeredAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  category: string;
  message: string;
  createdAt: string;
}

interface DatabaseSchema {
  voters: Voter[];
  supportGroups: SupportGroupRecord[];
  inquiries: Inquiry[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'database.json');

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

function getDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      return {
        voters: Array.isArray(parsed.voters) ? parsed.voters : INITIAL_VOTERS,
        supportGroups: Array.isArray(parsed.supportGroups) ? parsed.supportGroups : INITIAL_SUPPORT_GROUPS,
        inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : []
      };
    }
  } catch (err) {
    console.error('Error reading database file:', err);
  }

  const initialDb: DatabaseSchema = {
    voters: INITIAL_VOTERS,
    supportGroups: INITIAL_SUPPORT_GROUPS,
    inquiries: []
  };
  saveDatabase(initialDb);
  return initialDb;
}

function saveDatabase(db: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // CORS headers
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (_req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // --- API Endpoints ---
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Relax Tinubu Is Fixing Nigeria API',
      timestamp: new Date().toISOString()
    });
  });

  // GET all registered voters
  app.get('/api/voters', (_req, res) => {
    const db = getDatabase();
    res.json({
      success: true,
      total: db.voters.length,
      data: db.voters
    });
  });

  // POST new voter registration (Appends to database)
  app.post('/api/voters', (req, res) => {
    try {
      const db = getDatabase();
      const voterData = req.body;

      if (!voterData || !voterData.fullName) {
        res.status(400).json({ success: false, error: 'Full name is required' });
        return;
      }

      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const statePrefix = (voterData.state || 'NIG').slice(0, 3).toUpperCase();
      const prefix = voterData.isDiaspora ? `RTIFN-DIASPORA-${statePrefix}` : `RTIFN-2027-${statePrefix}`;

      const newVoter: Voter = {
        id: voterData.id || `voter_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        registrationCode: voterData.registrationCode || `${prefix}-${randomSuffix}`,
        fullName: String(voterData.fullName).trim(),
        email: String(voterData.email || '').trim().toLowerCase(),
        phone: String(voterData.phone || '').trim(),
        gender: voterData.gender || 'Male',
        age: voterData.age ? String(voterData.age) : undefined,
        occupation: voterData.occupation || 'others',
        apcRegistrationNumber: voterData.apcRegistrationNumber ? String(voterData.apcRegistrationNumber).trim() : undefined,
        accountDetails: voterData.accountDetails,
        hasSupportGroup: voterData.hasSupportGroup || 'No',
        supportGroupName: voterData.supportGroupName ? String(voterData.supportGroupName).trim() : undefined,
        likeAboutTinubuAdmin: voterData.likeAboutTinubuAdmin ? String(voterData.likeAboutTinubuAdmin).trim() : undefined,
        tinubuImproveArea: voterData.tinubuImproveArea ? String(voterData.tinubuImproveArea).trim() : undefined,
        whyJoinRtifn: voterData.whyJoinRtifn ? String(voterData.whyJoinRtifn).trim() : undefined,
        geopoliticalZone: voterData.geopoliticalZone || 'South West',
        state: voterData.state || 'Lagos',
        lga: voterData.lga || 'Central LGA',
        ward: voterData.ward || 'Ward 01',
        pollingUnit: voterData.pollingUnit,
        pvcStatus: voterData.pvcStatus || 'Have PVC',
        vin: voterData.vin ? String(voterData.vin).trim() : undefined,
        preferredRole: voterData.preferredRole || 'Supporter',
        isDiaspora: Boolean(voterData.isDiaspora),
        countryOfResidence: voterData.countryOfResidence,
        foreignAddress: voterData.foreignAddress,
        registeredAt: voterData.registeredAt || new Date().toISOString()
      };

      // Prepend to array
      db.voters = [newVoter, ...db.voters];
      saveDatabase(db);

      console.log(`[API] Registered voter: ${newVoter.fullName} (${newVoter.registrationCode}), total: ${db.voters.length}`);

      res.status(201).json({
        success: true,
        message: 'Supporter registration stored successfully in central database',
        voter: newVoter,
        total: db.voters.length
      });
    } catch (err: any) {
      console.error('Error saving voter:', err);
      res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
  });

  // DELETE voter by id
  app.delete('/api/voters/:id', (req, res) => {
    try {
      const db = getDatabase();
      const id = req.params.id;
      db.voters = db.voters.filter(v => v.id !== id);
      saveDatabase(db);
      res.json({ success: true, total: db.voters.length });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET all support groups
  app.get('/api/support-groups', (_req, res) => {
    const db = getDatabase();
    res.json({
      success: true,
      total: db.supportGroups.length,
      data: db.supportGroups
    });
  });

  // POST new support group registration (Appends to database)
  app.post('/api/support-groups', (req, res) => {
    try {
      const db = getDatabase();
      const groupData = req.body;

      if (!groupData || !groupData.groupName || !groupData.convenerName) {
        res.status(400).json({ success: false, error: 'Group name and convener name are required' });
        return;
      }

      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const prefix = groupData.isDiaspora ? 'SG-DIASPORA' : (groupData.state || 'NIG').slice(0, 3).toUpperCase();

      const newGroup: SupportGroupRecord = {
        id: groupData.id || `sg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        registrationCode: groupData.registrationCode || `RTIFN-SG-${prefix}-${randomSuffix}`,
        groupName: String(groupData.groupName).trim(),
        acronym: groupData.acronym ? String(groupData.acronym).trim() : undefined,
        cacNumber: groupData.cacNumber ? String(groupData.cacNumber).trim() : undefined,
        membershipSize: groupData.membershipSize || '500 - 2,000 Members',
        category: groupData.category || 'Grassroots & Community Mobilization',
        coverageScope: groupData.coverageScope || 'State Level',
        convenerName: String(groupData.convenerName).trim(),
        convenerTitle: String(groupData.convenerTitle || 'Coordinator').trim(),
        email: String(groupData.email || '').trim().toLowerCase(),
        phone: String(groupData.phone || '').trim(),
        gender: groupData.gender || 'Male',
        isDiaspora: Boolean(groupData.isDiaspora),
        countryOfResidence: groupData.countryOfResidence,
        geopoliticalZone: groupData.geopoliticalZone || 'South West',
        state: groupData.state || 'Lagos',
        lga: groupData.lga || 'Central LGA',
        ward: groupData.ward,
        pollingUnit: groupData.pollingUnit,
        officeAddress: groupData.officeAddress,
        accountDetails: groupData.accountDetails,
        likeAboutTinubuAdmin: groupData.likeAboutTinubuAdmin,
        tinubuImproveArea: groupData.tinubuImproveArea,
        whyAlignWithRtifn: groupData.whyAlignWithRtifn,
        registeredAt: groupData.registeredAt || new Date().toISOString()
      };

      // Also create a linked voter record for convener
      const linkedVoter: Voter = {
        id: newGroup.id,
        registrationCode: newGroup.registrationCode,
        fullName: newGroup.convenerName,
        email: newGroup.email,
        phone: newGroup.phone,
        gender: newGroup.gender,
        occupation: 'Business',
        geopoliticalZone: newGroup.geopoliticalZone,
        state: newGroup.state,
        lga: newGroup.lga,
        ward: newGroup.ward || 'Central Office',
        pvcStatus: 'Have PVC',
        preferredRole: 'Mobilizer',
        hasSupportGroup: 'Yes',
        supportGroupName: `${newGroup.groupName} (${newGroup.acronym || 'Affiliate'})`,
        isDiaspora: newGroup.isDiaspora,
        countryOfResidence: newGroup.countryOfResidence,
        registeredAt: newGroup.registeredAt
      };

      db.supportGroups = [newGroup, ...db.supportGroups];
      db.voters = [linkedVoter, ...db.voters.filter(v => v.id !== linkedVoter.id)];
      saveDatabase(db);

      console.log(`[API] Registered support group: ${newGroup.groupName}, total: ${db.supportGroups.length}`);

      res.status(201).json({
        success: true,
        message: 'Support group registered and linked successfully',
        group: newGroup,
        total: db.supportGroups.length
      });
    } catch (err: any) {
      console.error('Error saving support group:', err);
      res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
  });

  // POST Call Centre inquiry
  app.post('/api/inquiries', (req, res) => {
    try {
      const db = getDatabase();
      const { name, phone, category, message } = req.body;
      const newInquiry: Inquiry = {
        id: `inq_${Date.now()}`,
        name: String(name || '').trim(),
        phone: String(phone || '').trim(),
        category: category || 'Information & Enquiries',
        message: String(message || '').trim(),
        createdAt: new Date().toISOString()
      };
      db.inquiries = [newInquiry, ...db.inquiries];
      saveDatabase(db);
      res.status(201).json({ success: true, inquiry: newInquiry });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET summary statistics
  app.get('/api/stats', (_req, res) => {
    const db = getDatabase();
    const individual = db.voters.filter(v => !v.isDiaspora).length;
    const diaspora = db.voters.filter(v => v.isDiaspora).length;
    res.json({
      success: true,
      totalSupporters: db.voters.length,
      individualSupporters: individual,
      diasporaSupporters: diaspora,
      totalSupportGroups: db.supportGroups.length,
      totalInquiries: db.inquiries.length
    });
  });

  // --- Vite / Frontend Serving ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const buildPath = path.join(process.cwd(), 'build');
    const staticDir = fs.existsSync(distPath) ? distPath : buildPath;

    app.use(express.static(staticDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(staticDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Relax Tinubu Is Fixing Nigeria Server running on http://localhost:${PORT}`);
  });
}

startServer();
