import React, { useState } from 'react';
import { CORE_FOCUS_AREAS } from '../data/nigeriaData';
import { CoreFocusArea } from '../types';
import { TrendingUp, ShieldCheck, Users, Award, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

interface CoreFocusProps {
  onRegisterClick: () => void;
}

export const CoreFocus: React.FC<CoreFocusProps> = ({ onRegisterClick }) => {
  const [selectedPillar, setSelectedPillar] = useState<CoreFocusArea>(CORE_FOCUS_AREAS[0]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-lime-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-lime-400" />;
      case 'Users': return <Users className="w-8 h-8 text-lime-400" />;
      case 'Award': default: return <Award className="w-8 h-8 text-lime-400" />;
    }
  };

  return (
    <section id="focus" className="py-20 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white relative border-y border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Strategic Pillars of Renewal</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Core Focus
          </h2>

          <p className="text-base text-emerald-100 font-normal leading-relaxed">
            RTIFN drives grassroots organization anchored on President Bola Ahmed Tinubu&apos;s transformative national agenda for sustainable growth, security, and empowerment.
          </p>
        </div>

        {/* Featured Quote Highlight Banner */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 border-2 border-lime-400/80 rounded-3xl p-8 shadow-2xl mb-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <p className="text-xl sm:text-2xl font-black text-lime-300 italic leading-snug">
              &quot;Leadership is not about the next election, it&apos;s about the next generation. We are building the foundations for a prosperous tomorrow.&quot;
            </p>
            <div className="inline-block bg-lime-400 text-emerald-950 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest shadow">
              PRESIDENT BOLA AHMED TINUBU
            </div>
          </div>
        </div>

        {/* 4 Core Focus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CORE_FOCUS_AREAS.map((area) => {
            const isSelected = selectedPillar.id === area.id;
            return (
              <div
                key={area.id}
                onClick={() => setSelectedPillar(area)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-emerald-900 border-lime-400 shadow-2xl scale-[1.02]'
                    : 'bg-emerald-950/80 border-emerald-800 hover:border-emerald-700 hover:bg-emerald-900/60'
                }`}
              >
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-950 rounded-xl w-fit border border-emerald-800 shadow-md">
                    {getIcon(area.iconName)}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-lime-400 uppercase tracking-widest block mb-1">
                      {area.impactMetric}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors leading-snug">
                      {area.title}
                    </h3>
                  </div>

                  <p className="text-xs text-emerald-200 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-emerald-800/80 flex items-center justify-between text-xs font-bold text-lime-300">
                  <span>Explore Initiatives</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Pillar Detailed View */}
        <div className="bg-emerald-900/90 border-2 border-lime-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-950 rounded-xl border border-lime-400/40">
                  {getIcon(selectedPillar.iconName)}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-lime-300 uppercase">ACTIVE STRATEGIC PILLAR</span>
                  <h3 className="text-2xl font-black text-white">{selectedPillar.title}</h3>
                </div>
              </div>

              <p className="text-sm text-emerald-100 leading-relaxed font-medium">
                {selectedPillar.description}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-lime-300 uppercase tracking-wider mb-3">
                  Key Strategic Action Items:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedPillar.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-emerald-950/80 p-3 rounded-xl border border-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-emerald-100 font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-emerald-950 p-6 rounded-2xl border border-emerald-800 text-center space-y-4">
              <span className="text-xs font-bold text-emerald-300 uppercase block">Impact Reach</span>
              <span className="text-3xl font-black text-lime-300 block">{selectedPillar.impactMetric}</span>
              <p className="text-xs text-emerald-200">
                Join our grassroots ward teams in delivering these transformative goals.
              </p>
              <button
                onClick={onRegisterClick}
                className="w-full bg-lime-400 hover:bg-lime-300 text-emerald-950 font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Register Support Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
