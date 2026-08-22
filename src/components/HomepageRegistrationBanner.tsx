import React from 'react';
import { Sparkles, ArrowRight, Users, Globe, Building2, Shield, CheckCircle2 } from 'lucide-react';

interface HomepageRegistrationBannerProps {
  onOpenHub: () => void;
  onOpenIndividual: () => void;
  onOpenDiaspora: () => void;
  onOpenSupportGroup: () => void;
  registeredCount?: number;
}

export const HomepageRegistrationBanner: React.FC<HomepageRegistrationBannerProps> = ({
  onOpenHub,
  onOpenIndividual,
  onOpenDiaspora,
  onOpenSupportGroup,
  registeredCount = 125480
}) => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-950 border-2 border-lime-400 p-6 sm:p-10 shadow-2xl shadow-lime-400/10">
        
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Content Area */}
          <div className="space-y-4 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400 text-emerald-950 text-xs font-black uppercase tracking-wider shadow-md animate-pulse">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Official 2027 Grassroots Registration</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ready to Join the Movement?
              <span className="block text-lime-300 font-extrabold text-xl sm:text-3xl mt-1">
                Access the RTIFN Registration Page
              </span>
            </h2>

            <p className="text-xs sm:text-base text-emerald-100 font-medium leading-relaxed">
              Register your support for President Bola Ahmed Tinubu's 2027 mandate. Get your official digital supporter membership card, connect with ward mobilizers, or affiliate your support organization today.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={onOpenIndividual}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-lime-400 hover:text-emerald-950 text-emerald-200 text-xs font-bold border border-emerald-700/80 hover:border-lime-400 transition-all cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-lime-400 group-hover:text-emerald-950" />
                <span>Individual Registration</span>
              </button>
              <button
                onClick={onOpenDiaspora}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-lime-400 hover:text-emerald-950 text-emerald-200 text-xs font-bold border border-emerald-700/80 hover:border-lime-400 transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-lime-400" />
                <span>Diaspora Registration</span>
              </button>
              <button
                onClick={onOpenSupportGroup}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-lime-400 hover:text-emerald-950 text-emerald-200 text-xs font-bold border border-emerald-700/80 hover:border-lime-400 transition-all cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-lime-400" />
                <span>Support Group Coalition</span>
              </button>
            </div>
          </div>

          {/* Right Flashy Action Button Card */}
          <div className="w-full lg:w-auto flex flex-col items-center sm:items-end justify-center shrink-0">
            <div className="relative group">
              {/* Outer Pulsing Aura */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              {/* Main Button */}
              <button
                onClick={onOpenHub}
                className="relative w-full sm:w-auto bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300 hover:from-lime-300 hover:to-emerald-300 text-emerald-950 font-black text-base sm:text-lg py-5 px-8 sm:px-10 rounded-2xl shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer transform group-hover:scale-[1.03] active:scale-95 border-2 border-white/50"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-6 h-6 text-emerald-950 animate-bounce" />
                  <span className="tracking-tight uppercase">RTIFN Registration Page</span>
                  <ArrowRight className="w-6 h-6 text-emerald-950 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[11px] font-bold text-emerald-900 tracking-wide">
                  Individual • Diaspora • Support Group Portals
                </span>
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-emerald-200 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-lime-400" />
              <span>Over <strong>{registeredCount.toLocaleString()}</strong> Supporters Registered</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
