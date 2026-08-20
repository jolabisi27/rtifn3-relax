import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Shield, Phone, Sparkles, Image as ImageIcon } from 'lucide-react';

import posterImg from '../assets/images/rtifn_tinubu_poster_1786275711892.jpg';
import bannerImg from '../assets/images/call_centre_banner_1786275728501.jpg';
import rallyImg from '../assets/images/rtifn_rally_1786274866514.jpg';
import repImg from '../assets/images/call_centre_rep_1786274881061.jpg';
import { RTIFN_LOGO_DATA_URL } from '../assets/logoBase64';

interface SlideBannerProps {
  onRegisterClick?: () => void;
  onCallCentreClick?: () => void;
  onSlidesClick?: () => void;
}

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  badge: string;
  description: string;
  ctaText?: string;
  ctaAction?: 'register' | 'call' | 'slides';
  hotline?: string;
  dates?: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 'tinubu_national_exercise',
    title: 'National Registration Exercise 2026',
    subtitle: 'Relax Tinubu Is Fixing Nigeria (RTIFN)',
    imageSrc: posterImg,
    badge: '1st June 2026 — 30th June 2026',
    description: 'Be part of the movement! Register your support and build a better Nigeria together. Powered by the National Directorate Contact and Mobilization.',
    ctaText: 'Register Support Now',
    ctaAction: 'register',
    dates: '1st June 2026 TO 30th June 2026'
  },
  {
    id: 'call_centre_poster',
    title: 'RTIFN Dedicated Call Centre',
    subtitle: 'Here to Serve. Here to Support. Here for You.',
    imageSrc: bannerImg,
    badge: 'We Are Just a Call Away',
    description: 'Need assistance with PVC Registration, Ward support, or INEC office locations? Contact our dedicated support team today.',
    ctaText: 'Call 09138886874',
    ctaAction: 'call',
    hotline: '09138886874'
  },
  {
    id: 'grassroots_rally',
    title: 'Grand Grassroots Mobilization',
    subtitle: 'Uniting Citizens Across All 36 States & FCT',
    imageSrc: rallyImg,
    badge: '6 Geopolitical Zones',
    description: 'Empowering local polling unit agents, ward mobilizers, and youth leaders across 774 Local Government Areas.',
    ctaText: 'View Campaign Presentation',
    ctaAction: 'slides'
  },
  {
    id: 'call_centre_officer',
    title: 'Interactive Citizen Helpdesk & Support',
    subtitle: 'Reliable Service & Friendly Support',
    imageSrc: repImg,
    badge: '24/7 Service Available',
    description: 'Guiding voters on PVC verification, Ward & LGA registration, and feedback channels nationwide.',
    ctaText: 'Open Call Centre Desk',
    ctaAction: 'call',
    hotline: '09138886874'
  },
  {
    id: 'official_emblem',
    title: 'Official RTIFN Emblem & Seal',
    subtitle: 'Progress, Prosperity & National Transformation',
    imageSrc: RTIFN_LOGO_DATA_URL,
    badge: 'Official Movement Emblem',
    description: 'Symbolizing continuous national development, industrial growth, and democratic unity under President Bola Ahmed Tinubu.',
    ctaText: 'Join the Movement',
    ctaAction: 'register'
  }
];

