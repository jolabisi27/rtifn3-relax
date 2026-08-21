import React, { useState, useEffect } from 'react';
import {
  AdminRole,
  AdminPrivilege,
  AdminUser,
  AdminPrivilegeCategory,
  AdminScopeLevel
} from '../types';
import { AdminProfileData } from './AdminProfileSettings';
import {
  ShieldCheck,
  UserCheck,
  Plus,
  Lock,
  Key,
  Users,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  Info,
  ShieldAlert,
  Search,
  Check,
  Building2,
  Globe,
  Settings,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';

// Default Master Privileges List
export const DEFAULT_PRIVILEGES: AdminPrivilege[] = [
  {
    id: 'p1',
    code: 'VIEW_INDIVIDUAL_DB',
    label: 'View Individual Supporter Database',
    description: 'Access full electorate records of local Nigerian registered voters.',
    category: 'Database Access'
  },
  {
    id: 'p2',
    code: 'VIEW_DIASPORA_DB',
    label: 'View Diaspora Chapter Database',
    description: 'Access international chapters, foreign addresses, and diaspora members.',
    category: 'Database Access'
  },
  {
    id: 'p3',
    code: 'VIEW_SUPPORT_GROUP_DB',
    label: 'View Support Groups Database',
    description: 'Access coalition records, conveners, CAC numbers, and membership sizes.',
    category: 'Database Access'
  },
  {
    id: 'p4',
    code: 'EXPORT_CSV_REPORTS',
    label: 'Export CSV & Excel Data',
    description: 'Download raw CSV spreadsheets for individual, diaspora, and support group databases.',
    category: 'Data Operations'
  },
  {
    id: 'p5',
    code: 'VIEW_BANK_DETAILS',
    label: 'View Bank Account Details',
    description: 'Inspect bank names, account numbers, and account names of registered supporters/groups.',
    category: 'Data Operations'
  },
  {
    id: 'p6',
    code: 'APPROVE_SUPPORT_GROUPS',
    label: 'Approve & Verify Support Groups',
    description: 'Grant verified coalition status and issue official RTIFN affiliation slips.',
    category: 'Data Operations'
  },
  {
    id: 'p7',
    code: 'CREATE_EDIT_ROLES',
    label: 'Create & Modify Roles & Privileges',
    description: 'Configure new administrative roles, set granular permission matrices, and define scopes.',
    category: 'Role & User Security'
  },
  {
    id: 'p8',
    code: 'MANAGE_ADMIN_USERS',
    label: 'Manage & Assign Admin Accounts',
    description: 'Invite new administrative personnel, assign roles, and suspend/reactivate accounts.',
    category: 'Role & User Security'
  },
  {
    id: 'p9',
    code: 'AUDIT_LOGS_VIEW',
    label: 'Access System Audit Trails',
    description: 'Inspect administrative activity, login histories, and data download logs.',
    category: 'System Administration'
  }
];

// Initial Roles
export const INITIAL_ROLES: AdminRole[] = [
  {
    id: 'role_super_admin',
    roleName: 'Super Administrator',
    description: 'Full unrestricted governance access across all RTIFN databases, security rules, and role creations.',
    scopeLevel: 'National',
    privilegeCodes: DEFAULT_PRIVILEGES.map((p) => p.code),
    isSystemDefault: true,
    assignedUsersCount: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'role_national_coord',
    roleName: 'National Mobilization Director',
    description: 'Manages all three supporter databases, CSV exports, and coalition group verifications nationwide.',
    scopeLevel: 'National',
    privilegeCodes: [
      'VIEW_INDIVIDUAL_DB',
      'VIEW_DIASPORA_DB',
      'VIEW_SUPPORT_GROUP_DB',
      'EXPORT_CSV_REPORTS',
      'VIEW_BANK_DETAILS',
      'APPROVE_SUPPORT_GROUPS'
    ],
    isSystemDefault: true,
    assignedUsersCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'role_zonal_admin',
    roleName: 'Zonal Operations Coordinator',
    description: 'Oversees supporters and support group structures within an assigned Geopolitical Zone.',
    scopeLevel: 'Zonal',
    privilegeCodes: [
      'VIEW_INDIVIDUAL_DB',
      'VIEW_SUPPORT_GROUP_DB',
      'EXPORT_CSV_REPORTS',
      'APPROVE_SUPPORT_GROUPS'
    ],
    isSystemDefault: true,
    assignedUsersCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'role_diaspora_director',
    roleName: 'Global Diaspora Officer',
    description: 'Dedicated administration for foreign chapters, international diaspora chapters, and foreign support groups.',
    scopeLevel: 'Global Diaspora',
    privilegeCodes: [
      'VIEW_DIASPORA_DB',
      'VIEW_SUPPORT_GROUP_DB',
      'EXPORT_CSV_REPORTS'
    ],
    isSystemDefault: true,
    assignedUsersCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'role_auditor',
    roleName: 'Read-Only Auditor & Observer',
    description: 'Read-only statistical inspection and CSV report generation for campaign strategy reviews.',
    scopeLevel: 'National',
    privilegeCodes: [
      'VIEW_INDIVIDUAL_DB',
      'VIEW_DIASPORA_DB',
      'VIEW_SUPPORT_GROUP_DB',
      'EXPORT_CSV_REPORTS'
    ],
    isSystemDefault: true,
    assignedUsersCount: 0,
    createdAt: new Date().toISOString()
  }
];

// Initial Admin Personnel - Only Dr. Olabisi Olabode
export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr_1',
    fullName: 'Dr. Olabisi Olabode',
    username: 'dr_olabode',
    email: 'admin.olabode@rtifn.org',
    phone: '08039988776',
    roleId: 'role_super_admin',
    roleName: 'Super Administrator',
    assignedZone: 'National HQ',
    status: 'Active',
    lastLogin: 'Just now',
    createdAt: '2026-05-10'
  }
];

