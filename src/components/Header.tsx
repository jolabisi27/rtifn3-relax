import React, { useState, useRef, useEffect } from 'react';
import { Phone, Users, Presentation, Shield, MapPin, Database, Menu, X, CheckCircle2, Globe, Building2, ChevronDown, UserPlus, Key, ShieldCheck, Lock, User, Camera, Settings, Heart } from 'lucide-react';
import logoImg from '../assets/images/rtifn_logo_1786274851065.jpg';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  registeredCount: number;
  isAdminAuthenticated?: boolean;
  onAdminLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  registeredCount,
  isAdminAuthenticated = false,
  onAdminLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registrationDropdownOpen, setRegistrationDropdownOpen] = useState(false);
  const [mobileRegSubmenuOpen, setMobileRegSubmenuOpen] = useState(false);
  const [databaseDropdownOpen, setDatabaseDropdownOpen] = useState(false);
  const [mobileDbSubmenuOpen, setMobileDbSubmenuOpen] = useState(true);

  const registrationDropdownRef = useRef<HTMLDivElement>(null);
  const databaseDropdownRef = useRef<HTMLDivElement>(null);

  interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    highlight?: boolean;
  }

  const registrationSubItems: NavItem[] = [
    { id: 'registration', label: 'Individual Registration', icon: Users, badge: 'Active' },
    { id: 'diaspora', label: 'Diaspora Registration', icon: Globe, badge: 'Global' },
    { id: 'supportgroup', label: 'Support Group Registration', icon: Building2, badge: 'Coalition' },
  ];

  const adminSubItems: NavItem[] = [
    { id: 'admin-individual', label: 'Individual Supporter Database', icon: Users, badge: 'Local' },
    { id: 'admin-diaspora', label: 'Diaspora Supporter Database', icon: Globe, badge: 'Global' },
    { id: 'admin-supportgroup', label: 'Support Group Database', icon: Building2, badge: 'Coalition' },
    { id: 'admin-roles', label: 'User Roles & Privileges Creation', icon: Key, badge: 'Security' },
    { id: 'admin-profile', label: 'Profile Settings & Overview', icon: Settings, badge: 'Profile' },
    { id: 'admin-password', label: 'Change Admin Password', icon: Lock, badge: 'Passcode' },
    { id: 'admin-name', label: 'Change Name & Username', icon: User, badge: 'Identity' },
    { id: 'admin-picture', label: 'Change Profile Picture', icon: Camera, badge: 'Avatar' },
    { id: 'admin-audit', label: 'System Audit & Access Logs', icon: ShieldCheck, badge: 'Logs' },
  ];

  const mainNavItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'donate', label: 'Donate', icon: Heart, badge: 'Paystack' },
    { id: 'focus', label: 'Core Focus', icon: CheckCircle2 },
    { id: 'slides', label: 'Campaign Deck', icon: Presentation, highlight: true },
    { id: 'callcentre', label: 'Call Centre', icon: Phone },
    { id: 'inec', label: 'INEC Centers', icon: MapPin },
  ];

  const isRegistrationActive = registrationSubItems.some(item => item.id === activeTab);
  const isAdminActive = activeTab === 'admin' || activeTab.startsWith('admin-') || activeTab.startsWith('database');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (registrationDropdownRef.current && !registrationDropdownRef.current.contains(event.target as Node)) {
        setRegistrationDropdownOpen(false);
      }
      if (databaseDropdownRef.current && !databaseDropdownRef.current.contains(event.target as Node)) {
        setDatabaseDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setRegistrationDropdownOpen(false);
    setDatabaseDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/60 text-white shadow-xl">
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-lime-950 px-4 py-1.5 text-xs font-medium text-emerald-100 flex justify-between items-center border-b border-emerald-700/40">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            <span>NATIONAL REGISTRATION EXERCISE: <strong className="text-lime-300">1st June 2026 — 30th June 2026</strong></span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="tel:09138886874" className="flex items-center gap-1 text-lime-300 hover:text-white transition-colors">
              <Phone className="w-3 h-3" />
              <span>Call Centre: <strong>09138886874</strong></span>
            </a>
            <span className="hidden md:inline text-emerald-400">|</span>
            <span className="hidden md:inline text-emerald-200">Registered Supporters: <strong className="text-white">{registeredCount.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative w-13 h-13 rounded-full bg-white border-2 border-lime-400 p-0.5 flex items-center justify-center overflow-hidden shadow-lg group">
              <img
                src={logoImg}
                alt="RTIFN Official Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-full group-hover:scale-105 transition-transform"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/assets/images/rtifn_official_logo_1787243702734.jpg';
                }}
              />
              <div className="absolute inset-0 rounded-full border border-lime-400/40 pointer-events-none"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-none">
                  RTIFN
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-lime-400 text-emerald-950 rounded">
                  2027
                </span>
              </div>
              <p className="text-xs font-semibold text-lime-300 tracking-wide mt-0.5">
                Relax Tinubu is Fixing Nigeria
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Home Item */}
            {mainNavItems.slice(0, 1).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-lime-400 text-emerald-950 shadow-md font-bold'
                      : 'text-emerald-100 hover:bg-emerald-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Registration Dropdown Parent Link */}
            <div
              className="relative"
              ref={registrationDropdownRef}
              onMouseEnter={() => setRegistrationDropdownOpen(true)}
              onMouseLeave={() => setRegistrationDropdownOpen(false)}
            >
              <button
                onClick={() => setRegistrationDropdownOpen(!registrationDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isRegistrationActive
                    ? 'bg-lime-400 text-emerald-950 shadow-md font-bold'
                    : 'text-emerald-100 hover:bg-emerald-900 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Registration</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${registrationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {registrationDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-emerald-950 border border-emerald-700/90 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-emerald-800/80 text-[10px] font-extrabold uppercase text-lime-400 tracking-wider">
                    Registration Portals
                  </div>
                  {registrationSubItems.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = activeTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleNavClick(sub.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left font-semibold transition-colors cursor-pointer ${
                          isSubActive
                            ? 'bg-lime-400/20 text-lime-300 font-bold border-l-2 border-lime-400'
                            : 'text-emerald-100 hover:bg-emerald-900/90 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <SubIcon className="w-4 h-4 text-lime-400 shrink-0" />
                          <span>{sub.label}</span>
                        </div>
                        {sub.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-emerald-900 text-lime-300 rounded font-bold border border-lime-500/30">
                            {sub.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Admin End Parent Link / Dropdown */}
            {!isAdminAuthenticated ? (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isAdminActive
                    ? 'bg-lime-400 text-emerald-950 shadow-md font-bold'
                    : 'text-emerald-100 hover:bg-emerald-900 hover:text-white border border-emerald-700/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                <span>Admin End Portal</span>
                <span className="text-[9px] px-1 py-0.2 bg-emerald-900 text-lime-300 rounded font-bold uppercase border border-lime-500/30">
                  Auth
                </span>
              </button>
            ) : (
              <div
                className="relative"
                ref={databaseDropdownRef}
                onMouseEnter={() => setDatabaseDropdownOpen(true)}
                onMouseLeave={() => setDatabaseDropdownOpen(false)}
              >
                <button
                  onClick={() => setDatabaseDropdownOpen(!databaseDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isAdminActive
                      ? 'bg-lime-400 text-emerald-950 shadow-md font-bold'
                      : 'text-emerald-100 hover:bg-emerald-900 hover:text-white border border-emerald-700/60'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                  <span>Admin End</span>
                  <span className="text-[9px] px-1 py-0.2 bg-emerald-900 text-lime-300 rounded font-bold uppercase">
                    Portal
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${databaseDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu when Authenticated */}
                {databaseDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-68 bg-emerald-950 border-2 border-lime-400/80 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 border-b border-emerald-800/80 text-[10px] font-extrabold uppercase text-lime-400 tracking-wider flex items-center justify-between">
                      <span>Admin Central Command</span>
                      <Lock className="w-3 h-3 text-lime-400" />
                    </div>
                    {adminSubItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(sub.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left font-semibold transition-colors cursor-pointer ${
                            isSubActive
                              ? 'bg-lime-400/20 text-lime-300 font-bold border-l-2 border-lime-400'
                              : 'text-emerald-100 hover:bg-emerald-900/90 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <SubIcon className="w-4 h-4 text-lime-400 shrink-0" />
                            <span>{sub.label}</span>
                          </div>
                          {sub.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-emerald-900 text-lime-300 rounded font-bold border border-lime-500/30">
                              {sub.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Remaining Nav Items */}
            {mainNavItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-lime-400 text-emerald-950 shadow-md font-bold'
                      : item.highlight
                      ? 'bg-emerald-800/80 text-lime-200 border border-lime-500/40 hover:bg-emerald-800 hover:text-white'
                      : 'text-emerald-100 hover:bg-emerald-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 bg-emerald-900 text-lime-300 rounded font-bold border border-lime-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('donate')}
              className="bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-lime-300 font-bold text-xs px-3.5 py-2 rounded-lg border border-lime-400/60 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-lime-400 fill-lime-400" />
              <span>Donate</span>
            </button>
            <button
              onClick={() => handleNavClick('registration')}
              className="bg-gradient-to-r from-lime-400 to-emerald-400 text-emerald-950 hover:from-lime-300 hover:to-emerald-300 font-bold text-xs px-3.5 py-2 rounded-lg shadow-md hover:shadow-lime-400/20 transition-all flex items-center gap-1.5 border border-lime-300/50 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Register Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-900 text-emerald-100 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-b border-emerald-800 px-4 pt-2 pb-6 space-y-2">
          {/* Home */}
          {mainNavItems.slice(0, 1).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-lime-400 text-emerald-950 font-bold'
                    : 'text-emerald-100 hover:bg-emerald-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          {/* Mobile Registration Collapsible Accordion */}
          <div className="bg-emerald-900/40 rounded-2xl border border-emerald-800/80 overflow-hidden">
            <button
              onClick={() => setMobileRegSubmenuOpen(!mobileRegSubmenuOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-all ${
                isRegistrationActive
                  ? 'text-lime-300 font-bold bg-emerald-900/80'
                  : 'text-emerald-100 hover:bg-emerald-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserPlus className="w-5 h-5 text-lime-400" />
                <span>Registration</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileRegSubmenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileRegSubmenuOpen && (
              <div className="p-2 space-y-1 bg-emerald-950/60 border-t border-emerald-800/60">
                {registrationSubItems.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = activeTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleNavClick(sub.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isSubActive
                          ? 'bg-lime-400 text-emerald-950 font-bold'
                          : 'text-emerald-100 hover:bg-emerald-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <SubIcon className="w-4 h-4 text-lime-400 shrink-0" />
                        <span>{sub.label}</span>
                      </div>
                      {sub.badge && (
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-900 text-lime-300 rounded font-bold">
                          {sub.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile Admin End Parent Link / Accordion */}
          {!isAdminAuthenticated ? (
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isAdminActive
                  ? 'bg-lime-400 text-emerald-950 font-bold'
                  : 'text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-lime-400" />
                <span>Admin End Portal</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-emerald-900 text-lime-300 rounded font-bold border border-lime-500/30">
                Authentication
              </span>
            </button>
          ) : (
            <div className="bg-emerald-900/40 rounded-2xl border border-emerald-800/80 overflow-hidden">
              <button
                onClick={() => setMobileDbSubmenuOpen(!mobileDbSubmenuOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-all ${
                  isAdminActive
                    ? 'text-lime-300 font-bold bg-emerald-900/80'
                    : 'text-emerald-100 hover:bg-emerald-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-lime-400" />
                  <span>Admin End Portal</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDbSubmenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileDbSubmenuOpen && (
                <div className="p-2 space-y-1 bg-emerald-950/60 border-t border-emerald-800/60">
                  {adminSubItems.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = activeTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleNavClick(sub.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isSubActive
                            ? 'bg-lime-400 text-emerald-950 font-bold'
                            : 'text-emerald-100 hover:bg-emerald-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <SubIcon className="w-4 h-4 text-lime-400 shrink-0" />
                          <span>{sub.label}</span>
                        </div>
                        {sub.badge && (
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-900 text-lime-300 rounded font-bold">
                            {sub.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Remaining Nav Items */}
          {mainNavItems.slice(1).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-lime-400 text-emerald-950 font-bold'
                    : 'text-emerald-100 hover:bg-emerald-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 bg-emerald-900 text-lime-300 rounded font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('registration')}
              className="w-full bg-lime-400 text-emerald-950 font-bold py-3 rounded-xl text-center shadow-lg"
            >
              Join Movement — Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
