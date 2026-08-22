import React from 'react';
import { Phone, PhoneCall, Headphones, Sparkles, ArrowRight, ShieldCheck, Clock, MessageSquare } from 'lucide-react';

interface HomepageCallCentreBannerProps {
  onOpenCallCentre: () => void;
}

export const HomepageCallCentreBanner: React.FC<HomepageCallCentreBannerProps> = ({
  onOpenCallCentre
}) => {
  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 border-2 border-lime-400/80 p-6 sm:p-8 shadow-2xl shadow-emerald-900/40">
        
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-60 h-60 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Left Column: Icon & Descriptive Info */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 text-left w-full md:w-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-400 text-emerald-950 flex items-center justify-center shrink-0 shadow-xl shadow-lime-400/20 animate-pulse">
              <Headphones className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/40 text-[11px] font-black uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  24/7 Dedicated Support
                </span>
                <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                  Toll-Free Nationwide Line
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                RTIFN National Call Centre & Helpline
              </h3>

              <p className="text-xs sm:text-sm text-emerald-200 font-medium max-w-xl">
                Have questions about voter registration, PVC collection centers, or joining your ward team? Our multilingual support agents are on standby to assist you 24/7.
              </p>
            </div>
          </div>

          {/* Right Column: Flashy Call Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            {/* Direct Telephone Dial Button */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 opacity-80 blur group-hover:opacity-100 transition duration-500 animate-tilt"></div>
              <a
                href="tel:09138886874"
                className="relative bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300 hover:from-lime-300 hover:to-emerald-300 text-emerald-950 font-black text-base sm:text-lg py-4 px-6 sm:px-8 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all transform group-hover:scale-[1.03] active:scale-95 border-2 border-white/60"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-950 text-lime-300 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-emerald-900 block leading-tight">
                    Instant Call Helpline
                  </span>
                  <span className="text-base sm:text-lg font-black tracking-wider">
                    09138886874
                  </span>
                </div>
              </a>
            </div>

            {/* Open Helpdesk Page Button */}
            <button
              onClick={onOpenCallCentre}
              className="bg-emerald-900/90 hover:bg-emerald-800 text-lime-300 hover:text-white font-black text-xs sm:text-sm py-4 px-5 rounded-2xl border border-lime-400/40 hover:border-lime-400 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-lime-400" />
              <span>Open RTIFN Helpdesk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
