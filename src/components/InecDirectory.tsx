import React, { useState } from 'react';
import { SAMPLE_INEC_OFFICES, GEOPOLITICAL_ZONES } from '../data/nigeriaData';
import { MapPin, Search, Phone, ExternalLink, ShieldCheck, Info } from 'lucide-react';

export const InecDirectory: React.FC = () => {
  const [selectedState, setSelectedState] = useState('FCT Abuja');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all states
  const allStates = Object.values(GEOPOLITICAL_ZONES).flat();

  const filteredOffices = SAMPLE_INEC_OFFICES.filter((office) => {
    const matchesState = !selectedState || office.state === selectedState;
    const matchesSearch = !searchQuery ||
      office.lga.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <section id="inec" className="py-16 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>INEC Office Locator & PVC Pickup Finder</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Find Your Nearest INEC Office
          </h2>

          <p className="text-xs sm:text-sm text-emerald-200">
            Need to register for a new Permanent Voter Card (PVC), collect your printed PVC, or request a polling unit transfer? Locate your state/LGA center below.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-emerald-900/80 border border-emerald-700/80 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* State Filter */}
          <div className="w-full sm:w-1/2">
            <label className="block text-xs font-bold text-lime-300 uppercase mb-1">
              Select State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
            >
              <option value="">All 36 States & FCT</option>
              {allStates.map((st) => (
                <option key={st} value={st} className="bg-emerald-950 text-white">
                  {st} State
                </option>
              ))}
            </select>
          </div>

          {/* Search Query Input */}
          <div className="w-full sm:w-1/2">
            <label className="block text-xs font-bold text-lime-300 uppercase mb-1">
              Search by LGA or Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Ikeja, Maitama, Bwari..."
                className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-lime-400"
              />
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3.5" />
            </div>
          </div>

        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.length > 0 ? (
            filteredOffices.map((office, idx) => (
              <div key={idx} className="bg-emerald-950 border border-emerald-800 p-6 rounded-2xl space-y-3 hover:border-lime-400/60 transition-colors shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 bg-lime-400 text-emerald-950 rounded">
                    {office.status}
                  </span>
                  <span className="text-xs font-bold text-lime-300">
                    {office.state}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{office.lga} LGA Office</h3>
                  <p className="text-xs text-emerald-200 mt-1 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-800 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center gap-1 text-lime-300 font-bold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{office.phone}</span>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(office.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-lime-400 hover:underline flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-emerald-950 p-8 rounded-2xl border border-emerald-800 text-center space-y-2">
              <Info className="w-8 h-8 text-lime-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Contact RTIFN Call Centre for Local Center Info</h3>
              <p className="text-xs text-emerald-200">
                Call our hotline <strong className="text-lime-300">09138886874</strong> for personalized guidance to the exact INEC Ward Registration center in your LGA.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
