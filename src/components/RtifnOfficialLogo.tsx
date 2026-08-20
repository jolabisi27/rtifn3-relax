import React from 'react';
import { RTIFN_LOGO_DATA_URL } from '../assets/logoBase64';

interface RtifnOfficialLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const RtifnOfficialLogo: React.FC<RtifnOfficialLogoProps> = ({
  className = 'w-12 h-12',
  size,
  showText = false
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-white shadow-md border-2 border-lime-400 p-0.5 overflow-hidden select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <img
        src={RTIFN_LOGO_DATA_URL}
        alt="RTIFN - Relax Tinubu Is Fixing Nigeria Official Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain rounded-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/logo.png';
        }}
      />
    </div>
  );
};

export default RtifnOfficialLogo;
