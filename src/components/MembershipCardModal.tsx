import React, { useRef } from 'react';
import { Voter } from '../types';
import { RTIFN_LOGO_DATA_URL } from '../assets/logoBase64';
import { CheckCircle2, Download, Printer, Share2, X, Shield, UserPlus, Home } from 'lucide-react';

interface MembershipCardModalProps {
  voter: Voter | null;
  onClose: () => void;
  onAddNewMember?: () => void;
  onGoHome?: () => void;
}

export const MembershipCardModal: React.FC<MembershipCardModalProps> = ({
  voter,
  onClose,
  onAddNewMember,
  onGoHome
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!voter) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Downloading RTIFN Membership Card for ${voter.fullName}.\nRegistration ID: ${voter.registrationCode}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'RTIFN Supporter Registration',
        text: `I just registered on Relax Tinubu is Fixing Nigeria (RTIFN)! Member ID: ${voter.registrationCode}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`I just registered on Relax Tinubu is Fixing Nigeria (RTIFN)! Member ID: ${voter.registrationCode} - ${window.location.href}`);
      alert('Share link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-emerald-950 border-2 border-lime-400 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        
        {/* Header Close Bar */}
        <div className="bg-emerald-900/90 px-6 py-4 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-lime-400" />
            <span className="font-bold text-sm text-lime-200">Registration Confirmed — Official RTIFN ID</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-emerald-950 hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Congratulations Alert */}
          <div className="bg-lime-400/10 border border-lime-400/30 rounded-xl p-4 text-center">
            <h3 className="text-lg font-bold text-lime-300">Welcome to RTIFN 2027!</h3>
            <p className="text-xs text-emerald-100 mt-1">
              Your record has been successfully entered into the centralized electorate database for <strong className="text-lime-200">{voter.state} State</strong>.
            </p>
          </div>

          {/* The Official RTIFN Digital Member Slip Card */}
          <div
            ref={cardRef}
            className="relative bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 border-2 border-lime-400 rounded-xl p-5 shadow-2xl space-y-4"
          >
            {/* Top Brand Banner */}
            <div className="flex items-center justify-between border-b border-lime-400/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white border border-lime-400 p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={RTIFN_LOGO_DATA_URL}
                    alt="RTIFN Emblem"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/logo.png';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-xs font-black text-lime-300 tracking-wider uppercase leading-none">
                    RELAX TINUBU IS FIXING NIGERIA
                  </h4>
                  <p className="text-[10px] font-bold text-white tracking-widest uppercase">
                    OFFICIAL ELECTORATE SUPPORTER CARD
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono px-2 py-0.5 bg-lime-400 text-emerald-950 rounded font-black tracking-wider block">
                  VERIFIED
                </span>
              </div>
            </div>

            {/* Member Details */}
            <div className="grid grid-cols-3 gap-3 text-xs pt-1">
              <div className="col-span-2 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Full Name</span>
                  <span className="font-extrabold text-sm text-white capitalize">{voter.fullName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Registration Code</span>
                    <span className="font-mono font-bold text-lime-300 text-xs">{voter.registrationCode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">PVC Status</span>
                    <span className="font-bold text-xs text-white bg-emerald-800 px-1.5 py-0.5 rounded inline-block">
                      {voter.pvcStatus}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">State & LGA</span>
                    <span className="font-medium text-xs text-white">{voter.state} / {voter.lga}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                      {voter.countryOfResidence ? 'Country (Diaspora)' : 'WhatsApp No.'}
                    </span>
                    <span className="font-medium text-xs text-lime-200">
                      {voter.countryOfResidence ? `🌍 ${voter.countryOfResidence}` : voter.phone}
                    </span>
                  </div>
                </div>
                {(voter.ward || voter.pollingUnit) && (
                  <div className="grid grid-cols-2 gap-2">
                    {voter.ward && (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-300 block">Electoral Ward</span>
                        <span className="font-medium text-xs text-white">{voter.ward}</span>
                      </div>
                    )}
                    {voter.pollingUnit && (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-300 block">Polling Unit</span>
                        <span className="font-medium text-xs text-lime-300">{voter.pollingUnit}</span>
                      </div>
                    )}
                  </div>
                )}
                {(voter.gender || voter.age || voter.occupation) && (
                  <div className="grid grid-cols-3 gap-1 bg-emerald-900/60 p-2 rounded-lg border border-emerald-800/80 text-[10px]">
                    {voter.gender && <div><span className="text-emerald-300 block uppercase">Gender</span><span className="font-bold text-white">{voter.gender}</span></div>}
                    {voter.age && <div><span className="text-emerald-300 block uppercase">Age</span><span className="font-bold text-white">{voter.age}</span></div>}
                    {voter.occupation && <div><span className="text-emerald-300 block uppercase">Occupation</span><span className="font-bold text-lime-300 capitalize">{voter.occupation}</span></div>}
                  </div>
                )}
                {voter.apcRegistrationNumber && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">APC Reg. No.</span>
                    <span className="font-mono text-xs text-lime-300">{voter.apcRegistrationNumber}</span>
                  </div>
                )}
                {voter.hasSupportGroup === 'Yes' && voter.supportGroupName && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Support Group</span>
                    <span className="font-medium text-xs text-white">{voter.supportGroupName}</span>
                  </div>
                )}
              </div>

              {/* QR Code Graphic & Badge */}
              <div className="flex flex-col items-center justify-center border-l border-emerald-800/80 pl-2 text-center space-y-1">
                <div className="w-16 h-16 bg-white p-1 rounded-lg shadow-md flex items-center justify-center">
                  {/* Simulated QR Code SVG */}
                  <svg className="w-full h-full text-emerald-950" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm9-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-3h3v3h-3v-3zm0 5h3v3h-3v-3zm3-3h2v2h-2v-2z" />
                  </svg>
                </div>
                <span className="text-[8px] font-mono text-emerald-300">SCAN TO VERIFY</span>
                <span className="text-[9px] font-bold text-lime-300">{voter.geopoliticalZone}</span>
              </div>
            </div>

            {/* Footer Seal */}
            <div className="border-t border-emerald-800/80 pt-2 flex items-center justify-between text-[10px] text-emerald-300">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-lime-400" />
                <span>National Directorate Contact & Mobilization</span>
              </div>
              <span>Registered: {new Date(voter.registeredAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <button
              onClick={handleDownload}
              className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-emerald-700 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-lime-300" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={handleShare}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-emerald-700 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-lime-300" />
              <span>Share</span>
            </button>
          </div>

          {/* Post-Submission Navigation Options */}
          <div className="border-t border-emerald-800/90 pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                if (onAddNewMember) onAddNewMember();
                else onClose();
              }}
              className="flex-1 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-emerald-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all border border-lime-200"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Member</span>
            </button>

            <button
              onClick={() => {
                if (onGoHome) onGoHome();
                else onClose();
              }}
              className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-emerald-700 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4 text-lime-300" />
              <span>Go Back to Homepage</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