export const SlideBanner: React.FC<SlideBannerProps> = ({
  onRegisterClick,
  onCallCentreClick,
  onSlidesClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentSlide = BANNER_SLIDES[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleCtaClick = (action?: 'register' | 'call' | 'slides') => {
    if (action === 'register' && onRegisterClick) onRegisterClick();
    else if (action === 'call' && onCallCentreClick) onCallCentreClick();
    else if (action === 'slides' && onSlidesClick) onSlidesClick();
  };

  return (
    <section className="pt-2 pb-6 bg-emerald-950 border-b border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

        {/* Slide Stage Container */}
        <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 rounded-3xl border-2 border-lime-400/70 p-4 sm:p-8 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden bg-black/40 border border-emerald-700/80 aspect-[4/3] sm:aspect-[16/10] max-h-[420px] flex items-center justify-center">
              <img
                src={currentSlide.imageSrc}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain bg-emerald-950/90 transition-all duration-700 hover:scale-[1.02] cursor-pointer"
                onClick={() => setLightboxImage(currentSlide.imageSrc)}
              />
              
              {/* Click to Enlarge Badge */}
              <div
                onClick={() => setLightboxImage(currentSlide.imageSrc)}
                className="absolute bottom-3 right-3 bg-emerald-950/90 border border-lime-400/60 text-lime-300 text-[11px] font-bold px-3 py-1.5 rounded-lg opacity-90 group-hover:opacity-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Click to View Full Poster</span>
              </div>
            </div>

            {/* Right Slide Details & Call to Action */}
            <div className="lg:col-span-5 space-y-5 text-left">
              
              <div className="inline-block bg-lime-400 text-emerald-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {currentSlide.badge}
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {currentSlide.title}
                </h3>
                <p className="text-sm font-semibold text-lime-300">
                  {currentSlide.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed bg-emerald-950/60 border border-emerald-800/80 p-4 rounded-xl">
                {currentSlide.description}
              </p>

              {currentSlide.dates && (
                <div className="bg-emerald-900/80 border-l-4 border-lime-400 p-3 rounded-r-xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">Registration Timeline</span>
                  <span className="text-sm font-extrabold text-lime-300">{currentSlide.dates}</span>
                </div>
              )}

              {currentSlide.hotline && (
                <div className="bg-yellow-400/10 border border-yellow-400/40 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-yellow-300 uppercase block">Hotline Number</span>
                    <span className="text-lg font-black text-white">{currentSlide.hotline}</span>
                  </div>
                  <a
                    href={`tel:${currentSlide.hotline}`}
                    className="bg-yellow-400 text-emerald-950 font-black text-xs px-3 py-2 rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                </div>
              )}

              {/* CTA Button */}
              {currentSlide.ctaText && (
                <div>
                  <button
                    onClick={() => handleCtaClick(currentSlide.ctaAction)}
                    className="w-full bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 text-emerald-950 font-black text-sm py-3.5 px-6 rounded-xl shadow-lg hover:shadow-lime-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Shield className="w-4 h-4" />
                    <span>{currentSlide.ctaText}</span>
                  </button>
                </div>
              )}

              {/* Next/Prev Arrow Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-emerald-800/80">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-lime-300 border border-emerald-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {BANNER_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex ? 'w-6 bg-lime-400' : 'w-2 bg-emerald-800 hover:bg-emerald-700'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold border border-lime-300 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                >
                  <span>Next Poster</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Counter Badge Repositioned Below Slider */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
            Official Campaign Posters
          </span>
          <span className="text-xs font-mono font-bold text-lime-300 bg-emerald-900/80 px-3 py-1 rounded-lg border border-emerald-700 shadow-sm">
            {currentIndex + 1} / {BANNER_SLIDES.length}
          </span>
        </div>

        {/* Thumbnail Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {BANNER_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-lime-400 text-emerald-950 border-lime-300 shadow-md font-bold scale-[1.02]'
                  : 'bg-emerald-900/60 border-emerald-800 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              <img
                src={slide.imageSrc}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover rounded-lg border border-emerald-700/50 shrink-0"
              />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono block opacity-80 uppercase">
                  Slide 0{idx + 1}
                </span>
                <span className="text-xs font-bold truncate block">
                  {slide.title}
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Poster View */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <img
              src={lightboxImage}
              alt="Full Poster View"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border-2 border-lime-400 shadow-2xl"
            />
            <p className="text-xs text-lime-300 mt-3 font-semibold">
              Click anywhere to close full screen poster
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