interface AdminRolesManagementProps {
  roles?: AdminRole[];
  onSaveRole?: (role: AdminRole) => void;
  users?: AdminUser[];
  onAddUser?: (user: AdminUser) => void;
  currentUser?: AdminProfileData;
}

export const AdminRolesManagement: React.FC<AdminRolesManagementProps> = ({
  onAddUser,
  currentUser
}) => {
  // Initialize Roles from localStorage if available
  const [rolesList, setRolesList] = useState<AdminRole[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('rtifn_admin_roles') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error parsing stored admin roles', e);
    }
    return INITIAL_ROLES;
  });

  // Initialize Admin Users from localStorage if available (filter out deprecated test accounts)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('rtifn_admin_users') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter(
            (u: AdminUser) =>
              !['usr_2', 'usr_3', 'usr_4'].includes(u.id) &&
              !['u_garba', 'nkechi_okoro', 'funmi_adeyemi'].includes(u.username?.toLowerCase() || '')
          );
          if (filtered.length > 0) return filtered;
        }
      }
    } catch (e) {
      console.error('Error parsing stored admin users', e);
    }
    return INITIAL_ADMIN_USERS;
  });

  // Determine if the current authenticated user has Super Administrator authority
  const isSuperAdmin = Boolean(
    currentUser?.roleName?.toLowerCase().includes('super administrator') ||
    currentUser?.roleName === 'Super Administrator' ||
    currentUser?.username === 'drolabode_admin' ||
    currentUser?.username === 'dr_olabode' ||
    currentUser?.email === 'olabisiolabode@gmail.com' ||
    currentUser?.email === 'admin.olabode@rtifn.org' ||
    adminUsers.some(
      (u) =>
        ((u.username && currentUser?.username && u.username.toLowerCase() === currentUser.username.toLowerCase()) ||
         (u.email && currentUser?.email && u.email.toLowerCase() === currentUser.email.toLowerCase())) &&
        (u.roleId === 'role_super_admin' || u.roleName === 'Super Administrator')
    )
  );

  // Sync state changes with localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('rtifn_admin_roles', JSON.stringify(rolesList));
      }
    } catch (e) {
      // Storage limit or blocked
    }
  }, [rolesList]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('rtifn_admin_users', JSON.stringify(adminUsers));
      }
    } catch (e) {
      // Storage limit or blocked
    }
  }, [adminUsers]);

  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'matrix'>('roles');
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<AdminRole | null>(null);

  // Edit Role State (For Super Admin Editing)
  const [editingRole, setEditingRole] = useState<AdminRole | null>(null);
  const [editRoleName, setEditRoleName] = useState('');
  const [editRoleDescription, setEditRoleDescription] = useState('');
  const [editRoleScope, setEditRoleScope] = useState<AdminScopeLevel>('National');
  const [editRolePrivileges, setEditRolePrivileges] = useState<string[]>([]);

  // Edit Admin User State (For Super Admin Editing User Role & Privileges)
  const [editingAdminUser, setEditingAdminUser] = useState<AdminUser | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserUsername, setEditUserUsername] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserPhone, setEditUserPhone] = useState('');
  const [editUserRoleId, setEditUserRoleId] = useState('');
  const [editUserZone, setEditUserZone] = useState('');
  const [editUserStatus, setEditUserStatus] = useState<'Active' | 'Suspended' | 'Pending Approval'>('Active');
  const [editUserPrivileges, setEditUserPrivileges] = useState<string[]>([]);
  const [editUserPassword, setEditUserPassword] = useState('');
  const [showPasswordInEdit, setShowPasswordInEdit] = useState(false);

  // New Role Form State
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [newRoleScope, setNewRoleScope] = useState<AdminScopeLevel>('National');
  const [newRolePrivileges, setNewRolePrivileges] = useState<string[]>([
    'VIEW_INDIVIDUAL_DB',
    'VIEW_DIASPORA_DB',
    'VIEW_SUPPORT_GROUP_DB'
  ]);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRoleId, setNewUserRoleId] = useState<string>(rolesList[0]?.id || INITIAL_ROLES[0].id);
  const [newUserZone, setNewUserZone] = useState('National HQ');

  // Search User State
  const [userSearchQuery, setUserSearchQuery] = useState('');

  // Handle Toggle Privilege checkbox in Create Role
  const togglePrivilegeCode = (code: string) => {
    if (newRolePrivileges.includes(code)) {
      setNewRolePrivileges((prev) => prev.filter((c) => c !== code));
    } else {
      setNewRolePrivileges((prev) => [...prev, code]);
    }
  };

  // Handle Create Role Submit
  const handleCreateRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators can create new administrative roles.');
      return;
    }
    if (!newRoleName.trim()) {
      alert('Please enter a Role Name.');
      return;
    }
    if (newRolePrivileges.length === 0) {
      alert('Please select at least one privilege for this role.');
      return;
    }

    const createdRole: AdminRole = {
      id: `role_${Date.now()}`,
      roleName: newRoleName.trim(),
      description: newRoleDescription.trim() || 'Custom administrative role.',
      scopeLevel: newRoleScope,
      privilegeCodes: newRolePrivileges,
      isSystemDefault: false,
      assignedUsersCount: 0,
      createdAt: new Date().toISOString()
    };

    setRolesList((prev) => [createdRole, ...prev]);
    setShowCreateRoleModal(false);

    // Reset Form
    setNewRoleName('');
    setNewRoleDescription('');
    setNewRoleScope('National');
    setNewRolePrivileges(['VIEW_INDIVIDUAL_DB', 'VIEW_DIASPORA_DB', 'VIEW_SUPPORT_GROUP_DB']);

    alert(`Success: Admin Role "${createdRole.roleName}" created successfully!`);
  };

  // Handle Create User Submit
  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators can create or register new admin accounts.');
      return;
    }
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPhone.trim()) {
      alert('Please fill in all required user contact details.');
      return;
    }

    const targetRole = rolesList.find((r) => r.id === newUserRoleId) || rolesList[0];

    const createdUser: AdminUser = {
      id: `usr_${Date.now()}`,
      fullName: newUserName.trim(),
      username: newUserUsername.trim() || (newUserEmail.includes('@') ? newUserEmail.trim().split('@')[0] : 'admin'),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim(),
      roleId: targetRole.id,
      roleName: targetRole.roleName,
      assignedZone: newUserZone,
      status: 'Active',
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [createdUser, ...adminUsers];
    setAdminUsers(updatedUsers);

    // Also notify external listener if available
    if (onAddUser) {
      onAddUser(createdUser);
    }

    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserUsername('');
    setNewUserEmail('');
    setNewUserPhone('');

    // Switch tab to admin users directory so the user immediately sees the created user!
    setActiveTab('users');
    alert(`Success: Admin User "${createdUser.fullName}" created and stored in Admin Directory under role "${createdUser.roleName}"!`);
  };

  // --- EDIT ROLE HANDLERS ---
  const openEditRoleModal = (role: AdminRole) => {
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators have authority to edit roles and configure privileges.');
      return;
    }
    setEditingRole(role);
    setEditRoleName(role.roleName);
    setEditRoleDescription(role.description);
    setEditRoleScope(role.scopeLevel);
    setEditRolePrivileges([...role.privilegeCodes]);
  };

  const toggleEditRolePrivilege = (code: string) => {
    if (editRolePrivileges.includes(code)) {
      setEditRolePrivileges((prev) => prev.filter((c) => c !== code));
    } else {
      setEditRolePrivileges((prev) => [...prev, code]);
    }
  };

  const handleUpdateRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators can modify roles and privileges.');
      return;
    }
    if (!editingRole) return;
    if (!editRoleName.trim()) {
      alert('Please enter a Role Title.');
      return;
    }
    if (editRolePrivileges.length === 0) {
      alert('Please select at least one privilege for this role.');
      return;
    }

    const updatedRoles = rolesList.map((r) => {
      if (r.id === editingRole.id) {
        return {
          ...r,
          roleName: editRoleName.trim(),
          description: editRoleDescription.trim(),
          scopeLevel: editRoleScope,
          privilegeCodes: editRolePrivileges
        };
      }
      return r;
    });

    setRolesList(updatedRoles);

    // Synchronize roleName on assigned admin users
    setAdminUsers((prev) =>
      prev.map((u) => (u.roleId === editingRole.id ? { ...u, roleName: editRoleName.trim() } : u))
    );

    setEditingRole(null);
    alert(`Success: Role "${editRoleName}" and associated privileges updated successfully!`);
  };

  const handleDeleteRole = (roleId: string, roleName: string) => {
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators are authorized to delete roles.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the role "${roleName}"?`)) {
      setRolesList((prev) => prev.filter((r) => r.id !== roleId));
      alert(`Role "${roleName}" has been removed.`);
    }
  };

  // --- EDIT ADMIN USER HANDLERS ---
  const openEditAdminUserModal = (usr: AdminUser) => {
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators can edit admin accounts, modify user privileges, or reset passwords.');
      return;
    }
    setEditingAdminUser(usr);
    setEditUserName(usr.fullName);
    setEditUserUsername(usr.username || (usr.email.includes('@') ? usr.email.split('@')[0] : 'admin'));
    setEditUserEmail(usr.email);
    setEditUserPhone(usr.phone);
    setEditUserRoleId(usr.roleId);
    setEditUserZone(usr.assignedZone || 'National HQ');
    setEditUserStatus(usr.status);
    setEditUserPassword(usr.password || 'RTIFN2027#Pass');
    setShowPasswordInEdit(false);

    const assignedRole = rolesList.find((r) => r.id === usr.roleId);
    if (usr.customPrivileges && usr.customPrivileges.length > 0) {
      setEditUserPrivileges([...usr.customPrivileges]);
    } else {
      setEditUserPrivileges(assignedRole ? [...assignedRole.privilegeCodes] : DEFAULT_PRIVILEGES.map(p => p.code));
    }
  };

  const handleRoleChangeInUserEdit = (newRoleId: string) => {
    setEditUserRoleId(newRoleId);
    const targetRole = rolesList.find((r) => r.id === newRoleId);
    if (targetRole) {
      setEditUserPrivileges([...targetRole.privilegeCodes]);
    }
  };

  const toggleUserPrivilegeInEdit = (code: string) => {
    if (editUserPrivileges.includes(code)) {
      setEditUserPrivileges((prev) => prev.filter((c) => c !== code));
    } else {
      setEditUserPrivileges((prev) => [...prev, code]);
    }
  };

  const handleUpdateAdminUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators can update admin accounts, roles, or passwords.');
      return;
    }
    if (!editingAdminUser) return;
    if (!editUserName.trim() || !editUserEmail.trim() || !editUserPhone.trim()) {
      alert('Please fill in all required contact details.');
      return;
    }

    const targetRole = rolesList.find((r) => r.id === editUserRoleId) || rolesList[0];

    const updatedUsers = adminUsers.map((u) => {
      if (u.id === editingAdminUser.id) {
        return {
          ...u,
          fullName: editUserName.trim(),
          username: editUserUsername.trim() || u.username || editUserEmail.trim().split('@')[0],
          email: editUserEmail.trim(),
          phone: editUserPhone.trim(),
          roleId: targetRole.id,
          roleName: targetRole.roleName,
          assignedZone: editUserZone.trim() || 'National HQ',
          status: editUserStatus,
          customPrivileges: editUserPrivileges,
          password: editUserPassword.trim() || u.password || 'RTIFN2027#Pass'
        };
      }
      return u;
    });

    setAdminUsers(updatedUsers);

    // Sync active session profile if editing active logged in user
    try {
      const activeSaved = localStorage.getItem('rtifn_admin_profile');
      if (activeSaved) {
        const activeProf = JSON.parse(activeSaved);
        if (
          activeProf.username?.toLowerCase() === editingAdminUser.username?.toLowerCase() ||
          activeProf.email?.toLowerCase() === editingAdminUser.email?.toLowerCase() ||
          activeProf.fullName?.toLowerCase() === editingAdminUser.fullName?.toLowerCase()
        ) {
          const updatedActiveProf = {
            ...activeProf,
            fullName: editUserName.trim(),
            username: editUserUsername.trim() || activeProf.username,
            email: editUserEmail.trim(),
            phone: editUserPhone.trim(),
            roleName: targetRole.roleName,
            assignedZone: editUserZone.trim() || activeProf.assignedZone
          };
          localStorage.setItem('rtifn_admin_profile', JSON.stringify(updatedActiveProf));
        }
      }
    } catch (e) {
      console.error('Error syncing active profile', e);
    }

    setEditingAdminUser(null);
    alert(`Success: Admin user "${editUserName}" (@${editUserUsername.trim()}) profile, role, jurisdiction, and privileges updated!`);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators can delete admin accounts.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete admin personnel "${userName}" from the directory?`)) {
      setAdminUsers((prev) => prev.filter((u) => u.id !== userId));
      alert(`Admin personnel "${userName}" removed.`);
    }
  };

  // Toggle user status
  const toggleUserStatus = (userId: string) => {
    if (!isSuperAdmin) {
      alert('Access Denied: Only Super Administrators can suspend or activate admin accounts.');
      return;
    }
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const categories: AdminPrivilegeCategory[] = [
    'Database Access',
    'Data Operations',
    'Role & User Security',
    'System Administration'
  ];

  const filteredUsers = adminUsers.filter(
    (u) =>
      u.fullName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      (u.username && u.username.toLowerCase().includes(userSearchQuery.toLowerCase())) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.roleName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.phone.includes(userSearchQuery) ||
      (u.assignedZone && u.assignedZone.toLowerCase().includes(userSearchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-green-950 border border-emerald-700/80 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 text-xs font-bold uppercase tracking-wider mb-2 border border-lime-400/40">
            <Key className="w-3.5 h-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            User Roles & Privileges Management
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
            Configure administrative permissions, assign geopolitical scopes, and manage credentials for RTIFN campaign personnel, zonal officers, and database auditors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isSuperAdmin ? (
            <>
              <button
                onClick={() => setShowCreateRoleModal(true)}
                className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Role</span>
              </button>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="bg-emerald-800 hover:bg-emerald-700 text-lime-300 font-bold text-xs py-3 px-4 rounded-xl border border-emerald-600 flex items-center gap-2 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Assign Admin Personnel</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 bg-emerald-900/60 border border-emerald-700 px-3.5 py-2.5 rounded-xl text-emerald-300 text-xs">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Role Creation & Personnel Management Restricted to Super Admin</span>
            </div>
          )}
        </div>
      </div>

      {/* Security Context Banner */}
      {!isSuperAdmin ? (
        <div className="bg-amber-950/70 border-2 border-amber-500/80 p-4 rounded-2xl flex items-start gap-3.5 text-amber-100 shadow-xl">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-black text-xs sm:text-sm text-amber-300 uppercase tracking-wider">
                Restricted RBAC View — Read-Only Mode
              </span>
              <span className="px-2 py-0.5 bg-amber-900/80 text-amber-200 rounded text-[10px] font-bold border border-amber-700">
                Logged in: {currentUser?.fullName || 'User'} ({currentUser?.roleName || 'Officer'})
              </span>
            </div>
            <p className="text-xs text-amber-200 leading-relaxed">
              You are currently viewing roles and privileges in <strong>Read-Only Mode</strong>. Creating/editing roles, modifying privilege matrices, creating new personnel accounts, changing passwords, and deleting accounts are strictly restricted to <strong>Super Administrators</strong>.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-900/50 border border-lime-400/60 p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-emerald-100 shadow-lg">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
            <div>
              <span className="text-xs font-black text-lime-300">Super Administrator Authorization Active</span>
              <span className="text-[11px] text-emerald-200 block">
                Logged in as <strong>{currentUser?.fullName || 'Super Admin'}</strong> (@{currentUser?.username || 'admin'}). You have full authority to create/edit roles, assign privileges, create personnel accounts, change passwords, and manage users.
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-lime-400 text-emerald-950 text-[10px] font-black uppercase rounded-lg shrink-0 shadow">
            Super Admin Rights
          </span>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-emerald-800 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('roles')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'roles'
              ? 'border-lime-400 text-lime-300 font-extrabold'
              : 'border-transparent text-emerald-300 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Configured Roles ({rolesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'border-lime-400 text-lime-300 font-extrabold'
              : 'border-transparent text-emerald-300 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Admin Users Directory ({adminUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'matrix'
              ? 'border-lime-400 text-lime-300 font-extrabold'
              : 'border-transparent text-emerald-300 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Permissions & Privileges Matrix ({DEFAULT_PRIVILEGES.length})</span>
        </button>
      </div>

      {/* --- TAB 1: CONFIGURED ROLES CARDS --- */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rolesList.map((role) => {
              const privCount = role.privilegeCodes.length;
              const isSuper = role.roleName.toLowerCase().includes('super administrator');
              const assignedCount = adminUsers.filter((u) => u.roleId === role.id).length;

              return (
                <div
                  key={role.id}
                  className="bg-emerald-950 border border-emerald-800 hover:border-emerald-600 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 bg-emerald-900 text-lime-300 text-[10px] font-bold rounded border border-emerald-700 uppercase tracking-wider inline-block mb-1">
                          {role.scopeLevel} Scope
                        </span>
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          {role.roleName}
                          {isSuper && <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />}
                        </h4>
                      </div>
                      {role.isSystemDefault ? (
                        <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded font-mono shrink-0">
                          System Default
                        </span>
                      ) : (
                        <span className="text-[10px] bg-lime-400/20 text-lime-300 px-2 py-0.5 rounded font-bold shrink-0">
                          Custom
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-emerald-200 line-clamp-3 leading-relaxed">
                      {role.description}
                    </p>

                    <div className="pt-2 border-t border-emerald-900/80 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-emerald-900/40 p-2 rounded-lg border border-emerald-800">
                        <span className="text-[10px] text-emerald-400 block font-bold">Privileges</span>
                        <span className="font-bold text-white text-sm">{privCount} / {DEFAULT_PRIVILEGES.length} Granted</span>
                      </div>
                      <div className="bg-emerald-900/40 p-2 rounded-lg border border-emerald-800">
                        <span className="text-[10px] text-emerald-400 block font-bold">Assigned Users</span>
                        <span className="font-bold text-lime-300 text-sm">{assignedCount} Personnel</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isSuperAdmin ? (
                        <button
                          onClick={() => openEditRoleModal(role)}
                          className="px-2.5 py-1 bg-lime-400/20 hover:bg-lime-400 hover:text-emerald-950 text-lime-300 font-bold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-lime-400/40"
                          title="Super Admin: Edit Role Name & Privileges"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Role</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-400/80 bg-emerald-900/60 px-2 py-1 rounded flex items-center gap-1 border border-emerald-800 font-mono">
                          <Lock className="w-3 h-3 text-amber-400" /> Read Only
                        </span>
                      )}

                      <button
                        onClick={() => setSelectedRoleForDetail(role)}
                        className="text-xs text-emerald-300 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                        title="View Privilege Matrix"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </div>

                    {isSuperAdmin && !role.isSystemDefault && (
                      <button
                        onClick={() => handleDeleteRole(role.id, role.roleName)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-950/60 transition-all cursor-pointer"
                        title="Delete Role"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAB 2: ADMIN USERS DIRECTORY --- */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-emerald-900/80 border border-emerald-700/80 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                placeholder="Search admin user by name, email, phone or role..."
                className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-lime-400"
              />
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
            </div>

            {isSuperAdmin && (
              <button
                onClick={() => setShowAddUserModal(true)}
                className="w-full sm:w-auto bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Add New Admin Account</span>
              </button>
            )}
          </div>

          <div className="bg-emerald-950 border border-emerald-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-emerald-100">
                <thead className="bg-emerald-900/90 text-lime-300 font-bold uppercase tracking-wider border-b border-emerald-800">
                  <tr>
                    <th className="py-4 px-4">Admin Name</th>
                    <th className="py-4 px-4">Contact Info</th>
                    <th className="py-4 px-4">Assigned Role & Privileges</th>
                    <th className="py-4 px-4">Geopolitical Jurisdiction</th>
                    <th className="py-4 px-4">Account Status</th>
                    <th className="py-4 px-4">Last Activity</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/60">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((usr) => {
                      const hasCustomPrivs = usr.customPrivileges && usr.customPrivileges.length > 0;
                      const privCount = hasCustomPrivs ? usr.customPrivileges!.length : (rolesList.find(r => r.id === usr.roleId)?.privilegeCodes.length || 0);

                      return (
                        <tr key={usr.id} className="hover:bg-emerald-900/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-extrabold text-white">{usr.fullName}</div>
                            <div className="text-[11px] text-lime-300 font-mono font-semibold">@{usr.username || usr.email.split('@')[0]}</div>
                            <div className="text-[10px] text-emerald-400 font-mono">ID: {usr.id}</div>
                          </td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="text-white font-mono">{usr.email}</div>
                            <div className="text-[10px] text-emerald-300">{usr.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 space-y-1">
                            <span className="px-2 py-0.5 bg-emerald-900 text-lime-300 rounded font-bold border border-emerald-700 inline-block">
                              {usr.roleName}
                            </span>
                            <div className="text-[10px] text-emerald-300 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-lime-400 shrink-0" />
                              <span>{privCount} privileges {hasCustomPrivs ? '(Custom Overrides)' : ''}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-white font-medium">
                            {usr.assignedZone || 'National HQ'}
                          </td>
                          <td className="py-3.5 px-4">
                            {usr.status === 'Active' ? (
                              <span className="px-2 py-0.5 bg-emerald-800 text-lime-300 rounded text-[10px] font-bold inline-flex items-center gap-1 border border-lime-400/40">
                                <CheckCircle2 className="w-3 h-3 text-lime-400" /> Active
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded text-[10px] font-bold inline-flex items-center gap-1 border border-rose-800">
                                <XCircle className="w-3 h-3 text-rose-400" /> Suspended
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-emerald-300 font-mono text-[11px]">
                            {usr.lastLogin || 'N/A'}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {isSuperAdmin ? (
                                <>
                                  <button
                                    onClick={() => openEditAdminUserModal(usr)}
                                    className="px-2.5 py-1.5 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-black rounded-lg text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow"
                                    title="Super Admin: Edit Admin Role, Privileges & Password"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>Edit User & Password</span>
                                  </button>

                                  <button
                                    onClick={() => toggleUserStatus(usr.id)}
                                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                      usr.status === 'Active'
                                        ? 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700'
                                        : 'bg-emerald-800 hover:bg-emerald-700 text-lime-300'
                                    }`}
                                  >
                                    {usr.status === 'Active' ? 'Suspend' : 'Reactivate'}
                                  </button>

                                  <button
                                    onClick={() => handleDeleteUser(usr.id, usr.fullName)}
                                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 rounded transition-all cursor-pointer"
                                    title="Delete Admin Account"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <span className="px-2.5 py-1 bg-emerald-900 text-emerald-300 rounded text-[10px] font-mono flex items-center gap-1 border border-emerald-800">
                                  <Lock className="w-3 h-3 text-amber-400" /> Protected (Super Admin)
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-emerald-300">
                        No admin personnel matched your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: PRIVILEGES MATRIX --- */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 space-y-6">
            <div className="border-b border-emerald-800 pb-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-lime-400" />
                <span>System Security & Privileges Definitions</span>
              </h4>
              <p className="text-xs text-emerald-200 mt-1">
                Comprehensive dictionary of granular capabilities that can be assigned to administrative roles across RTIFN 2027 databases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => {
                const categoryPrivs = DEFAULT_PRIVILEGES.filter((p) => p.category === cat);
                return (
                  <div key={cat} className="bg-emerald-900/50 border border-emerald-800 p-5 rounded-xl space-y-3">
                    <h5 className="text-xs font-black uppercase text-lime-400 tracking-wider border-b border-emerald-800 pb-2">
                      {cat} ({categoryPrivs.length})
                    </h5>

                    <div className="space-y-2.5">
                      {categoryPrivs.map((priv) => (
                        <div key={priv.id} className="bg-emerald-950/80 p-3 rounded-lg border border-emerald-800/80 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs">{priv.label}</span>
                            <span className="font-mono text-[9px] bg-emerald-900 text-lime-300 px-1.5 py-0.5 rounded font-bold">
                              {priv.code}
                            </span>
                          </div>
                          <p className="text-[11px] text-emerald-300 leading-snug">
                            {priv.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE ROLE --- */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-emerald-950 border-2 border-lime-400/80 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-lime-400" />
                <h3 className="text-xl font-black text-white">Create New Administrative Role</h3>
              </div>
              <button
                onClick={() => setShowCreateRoleModal(false)}
                className="text-emerald-400 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRoleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Role Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Zonal Field Verification Lead"
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Governance Scope Level
                </label>
                <select
                  value={newRoleScope}
                  onChange={(e) => setNewRoleScope(e.target.value as AdminScopeLevel)}
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="National">National HQ Scope (All 36 States & FCT)</option>
                  <option value="Zonal">Zonal Scope (Specific Geopolitical Zone)</option>
                  <option value="State">State Scope (Single State Operations)</option>
                  <option value="LGA">LGA / Ward Field Level</option>
                  <option value="Global Diaspora">Global Diaspora Chapters</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Description / Purpose
                </label>
                <textarea
                  rows={2}
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  placeholder="Briefly describe what personnel in this role will oversee..."
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                ></textarea>
              </div>

              {/* Privilege Selection Grid */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-lime-300">
                  Assign Granular Privileges ({newRolePrivileges.length} Selected)
                </label>
                <div className="bg-emerald-900/60 border border-emerald-800 rounded-xl p-4 max-h-64 overflow-y-auto space-y-3">
                  {DEFAULT_PRIVILEGES.map((priv) => {
                    const isChecked = newRolePrivileges.includes(priv.code);
                    return (
                      <label
                        key={priv.id}
                        onClick={() => togglePrivilegeCode(priv.code)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-800/90 border-lime-400 text-white'
                            : 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:border-emerald-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by container
                          className="mt-0.5 accent-lime-400"
                        />
                        <div>
                          <div className="font-bold text-xs flex items-center gap-2">
                            <span>{priv.label}</span>
                            <span className="text-[9px] px-1 bg-emerald-950 text-lime-300 font-mono rounded">
                              {priv.category}
                            </span>
                          </div>
                          <p className="text-[10px] text-emerald-200 mt-0.5">{priv.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateRoleModal(false)}
                  className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-black rounded-xl shadow-lg cursor-pointer"
                >
                  Save & Publish Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: EDIT ROLE (SUPER ADMIN) --- */}
      {editingRole && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-emerald-950 border-2 border-lime-400/80 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-6 h-6 text-lime-400" />
                <h3 className="text-xl font-black text-white">Edit Role: {editingRole.roleName}</h3>
              </div>
              <button
                onClick={() => setEditingRole(null)}
                className="text-emerald-400 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateRoleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Role Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editRoleName}
                  onChange={(e) => setEditRoleName(e.target.value)}
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Governance Scope Level
                </label>
                <select
                  value={editRoleScope}
                  onChange={(e) => setEditRoleScope(e.target.value as AdminScopeLevel)}
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="National">National HQ Scope (All 36 States & FCT)</option>
                  <option value="Zonal">Zonal Scope (Specific Geopolitical Zone)</option>
                  <option value="State">State Scope (Single State Operations)</option>
                  <option value="LGA">LGA / Ward Field Level</option>
                  <option value="Global Diaspora">Global Diaspora Chapters</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Description / Purpose
                </label>
                <textarea
                  rows={2}
                  value={editRoleDescription}
                  onChange={(e) => setEditRoleDescription(e.target.value)}
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400"
                ></textarea>
              </div>

              {/* Privilege Selection Grid */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-lime-300">
                  Update Role Privileges ({editRolePrivileges.length} Selected)
                </label>
                <div className="bg-emerald-900/60 border border-emerald-800 rounded-xl p-4 max-h-64 overflow-y-auto space-y-3">
                  {DEFAULT_PRIVILEGES.map((priv) => {
                    const isChecked = editRolePrivileges.includes(priv.code);
                    return (
                      <label
                        key={priv.id}
                        onClick={() => toggleEditRolePrivilege(priv.code)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-800/90 border-lime-400 text-white'
                            : 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:border-emerald-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by container
                          className="mt-0.5 accent-lime-400"
                        />
                        <div>
                          <div className="font-bold text-xs flex items-center gap-2">
                            <span>{priv.label}</span>
                            <span className="text-[9px] px-1 bg-emerald-950 text-lime-300 font-mono rounded">
                              {priv.category}
                            </span>
                          </div>
                          <p className="text-[10px] text-emerald-200 mt-0.5">{priv.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingRole(null)}
                  className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-black rounded-xl shadow-lg cursor-pointer"
                >
                  Update Role & Permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: EDIT INDIVIDUAL ADMIN USER ROLE & PRIVILEGES (SUPER ADMIN) --- */}
      {editingAdminUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-emerald-950 border-2 border-lime-400/80 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-lime-400" />
                <div>
                  <h3 className="text-xl font-black text-white">Super Admin: Edit Admin Account & Privileges</h3>
                  <p className="text-xs text-emerald-300">Modifying role, jurisdiction, and individual privilege overrides for {editingAdminUser.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingAdminUser(null)}
                className="text-emerald-400 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateAdminUserSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editUserName}
                    onChange={(e) => setEditUserName(e.target.value)}
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-lime-300 mb-1">
                    Admin Username <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editUserUsername}
                    onChange={(e) => setEditUserUsername(e.target.value)}
                    placeholder="e.g. dr_olabode"
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editUserEmail}
                    onChange={(e) => setEditUserEmail(e.target.value)}
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    WhatsApp / Phone <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editUserPhone}
                    onChange={(e) => setEditUserPhone(e.target.value)}
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={editUserRoleId}
                    onChange={(e) => handleRoleChangeInUserEdit(e.target.value)}
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                  >
                    {rolesList.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.roleName} ({r.scopeLevel} Scope)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Account Status
                  </label>
                  <select
                    value={editUserStatus}
                    onChange={(e) => setEditUserStatus(e.target.value as any)}
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Pending Approval">Pending Approval</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Geopolitical Jurisdiction
                </label>
                <input
                  type="text"
                  value={editUserZone}
                  onChange={(e) => setEditUserZone(e.target.value)}
                  placeholder="e.g. South East / National HQ"
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              {/* Super Admin: Change User Password Section */}
              <div className="pt-2 border-t border-emerald-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-lime-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-lime-400" />
                    Change Admin User Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const generated = 'RTIFN' + Math.floor(1000 + Math.random() * 9000) + '!';
                      setEditUserPassword(generated);
                      setShowPasswordInEdit(true);
                    }}
                    className="text-[11px] text-lime-300 hover:text-white font-mono cursor-pointer flex items-center gap-1 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700"
                  >
                    <RefreshCw className="w-3 h-3 text-lime-400" />
                    <span>Auto-Generate Password</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPasswordInEdit ? 'text' : 'password'}
                    value={editUserPassword}
                    onChange={(e) => setEditUserPassword(e.target.value)}
                    placeholder="Enter new password for this admin..."
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl py-2.5 pl-3 pr-10 text-xs text-white font-mono focus:outline-none focus:border-lime-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordInEdit(!showPasswordInEdit)}
                    className="absolute right-3 top-2.5 text-emerald-400 hover:text-lime-300 cursor-pointer"
                    title={showPasswordInEdit ? 'Hide Password' : 'Show Password'}
                  >
                    {showPasswordInEdit ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-emerald-300 leading-snug">
                  <ShieldCheck className="w-3 h-3 inline text-lime-400 mr-1" />
                  Super Admin Privilege: Updating this password will directly change this user's login password for the RTIFN Admin Portal.
                </p>
              </div>

              {/* Individual Privilege Overrides */}
              <div className="space-y-2 pt-2 border-t border-emerald-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-lime-300">
                    Individual Privilege Overrides ({editUserPrivileges.length} Active Privileges)
                  </label>
                  <span className="text-[10px] text-emerald-400">
                    Customize permissions specifically for {editUserName}
                  </span>
                </div>

                <div className="bg-emerald-900/60 border border-emerald-800 rounded-xl p-4 max-h-60 overflow-y-auto space-y-3">
                  {DEFAULT_PRIVILEGES.map((priv) => {
                    const isChecked = editUserPrivileges.includes(priv.code);
                    return (
                      <label
                        key={priv.id}
                        onClick={() => toggleUserPrivilegeInEdit(priv.code)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-800/90 border-lime-400 text-white'
                            : 'bg-emerald-950/80 border-emerald-800 text-emerald-300 hover:border-emerald-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by container
                          className="mt-0.5 accent-lime-400"
                        />
                        <div>
                          <div className="font-bold text-xs flex items-center gap-2">
                            <span>{priv.label}</span>
                            <span className="text-[9px] px-1 bg-emerald-950 text-lime-300 font-mono rounded">
                              {priv.category}
                            </span>
                          </div>
                          <p className="text-[10px] text-emerald-200 mt-0.5">{priv.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingAdminUser(null)}
                  className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-black rounded-xl shadow-lg cursor-pointer"
                >
                  Save Admin Role & Privileges
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD ADMIN USER --- */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-emerald-950 border-2 border-lime-400/80 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-lime-400" />
                <h3 className="text-xl font-black text-white">Add New Admin Personnel</h3>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-emerald-400 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. Alhaji Babatunde Bello"
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-lime-300 mb-1">
                    Admin Username <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserUsername}
                    onChange={(e) => setNewUserUsername(e.target.value)}
                    placeholder="e.g. babatunde_bello"
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white font-mono placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="bello@rtifn.org"
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    WhatsApp / Phone <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="08031234567"
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Assign Administrative Role
                </label>
                <select
                  value={newUserRoleId}
                  onChange={(e) => setNewUserRoleId(e.target.value)}
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  {rolesList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.roleName} ({r.scopeLevel} Scope)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">
                  Assigned Geopolitical Zone / Jurisdiction
                </label>
                <input
                  type="text"
                  value={newUserZone}
                  onChange={(e) => setNewUserZone(e.target.value)}
                  placeholder="e.g. South West / National HQ"
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="pt-4 border-t border-emerald-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-emerald-950 text-xs font-black rounded-xl shadow-lg cursor-pointer"
                >
                  Create & Issue Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ROLE PRIVILEGE DETAIL INSPECTION --- */}
      {selectedRoleForDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-emerald-950 border-2 border-lime-400/80 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-lime-400 bg-emerald-900 px-2 py-0.5 rounded border border-emerald-700">
                  {selectedRoleForDetail.scopeLevel} Scope
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {selectedRoleForDetail.roleName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRoleForDetail(null)}
                className="text-emerald-400 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-emerald-200 leading-relaxed">
                {selectedRoleForDetail.description}
              </p>

              <div>
                <h5 className="text-xs font-extrabold uppercase text-lime-300 tracking-wider mb-3">
                  Granted Privileges ({selectedRoleForDetail.privilegeCodes.length})
                </h5>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedRoleForDetail.privilegeCodes.map((code) => {
                    const privObj = DEFAULT_PRIVILEGES.find((p) => p.code === code);
                    return (
                      <div key={code} className="bg-emerald-900/60 p-3 rounded-lg border border-emerald-800 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-white">
                            {privObj ? privObj.label : code}
                          </div>
                          <div className="text-[10px] text-emerald-300">
                            {privObj ? privObj.description : 'Standard system permission granted.'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-800 flex justify-end">
              <button
                onClick={() => setSelectedRoleForDetail(null)}
                className="px-5 py-2 bg-lime-400 text-emerald-950 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
