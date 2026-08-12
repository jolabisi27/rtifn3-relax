import React, { useState } from 'react';
import { SupportInquiry } from '../types';
import {
  Phone, Headset, MapPin, HelpCircle, MessageSquare, Handshake, CheckCircle2,
  Send, Sparkles, Clock, ShieldCheck, Check
} from 'lucide-react';

export const CallCentre: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<SupportInquiry['category']>('Information & Enquiries');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
    }, 2000);
  };

  const services = [
    {
      title: 'Information & Enquiries',
      description: 'Comprehensive answers regarding President Tinubu’s socio-economic policies & 2027 vision.',
      icon: HelpCircle
    },
    {
      title: 'PVC Registration Guidance',
      description: 'Step-by-step assistance for new voter card registration, transfers, and replacement of lost cards.',
      icon: CheckCircle2
    },
    {
      title: 'Registration Support',
      description: 'Technical and operational help with registering on the Relax Voters Registration App.',
      icon: Headset
    },
    {
      title: 'Feedback & Complaints',
      description: 'Direct channel for grassroots supporters to submit feedback to campaign leadership.',
      icon: MessageSquare
    },
    {
      title: 'INEC Office Locations',
      description: 'Instant directions to nearest INEC registration centers across all 774 LGAs in Nigeria.',
      icon: MapPin
    },
    {
      title: 'Partnership & Collaboration',
      description: 'Engaging civil society organizations, student unions, and community leaders for strategic synergy.',
      icon: Handshake
    }
  ];

  return (
    <section id="callcentre" className="py-16 bg-emerald-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/30 text-xs font-bold uppercase tracking-wider">
            <Headset className="w-4 h-4" />
            <span>RTIFN Grassroots Help Desk</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white">
            RTIFN Call Centre
          </h2>

          <p className="text-base text-emerald-100 font-normal">
            Here to Serve. Here to Support. Here for You. We are just a call away!
          </p>
        </div>

        {/* Big Yellow Call Banner */}
        <div className="bg-gradient-to-r from-lime-400 via-yellow-400 to-lime-500 rounded-3xl p-6 sm:p-10 text-emerald-950 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-lime-300">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest bg-emerald-950 text-lime-300 px-3 py-1 rounded-full inline-block">
              TOLL-FREE HELPLINE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              CALL US NOW & REGISTER YOUR SUPPORT
            </h3>
            <p className="text-sm font-bold text-emerald-900">
              Multilingual Support: English, Hausa, Yoruba, Pidgin, and Igbo.
            </p>
          </div>

          <a
            href="tel:09138886874"
            className="bg-emerald-950 hover:bg-emerald-900 text-lime-300 font-black text-2xl sm:text-4xl py-4 px-8 rounded-2xl shadow-xl flex items-center gap-4 transition-transform hover:scale-105 active:scale-95 border-2 border-lime-400"
          >
            <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-lime-400 animate-bounce" />
            <span>09138886874</span>
          </a>
        </div>

        {/* Call Centre Graphic + Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Call Centre Representative Graphic & Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-lime-400/80 shadow-2xl group">
              <img
                src="/assets/images/call_centre_rep_1786274881061.jpg"
                alt="RTIFN Call Centre Support"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent flex flex-col justify-end p-6 space-y-1">
                <span className="text-xs font-bold text-lime-300 uppercase tracking-widest">
                  RTIFN CALL CENTRE TEAM
                </span>
                <p className="text-sm font-extrabold text-white">
                  Friendly support agents ready to guide your PVC registration & ward mobilization.
                </p>
              </div>
            </div>

            {/* Badges strip */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
                <span>Reliable Service</span>
              </div>
              <div className="bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80 flex items-center gap-2">
                <Headset className="w-5 h-5 text-lime-400 shrink-0" />
                <span>Friendly Support</span>
              </div>
              <div className="bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80 flex items-center gap-2">
                <Clock className="w-5 h-5 text-lime-400 shrink-0" />
                <span>Available To Help</span>
              </div>
              <div className="bg-emerald-900/80 p-3 rounded-xl border border-emerald-700/80 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lime-400 shrink-0" />
                <span>Fixing Nigeria</span>
              </div>
            </div>
          </div>

          {/* Right Column: Services Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="bg-emerald-900/80 border border-emerald-800 p-5 rounded-2xl hover:border-lime-400/60 transition-colors space-y-2">
                  <div className="p-2.5 bg-emerald-950 rounded-xl w-fit border border-lime-400/30">
                    <Icon className="w-6 h-6 text-lime-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                  <p className="text-xs text-emerald-200 leading-relaxed">{srv.description}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Send Direct Inquiry Form */}
        <div className="max-w-3xl mx-auto bg-emerald-900/90 border border-emerald-700 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-xl font-black text-white">Have a Question or Need PVC Assistance?</h3>
            <p className="text-xs text-emerald-200">
              Submit your inquiry online and an RTIFN representative will reach back out immediately.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-lime-400/20 border border-lime-400 rounded-2xl text-center space-y-2">
              <Check className="w-8 h-8 text-lime-300 mx-auto" />
              <h4 className="text-base font-bold text-lime-300">Message Received!</h4>
              <p className="text-xs text-emerald-100">
                Thank you for contacting the RTIFN Call Centre. A mobilization officer will reach out via phone/email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-lime-300 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="080..."
                    className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase mb-1">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SupportInquiry['category'])}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-lime-400 cursor-pointer"
                >
                  <option value="Information & Enquiries">Information & Enquiries</option>
                  <option value="PVC Guidance">PVC Registration Guidance</option>
                  <option value="Registration Support">Voter App Support</option>
                  <option value="Feedback & Complaints">Feedback & Complaints</option>
                  <option value="INEC Locations">INEC Office Locations</option>
                  <option value="Partnership">Partnership & Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-lime-300 uppercase mb-1">Your Message</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with voter registration or campaign information?"
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-lime-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Help Desk</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
