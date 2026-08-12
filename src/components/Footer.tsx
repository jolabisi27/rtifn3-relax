import React from 'react';
import { Shield, Phone, Mail, MapPin, Globe, Award, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  isAdminAuthenticated?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, isAdminAuthenticated = false }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-white border-t-2 border-lime-400/80 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

          {/* Col 1: Brand Info & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/rtifn_logo_1786274851065.jpg"
                alt="RTIFN Emblem"
                className="w-12 h-12 rounded-full border-2 border-lime-400 object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  RTIFN: Relax Tinubu is Fixing Nigeria
                </h3>
                <p className="text-xs text-lime-300 font-bold">
                  Official 2027 Electorate Mobilization Platform
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-200 leading-relaxed max-w-md">
              Empowering a better future through progressive leadership, unity, and grassroots mobilization across all states and geopolitical zones in Nigeria.
            </p>

            <div className="pt-2 text-xs text-emerald-300 space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-lime-400" />
                <span>Powered by: <strong>National Directorate Contact and Mobilization</strong></span>
              </div>
              <p className="text-[11px] text-emerald-400 pl-6">
                In synergy with TSG, Solution Marshall, and APC Grassroots Directorates.
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-lime-300 uppercase tracking-wider border-b border-emerald-800 pb-2">
              Campaign Navigation
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <button onClick={() => { setActiveTab('donate'); scrollToTop(); }} className="hover:text-lime-300 transition-colors font-black text-lime-400">
                   Donate / Campaign Support Fund (Paystack / Cards / PayPal)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-lime-300 transition-colors">
                  Campaign Overview & Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('registration')} className="hover:text-lime-300 transition-colors font-bold text-white">
                  Relax Individual Registration App
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('diaspora')} className="hover:text-lime-300 transition-colors font-bold text-lime-300">
                  Diaspora Registration Form
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('supportgroup')} className="hover:text-lime-300 transition-colors font-bold text-lime-400">
                  Support Group Registration Form
                </button>
              </li>
              {!isAdminAuthenticated ? (
                <li>
                  <button onClick={() => { setActiveTab('admin'); scrollToTop(); }} className="hover:text-lime-300 transition-colors font-bold text-lime-400">
                    Admin End Portal (Authentication)
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button onClick={() => { setActiveTab('admin-individual'); scrollToTop(); }} className="hover:text-lime-300 transition-colors">
                      Admin: Individual Supporter Database
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('admin-diaspora'); scrollToTop(); }} className="hover:text-lime-300 transition-colors">
                      Admin: Diaspora Supporter Database
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('admin-supportgroup'); scrollToTop(); }} className="hover:text-lime-300 transition-colors">
                      Admin: Support Group Database
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('admin-roles'); scrollToTop(); }} className="hover:text-lime-300 transition-colors font-bold text-lime-300">
                      Admin: Creation of User Roles & Privileges
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('admin-profile'); scrollToTop(); }} className="hover:text-lime-300 transition-colors">
                      Admin: Profile Settings Overview
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('admin-password'); scrollToTop(); }} className="hover:text-lime-300 transition-colors">
                      Admin: Change Password / Passcode
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('admin-name'); scrollToTop(); }} className="hover:text-lime-300 transition-colors">
                      Admin: Change Name & Username
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('admin-picture'); scrollToTop(); }} className="hover:text-lime-300 transition-colors">
                      Admin: Change Profile Picture
                    </button>
                  </li>
                </>
              )}
              <li>
                <button onClick={() => setActiveTab('focus')} className="hover:text-lime-300 transition-colors">
                  Our Core Strategic Focus
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('slides')} className="hover:text-lime-300 transition-colors text-lime-200 font-semibold">
                  Campaign Presentation Slides Deck
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('callcentre')} className="hover:text-lime-300 transition-colors">
                  RTIFN Call Centre (09138886874)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('inec')} className="hover:text-lime-300 transition-colors">
                  INEC Office Locator & PVC Help
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Us */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-lime-300 uppercase tracking-wider border-b border-emerald-800 pb-2">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>RTIFN HQ, FCT, Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lime-400 shrink-0" />
                <span>+234 (0) 800 000 0000 / <strong className="text-lime-300">09138886874</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lime-400 shrink-0" />
                <a href="mailto:info@rtifnregistration.com" className="hover:text-lime-300 transition-colors">
                  info@rtifnregistration.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-lime-400 shrink-0" />
                <span>www.rtifnigeria.org | @relaxtinubu_isfixingnigeria</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400">
          <p>© 2026 - 2027 Relax Tinubu is Fixing Nigeria (RTIFN). All Rights Reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="p-2 bg-emerald-900 hover:bg-emerald-800 text-lime-300 rounded-lg flex items-center gap-1 transition-colors border border-emerald-700"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
