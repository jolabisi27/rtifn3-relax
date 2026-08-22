import React from 'react';
import { Users, Globe, Building2, ArrowRight, Shield, CheckCircle, Sparkles, Phone, FileCheck, MapPin, Award } from 'lucide-react';

interface RTIFNRegistrationPageProps {
  onNavigate: (tab: string) => void;
  registeredCount?: number;
}

export const RTIFNRegistrationPage: React.FC<RTIFNRegistrationPageProps> = ({
  onNavigate,
  registeredCount = 125480
}) => {
  return (
    <div className="py-8 sm:py-12 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/40 text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>Official 2027 Grassroots Mobilization Portals</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            RTIFN Registration Page
          </h1>

          <p className="text-base sm:text-lg text-emerald-100 font-medium leading-relaxed">
            Welcome to the centralized registration portal for <strong className="text-lime-300">Relax Tinubu Is Fixing Nigeria (RTIFN)</strong>. 
            Select your category below to register your support, connect with ward leaders, or affiliate your organization.
          </p>

          {/* Quick Counter Banner */}
          <div className="inline-flex items-center gap-3 bg-emerald-900/90 border border-emerald-700/80 px-5 py-2.5 rounded-2xl shadow-md text-xs sm:text-sm font-semibold text-emerald-200">
            <Shield className="w-4 h-4 text-lime-400" />
            <span>Over <strong className="text-white font-black">{registeredCount.toLocaleString()}+</strong> Registered Patriots & Mobilizers Nationwide</span>
          </div>
        </div>

        {/* 3 Registration Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
          
          {/* Card 1: Individual Registration */}
          <div className="relative group bg-emerald-950/90 border-2 border-lime-400/60 hover:border-lime-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-lime-400/20 hover:-translate-y-1">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="bg-lime-400 text-emerald-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
                36 States & FCT
              </span>
            </div>

            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-500 text-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-lime-300 uppercase tracking-wider block">Portal 01</span>
                <h2 className="text-2xl font-black text-white mt-1">
                  Individual Registration
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200 mt-2.5 leading-relaxed">
                  For individual citizens resident in Nigeria. Capture your State, LGA, Ward, Polling Unit, and generate your official digital supporter card.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-emerald-800/80">
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Instant RTIFN Supporter ID Card</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Ward & Polling Unit Agent Network</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Continuous Voter & PVC Guidance</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-800/80">
              <button
                onClick={() => onNavigate('registration')}
                className="w-full bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 hover:from-lime-300 hover:to-emerald-300 text-emerald-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl hover:shadow-lime-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Individual Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Diaspora Registration */}
          <div className="relative group bg-emerald-950/90 border-2 border-emerald-600 hover:border-lime-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-lime-400/20 hover:-translate-y-1">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="bg-emerald-500 text-emerald-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Global Network
              </span>
            </div>

            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-lime-400 text-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-lime-300 uppercase tracking-wider block">Portal 02</span>
                <h2 className="text-2xl font-black text-white mt-1">
                  Diaspora Registration
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200 mt-2.5 leading-relaxed">
                  For patriotic Nigerians living in the UK, USA, Canada, Europe, Middle East, and globally. Connect with your home state & diaspora directorates.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-emerald-800/80">
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>International Chapter Membership</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Diaspora Supporter Card with Country Tag</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Direct Link to Home State Directorates</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-800/80">
              <button
                onClick={() => onNavigate('diaspora')}
                className="w-full bg-emerald-800 hover:bg-lime-400 text-lime-300 hover:text-emerald-950 font-black text-sm py-4 px-6 rounded-2xl border border-lime-400/40 hover:border-lime-400 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Diaspora Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Support Group Registration */}
          <div className="relative group bg-emerald-950/90 border-2 border-emerald-600 hover:border-lime-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-lime-400/20 hover:-translate-y-1">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="bg-yellow-400 text-emerald-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Coalition Groups
              </span>
            </div>

            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-emerald-400 text-emerald-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-lime-300 uppercase tracking-wider block">Portal 03</span>
                <h2 className="text-2xl font-black text-white mt-1">
                  Support Group Registration
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200 mt-2.5 leading-relaxed">
                  For grassroots associations, professional bodies, youth movements, women groups, and political coalitions aligning with the RTIFN mandate.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-emerald-800/80">
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Official RTIFN Coalition Registry Code</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Zonal & State Leadership Recognition</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Access to Campaign Material & Logistics</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-800/80">
              <button
                onClick={() => onNavigate('supportgroup')}
                className="w-full bg-emerald-800 hover:bg-lime-400 text-lime-300 hover:text-emerald-950 font-black text-sm py-4 px-6 rounded-2xl border border-lime-400/40 hover:border-lime-400 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Support Group Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Help & Call Centre Desk */}
        <div className="bg-gradient-to-r from-emerald-900/90 via-emerald-850 to-emerald-900/90 border-2 border-emerald-700/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-lime-400 text-emerald-950 flex items-center justify-center shrink-0 shadow-md">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Need Assistance With Your Registration?</h3>
              <p className="text-xs sm:text-sm text-emerald-200">
                Our national helpline agents are available 24/7 to assist with PVC transfers, Ward registration, and group onboarding.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:09138886874"
              className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-black text-sm py-3 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: 09138886874</span>
            </a>
            <button
              onClick={() => onNavigate('callcentre')}
              className="bg-emerald-950 hover:bg-emerald-800 text-lime-300 font-bold text-xs py-3 px-5 rounded-xl border border-lime-400/40 transition-all cursor-pointer"
            >
              Open Helpdesk
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
