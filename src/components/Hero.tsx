import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Presentation, Phone, Users, Calendar, Award, CheckCircle } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
  onSlidesClick: () => void;
  registeredCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onSlidesClick, registeredCount }) => {
  // Countdown to National Registration Exercise (June 1, 2026)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-06-01T00:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden py-12 lg:py-20 border-b border-emerald-800">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-lime-400/40 text-lime-300 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
              <span>Official 2027 Grassroots Mobilization Portal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              RELAX TINUBU IS FIXING NIGERIA
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-300 to-yellow-300 text-2xl sm:text-4xl lg:text-5xl mt-2 font-extrabold">
                RTIFN Individual Registration Platform
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Empowering a better future through progressive leadership, unity, and grassroots mobilization across all states and geopolitical zones in Nigeria.
            </p>

            {/* Quote Box */}
            <div className="bg-emerald-900/90 border-l-4 border-lime-400 p-4 rounded-r-xl text-left shadow-lg">
              <p className="italic text-xs sm:text-sm text-lime-100 font-medium">
                &quot;Leadership is not about the next election, it&apos;s about the next generation. We are building the foundations for a prosperous tomorrow.&quot;
              </p>
              <p className="text-[11px] font-bold text-lime-300 mt-1 uppercase tracking-wider">
                — President Bola Ahmed Tinubu
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500 text-emerald-950 font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl hover:shadow-lime-400/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer border border-lime-200"
              >
                <Users className="w-5 h-5" />
                <span>Register Support — I&apos;m In!</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onSlidesClick}
                className="w-full sm:w-auto bg-emerald-900/90 hover:bg-emerald-800 text-lime-200 font-bold text-sm px-6 py-4 rounded-xl border border-lime-400/40 hover:border-lime-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Presentation className="w-5 h-5 text-lime-300" />
                <span>Campaign Presentation Slides</span>
              </button>
            </div>

            {/* Phone & Directorates affiliations */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-200 border-t border-emerald-800/80">
              <div className="flex items-center gap-2 bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-700">
                <Phone className="w-4 h-4 text-lime-400" />
                <span>RTIFN Call Centre: <strong className="text-lime-300 font-bold">09138886874</strong></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <Award className="w-4 h-4 text-lime-400" />
                <span>Powered by National Directorate Contact & Mobilization (TSG, Solution Marshall, APC)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Graphic Card & Exercise Banner */}
          <div className="lg:col-span-5 space-y-6">

            {/* National Registration Exercise Card */}
            <div className="bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-900 border-2 border-lime-400/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-lime-400 text-emerald-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                EXERCISE TIMETABLE
              </div>

              <div className="text-center space-y-3 pt-1">
                <div className="inline-flex p-3 bg-emerald-800/80 rounded-full text-lime-300 mb-1 border border-lime-400/30">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white tracking-wide uppercase">
                  NATIONAL REGISTRATION EXERCISE
                </h3>
                <div className="bg-lime-400 text-emerald-950 font-black text-lg py-2 px-4 rounded-xl shadow-md tracking-wider">
                  1st JUNE 2026 — 30th JUNE 2026
                </div>

                {/* Countdown Timer Grid */}
                <div className="pt-2">
                  <p className="text-xs font-semibold text-emerald-200 mb-2 uppercase tracking-widest">
                    COUNTDOWN TO REGISTRATION DRIVE
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-emerald-950/80 border border-emerald-700/60 p-2 rounded-lg">
                      <span className="text-xl font-bold text-lime-300 leading-none block">{timeLeft.days}</span>
                      <span className="text-[10px] text-emerald-300 uppercase">Days</span>
                    </div>
                    <div className="bg-emerald-950/80 border border-emerald-700/60 p-2 rounded-lg">
                      <span className="text-xl font-bold text-lime-300 leading-none block">{timeLeft.hours}</span>
                      <span className="text-[10px] text-emerald-300 uppercase">Hours</span>
                    </div>
                    <div className="bg-emerald-950/80 border border-emerald-700/60 p-2 rounded-lg">
                      <span className="text-xl font-bold text-lime-300 leading-none block">{timeLeft.minutes}</span>
                      <span className="text-[10px] text-emerald-300 uppercase">Mins</span>
                    </div>
                    <div className="bg-emerald-950/80 border border-emerald-700/60 p-2 rounded-lg">
                      <span className="text-xl font-bold text-lime-300 leading-none block">{timeLeft.seconds}</span>
                      <span className="text-[10px] text-emerald-300 uppercase">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <div className="pt-3 space-y-2 text-left text-xs text-emerald-100 border-t border-emerald-800/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>Be Part of the Movement — Register Your Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>Build a Better Nigeria Together</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
                    <span>Unity, Support, and Progressive Democratic Development</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Campaign Visual Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-700/80 shadow-xl group">
              <img
                src="/assets/images/rtifn_rally_1786274866514.jpg"
                alt="RTIFN Campaign Rally"
                referrerPolicy="no-referrer"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent flex items-end p-4">
                <p className="text-xs font-semibold text-white drop-shadow">
                  Grassroots rally and voter engagement across Nigeria&apos;s 6 Geopolitical Zones.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Quick Bottom Stat Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-emerald-900/60 border border-emerald-700/80 rounded-2xl p-6 backdrop-blur-sm">
          <div className="text-center border-r border-emerald-800/80 last:border-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-lime-300 block">6</span>
            <span className="text-xs text-emerald-200 font-medium uppercase">Geopolitical Zones</span>
          </div>
          <div className="text-center border-r border-emerald-800/80 last:border-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-lime-300 block">36 + FCT</span>
            <span className="text-xs text-emerald-200 font-medium uppercase">States Covered</span>
          </div>
          <div className="text-center border-r border-emerald-800/80 last:border-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-lime-300 block">774</span>
            <span className="text-xs text-emerald-200 font-medium uppercase">Local Govt Areas</span>
          </div>
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-lime-300 block">{(registeredCount + 125480).toLocaleString()}</span>
            <span className="text-xs text-emerald-200 font-medium uppercase">Registered Supporters</span>
          </div>
        </div>

      </div>
    </section>
  );
};
