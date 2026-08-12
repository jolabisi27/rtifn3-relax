export type GeopoliticalZone =
  | 'North West'
  | 'North East'
  | 'North Central'
  | 'South West'
  | 'South East'
  | 'South South';

export type PvcStatus =
  | 'Have PVC'
  | 'Awaiting PVC / Registered'
  | 'Needs New PVC Registration';

export type PreferredRole =
  | 'Supporter'
  | 'Mobilizer'
  | 'Ward Coordinator'
  | 'Polling Unit Agent'
  | 'Volunteer';

export type Gender = 'Male' | 'Female';
export type Occupation = 'Business' | 'Student' | 'Traders' | 'Farmer' | 'others';

export interface AccountDetails {
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
}

export interface SupportGroupRecord {
  id: string;
  registrationCode: string;
  groupName: string;
  acronym?: string;
  cacNumber?: string;
  membershipSize: string;
  category: string; // e.g. Youth Wing, Women Mobilization, Professional, Grassroots, Farmers, etc.
  coverageScope: string; // National, Zonal, State, LGA, Ward, Diaspora
  
  // Convener / Coordinator Info
  convenerName: string;
  convenerTitle: string;
  email: string;
  phone: string; // WhatsApp No
  gender?: Gender;
  
  // Location
  isDiaspora?: boolean;
  countryOfResidence?: string;
  geopoliticalZone: GeopoliticalZone;
  state: string;
  lga: string;
  ward?: string;
  pollingUnit?: string;
  officeAddress?: string;

  // Account
  accountDetails?: AccountDetails;

  // Alignment
  likeAboutTinubuAdmin?: string;
  tinubuImproveArea?: string;
  whyAlignWithRtifn?: string;

  registeredAt: string;
}

export interface Voter {
  id: string;
  registrationCode: string;
  fullName: string;
  email: string;
  phone: string; // WhatsApp No
  gender?: Gender;
  age?: number | string;
  occupation?: Occupation | string;
  apcRegistrationNumber?: string;
  accountDetails?: AccountDetails;
  hasSupportGroup?: 'Yes' | 'No';
  supportGroupName?: string;
  isDiaspora?: boolean;
  countryOfResidence?: string;
  foreignAddress?: string;
  likeAboutTinubuAdmin?: string;
  tinubuImproveArea?: string;
  whyJoinRtifn?: string;
  geopoliticalZone: GeopoliticalZone;
  state: string;
  lga: string;
  ward?: string;
  pollingUnit?: string;
  pvcStatus: PvcStatus;
  vin?: string;
  preferredRole: PreferredRole;
  registeredAt: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  keyPoints: string[];
  quote?: string;
  quoteAuthor?: string;
  stats?: { label: string; value: string; detail?: string }[];
  accentColor?: string;
}

export interface InecOffice {
  state: string;
  lga: string;
  address: string;
  phone: string;
  status: 'Active' | 'Mobile Registration Center' | 'Main Office';
}

export interface SupportInquiry {
  id: string;
  name: string;
  email?: string;
  phone: string;
  category: 'Information & Enquiries' | 'PVC Guidance' | 'Registration Support' | 'Feedback & Complaints' | 'INEC Locations' | 'Partnership';
  message: string;
  createdAt: string;
  status: 'Pending' | 'Resolved';
}

export interface CoreFocusArea {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
  impactMetric: string;
}

// --- ADMIN END & ROLES / PRIVILEGES TYPES ---

export type AdminPrivilegeCategory =
  | 'Database Access'
  | 'Data Operations'
  | 'Role & User Security'
  | 'System Administration';

export interface AdminPrivilege {
  id: string;
  code: string;
  label: string;
  description: string;
  category: AdminPrivilegeCategory;
}

export type AdminScopeLevel = 'National' | 'Zonal' | 'State' | 'LGA' | 'Global Diaspora';

export interface AdminRole {
  id: string;
  roleName: string;
  description: string;
  scopeLevel: AdminScopeLevel;
  privilegeCodes: string[];
  isSystemDefault?: boolean;
  assignedUsersCount?: number;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: string;
  roleName: string;
  assignedZone?: string;
  assignedState?: string;
  status: 'Active' | 'Suspended' | 'Pending Approval';
  customPrivileges?: string[];
  password?: string;
  username?: string;
  lastLogin?: string;
  createdAt: string;
}

