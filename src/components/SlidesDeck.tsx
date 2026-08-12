import React, { useState, useEffect } from 'react';
import { CAMPAIGN_SLIDES } from '../data/slidesData';
import {
  Presentation, ChevronLeft, ChevronRight, Play, Pause, Maximize2, Minimize2,
  FileText, Download, CheckCircle, Award, Users, Shield, Phone, Sparkles
} from 'lucide-react';

export const SlidesDeck: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const slide = CAMPAIGN_SLIDES[currentSlideIndex];

  // Auto-advance slideshow when isPlaying is true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % CAMPAIGN_SLIDES.length);
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % CAMPAIGN_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + CAMPAIGN_SLIDES.length) % CAMPAIGN_SLIDES.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleDownloadDeckSummary = () => {
    const summaryText = CAMPAIGN_SLIDES.map((s) => `
[SLIDE ${s.id}: ${s.category}]
${s.title} - ${s.subtitle}
----------------------------------------
KEY POINTS:
${s.keyPoints.map((p) => `• ${p}`).join('\n')}
${s.quote ? `\nQUOTE: "${s.quote}" — ${s.quoteAuthor}` : ''}
    `).join('\n\n========================================\n');

    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RTIFN_Campaign_Presentation_Slides.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="slides" className="py-16 bg-emerald-950 text-white min-h-[800px] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">

        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Presentation className="w-4 h-4" />
              <span>Interactive Campaign Presentation Deck</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              RTIFN 2027 Campaign Presentation Slides
            </h2>
            <p className="text-sm text-emerald-200 mt-1">
              Official presentation deck detailing the strategy, grassroots infrastructure, exercise timeline, and vision for President Bola Ahmed Tinubu&apos;s re-election campaign.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadDeckSummary}
              className="bg-emerald-900 hover:bg-emerald-800 text-lime-300 font-bold text-xs px-4 py-2.5 rounded-xl border border-lime-400/40 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Deck Summary</span>
            </button>
          </div>
        </div>

        {/* Presentation Slide Stage */}
        <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 border-2 border-lime-400/80 rounded-3xl p-6 sm:p-12 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">
          
          {/* Top Slide Meta Bar */}
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase px-3 py-1 bg-lime-400 text-emerald-950 rounded-lg tracking-wider">
                {slide.category}
              </span>
              <span className="text-xs font-semibold text-emerald-300">
                Slide {currentSlideIndex + 1} of {CAMPAIGN_SLIDES.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-emerald-900 text-lime-300 hover:bg-emerald-800 transition-colors"
                title={isPlaying ? "Pause Slideshow" : "Auto-play Slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`p-2 rounded-lg transition-colors ${
                  showNotes ? 'bg-lime-400 text-emerald-950 font-bold' : 'bg-emerald-900 text-emerald-200'
                }`}
                title="Toggle Speaker Notes"
              >
                <FileText className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-emerald-900 text-emerald-200 hover:bg-emerald-800 transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Slide Main Content */}
          <div className="my-auto space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {slide.title}
              </h3>
              <p className="text-base sm:text-xl font-medium text-lime-300">
                {slide.subtitle}
              </p>
            </div>

            {/* Key Points List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {slide.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-emerald-900/60 border border-emerald-800 p-4 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote Block if present */}
            {slide.quote && (
              <div className="bg-emerald-950/90 border-l-4 border-lime-400 p-4 rounded-r-xl my-4">
                <p className="italic text-xs sm:text-sm text-lime-100 font-medium">
                  &quot;{slide.quote}&quot;
                </p>
                {slide.quoteAuthor && (
                  <p className="text-[11px] font-bold text-lime-300 uppercase tracking-widest mt-1">
                    — {slide.quoteAuthor}
                  </p>
                )}
              </div>
            )}

            {/* Stats row if present */}
            {slide.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-800/80">
                {slide.stats.map((stat, idx) => (
                  <div key={idx} className="bg-emerald-900/80 border border-emerald-700/60 p-4 rounded-xl text-center">
                    <span className="text-2xl sm:text-3xl font-black text-lime-300 block">{stat.value}</span>
                    <span className="text-xs font-bold text-white uppercase block mt-0.5">{stat.label}</span>
                    {stat.detail && (
                      <span className="text-[10px] text-emerald-300 block mt-1">{stat.detail}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Speaker Notes Drawer */}
          {showNotes && (
            <div className="mt-6 bg-black/60 border border-lime-400/40 p-4 rounded-xl text-xs text-lime-200">
              <strong className="text-lime-300 block mb-1 uppercase tracking-wider">Speaker Notes:</strong>
              Present this slide to emphasize RTIFN&apos;s data-driven approach in {slide.category}. Emphasize that all grassroots coordinators are actively capturing verified voters in state database nodes.
            </div>
          )}

          {/* Slide Navigation Controls */}
          <div className="flex items-center justify-between border-t border-emerald-800/80 pt-6 mt-8">
            <button
              onClick={handlePrev}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-3 px-5 rounded-xl border border-emerald-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-lime-300" />
              <span>Previous Slide</span>
            </button>

            {/* Progress dots */}
            <div className="hidden sm:flex items-center gap-2">
              {CAMPAIGN_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentSlideIndex ? 'w-8 bg-lime-400' : 'w-2.5 bg-emerald-800 hover:bg-emerald-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-lime-400 hover:bg-lime-300 text-emerald-950 font-extrabold text-xs py-3 px-5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Slide Selector Thumbnails Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CAMPAIGN_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                idx === currentSlideIndex
                  ? 'bg-lime-400 text-emerald-950 border-lime-300 font-bold shadow-lg scale-[1.03]'
                  : 'bg-emerald-900/60 border-emerald-800 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              <span className="text-[10px] font-mono block opacity-80 uppercase">
                Slide 0{s.id}
              </span>
              <span className="text-xs font-bold line-clamp-1 block mt-1">
                {s.title}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
