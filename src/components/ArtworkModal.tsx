import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artwork } from '../types';
import { X, Send, CheckCircle2, ChevronLeft, ChevronRight, Share2, Clipboard, AlertCircle, Eye, Search, ZoomIn } from 'lucide-react';
import { ARTWORKS } from '../data/artworks';
import ArtworkImage from './ArtworkImage';
import { sendEmail } from '../utils/emailService';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ArtworkModal({ artwork, onClose, onNext, onPrev }: ArtworkModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // States for full-screen brushwork zoom view
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(2.2);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });


  // Set default message template depending on artwork stock
  useEffect(() => {
    if (artwork) {
      const template = artwork.price === 'Sold'
        ? `Hi Linda, I saw your piece '${artwork.title}' which of course is sold, but I absolutely love its style. I would love to talk about commissioning a similar painting in this desert-pop style! Do you have availability for commissions later this season?`
        : `Hi Linda, I am highly interested in purchasing your painting '${artwork.title}' (${artwork.price}, ${artwork.dimensions}). Could you please share more information regarding packaging, shipping policies, and insurance options? Thank you!`;
      
      setFormData(prev => ({ ...prev, message: template }));
      setIsSubmitted(false);
    }
  }, [artwork]);

  // Handle escape key to close modal and lock background body scroll
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowRight' && onNext && !isZoomed) onNext();
      if (e.key === 'ArrowLeft' && onPrev && !isZoomed) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [onClose, onNext, onPrev, isZoomed]);

  if (!artwork) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        name: formData.name,
        email: formData.email,
        artwork_title: artwork.title,
        artwork_price: artwork.price,
        artwork_medium: artwork.medium,
        artwork_dimensions: artwork.dimensions,
        message: `Inquirer Name: ${formData.name}\nInquirer Email: ${formData.email}\nArtwork: "${artwork.title}" (${artwork.medium}, ${artwork.dimensions})\nPrice: ${artwork.price}\n\nMessage:\n${formData.message}`,
        to_name: "Linda DeLuca",
        subject: `Artwork Inquiry: ${artwork.title}`,
      });
      setSubmittedEmail(formData.email);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error('Failed to send mail:', err);
      setSubmitError('Failed to send inquiry. Please check your network connection or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/?artwork=${artwork.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((touch.clientX - left) / width) * 100;
      const y = ((touch.clientY - top) / height) * 100;
      setZoomOrigin({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-[#2D2D2A]/90 backdrop-blur-[4px]"
        onClick={onClose}
      />

      {/* Persistent Floating Close Button (Viewport Top-Right, Outside the card) */}
      <button
        id="modal-close-btn-top"
        onClick={onClose}
        className="fixed top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 text-[#F5F2ED]/85 hover:text-white bg-[#2D2D2A]/60 p-2 sm:p-2.5 rounded-full border border-[#2F2F2C]/30 hover:bg-[#2D2D2A]/95 shadow-lg transition-all z-[60]"
        aria-label="Close panel"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="flex items-center justify-center h-full w-full p-3 sm:p-6 lg:p-10 relative z-10 font-sans">
          {/* Quick Nav Controls on Large Screens */}
          {onPrev && (
            <button
              id="modal-prev-btn"
              onClick={onPrev}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center text-[#F5F2ED]/70 hover:text-white bg-[#2D2D2A]/40 p-3.5 rounded-md hover:bg-[#2D2D2A] border border-[#2D2D2A]/35 transition-all z-20 group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {onNext && (
            <button
              id="modal-next-btn"
              onClick={onNext}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center text-[#F5F2ED]/70 hover:text-white bg-[#2D2D2A]/40 p-3.5 rounded-md hover:bg-[#2D2D2A] border border-[#2D2D2A]/35 transition-all z-20 group"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Core Panel Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="bg-[#F5F2ED] rounded-2xl overflow-hidden shadow-2xl border border-[#2D2D2A]/10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row h-full max-h-[92vh] max-h-[92dvh] sm:max-h-[85vh] sm:max-h-[85dvh] lg:h-[85vh] lg:h-[85dvh] lg:max-h-[750px] relative"
          >
            {/* Left Portion: GRAND IMAGE VIEWER */}
            <div className="w-full lg:w-3/5 h-[38vh] h-[38dvh] lg:h-full bg-[#252321] flex flex-col justify-between relative p-4 sm:p-6 lg:p-8 overflow-hidden flex-shrink-0">
              {/* Top ambient shadows */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-stone-950/40 to-transparent pointer-events-none" />

              {/* Artwork tag indicator */}
              <div className="flex items-center justify-between z-10">
                <span className="font-sans text-[10px] tracking-widest text-[#F5F2ED]/60 uppercase">
                  Linda DeLuca • Collection
                </span>
                <button
                  id="artwork-share-btn"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-sans font-medium tracking-widest text-[#F5F2ED]/80 hover:text-white bg-[#2D2D2A]/70 rounded border border-[#2D2D2A]/25 hover:bg-[#2D2D2A] transition-all"
                >
                  {copiedLink ? (
                    <>
                      <Clipboard className="w-3 h-3 text-emerald-400" />
                      <span>Copied URL</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              {/* Centered High Resolution Element */}
              <div 
                onClick={() => setIsZoomed(true)}
                className="flex-grow flex flex-col items-center justify-center my-2 sm:my-4 relative w-full min-h-0 overflow-hidden cursor-zoom-in group/canvas"
              >
                {/* Visual shadow glow behind actual painting context */}
                <div className="absolute inset-0 bg-stone-900/40 blur-2xl rounded-full scale-75 pointer-events-none" />
                
                <ArtworkImage artwork={artwork} isModal={true} onClick={() => setIsZoomed(true)} className="z-10" />

                {/* Micro-interactive instructions overlay on hover */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#2D2D2A]/85 text-[#F5F2ED] text-[10px] tracking-widest uppercase py-1.5 px-3 rounded-full flex items-center gap-1.5 opacity-0 sm:group-hover/canvas:opacity-100 transition-opacity z-20 shadow-md border border-[#F5F2ED]/10 pointer-events-none font-sans whitespace-nowrap">
                  <Search className="w-3.5 h-3.5 text-[#DE8C68]" />
                  <span>Click image to inspect brushwork</span>
                </div>
              </div>

            </div>

            {/* Right Portion: METADATA, STORY, AND INQUIRY FORM */}
            <div className="w-full lg:w-2/5 flex flex-col flex-1 h-[54vh] h-[54dvh] lg:h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-[#2D2D2A]/15 min-h-0">
              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between gap-6">
                {/* Visual Details Card */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-[10px] font-semibold text-[#2D2D2A]/50 bg-[#2D2D2A]/5 px-2.5 py-0.5 rounded-sm uppercase tracking-widest">
                      {artwork.category} Series
                    </span>
                    <span className="font-mono text-[11px] text-[#2D2D2A]/50">
                      {artwork.year}
                    </span>
                  </div>

                  <h2 id="modal-artwork-title" className="font-serif font-light text-2xl text-[#2D2D2A] tracking-tight mt-3">
                    {artwork.title}
                  </h2>

                  {/* Standard Salon Specification label */}
                  <div className="mt-4 flex gap-3 text-xs border-y border-[#2D2D2A]/10 py-3">
                    <div className="flex flex-col">
                      <span className="text-[#2D2D2A]/40 font-sans text-[10px] font-semibold tracking-wider uppercase">Medium</span>
                      <span id="label-medium" className="text-[#2D2D2A] font-medium mt-0.5">{artwork.medium}</span>
                    </div>
                    <div className="flex flex-col border-l border-[#2D2D2A]/10 pl-3">
                      <span className="text-[#2D2D2A]/40 font-sans text-[10px] font-semibold tracking-wider uppercase">Dimensions</span>
                      <span id="label-dims" className="text-[#2D2D2A] font-medium mt-0.5">{artwork.dimensions}</span>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="mt-4">
                    <span className="text-[#2D2D2A]/40 font-sans text-[10px] font-semibold tracking-widest uppercase block">Artwork Backstory</span>
                    <p id="label-description" className="text-[#2D2D2A]/80 text-xs sm:text-sm leading-relaxed mt-1.5 font-sans font-light">
                      {artwork.description}
                    </p>
                  </div>
                </div>

                {/* The Interactive Form for Contact / Purchase */}
                <div className="border-t border-[#2D2D2A]/15 pt-6 bg-[#EAE7E2]/50 p-4 rounded-xl border border-[#2D2D2A]/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="font-sans text-[10px] uppercase tracking-widest font-semibold text-[#2D2D2A]/40">Acquisition Status</span>
                      <span id="status-price" className={`text-sm font-semibold tracking-tight ${artwork.price === 'Sold' ? 'text-[#2D2D2A]/50' : 'text-[#2D2D2A]'}`}>
                        {artwork.price === 'Sold' ? 'Private Collection (Sold)' : `Available • ${artwork.price}`}
                      </span>
                    </div>
                    {artwork.price === 'Sold' && (
                      <span className="px-2.5 py-1 bg-[#2D2D2A]/5 text-[#2D2D2A]/80 text-[10px] font-sans font-medium rounded-sm border border-[#2D2D2A]/10">
                        Request Commission
                      </span>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-3.5"
                      >
                        <div id="form-group-name">
                          <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#2D2D2A]/50 uppercase mb-1">
                            Your Name *
                          </label>
                          <input
                            id="field-client-name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="John Doe"
                            className="w-full bg-white/60 border border-[#2D2D2A]/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#2D2D2A]/30 focus:bg-white transition-all font-sans"
                          />
                        </div>

                        <div id="form-group-email">
                          <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#2D2D2A]/50 uppercase mb-1">
                            Email Address *
                          </label>
                          <input
                            id="field-client-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="collector@example.com"
                            className="w-full bg-white/60 border border-[#2D2D2A]/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#2D2D2A]/30 focus:bg-white transition-all font-sans"
                          />
                        </div>

                        <div id="form-group-message">
                          <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#2D2D2A]/50 uppercase mb-1">
                            Message to the Artist
                          </label>
                          <textarea
                            id="field-client-message"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full bg-white/60 border border-[#2D2D2A]/10 rounded-lg p-3 text-xs outline-none focus:border-[#2D2D2A]/30 focus:bg-white transition-all resize-none leading-relaxed font-sans"
                          />
                        </div>

                        {submitError && (
                          <div className="flex items-start gap-2 text-rose-700 bg-rose-50 border border-rose-200/50 rounded-lg p-3 text-xs leading-relaxed">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{submitError}</span>
                          </div>
                        )}

                        <button
                          id="submit-inquiry-btn"
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 bg-[#2D2D2A] text-white hover:opacity-90 disabled:bg-[#2D2D2A]/40 px-4 py-3 text-xs font-semibold tracking-widest uppercase rounded-lg transition-all cursor-pointer border-none"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-stone-100 border-t-transparent rounded-full animate-spin" />
                              <span>Sending Inquiry...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>{artwork.price === 'Sold' ? 'Request Commission Info' : 'Send Purchase Inquiry'}</span>
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-10 text-center flex flex-col items-center justify-center bg-[#2D2D2A]/5 border border-[#2D2D2A]/10 rounded-xl"
                      >
                        <CheckCircle2 className="w-8 h-8 text-[#2D2D2A]/80 mb-2.5" />
                        <h4 className="font-serif font-normal text-[#2D2D2A] text-base">Inquiry Sent Successfully</h4>
                        <p className="text-[11px] text-[#2D2D2A]/70 max-w-[240px] leading-relaxed mt-1 font-sans">
                          Your message has been queued to Linda's inbox. She will respond directly to <strong>{submittedEmail}</strong> within 1-2 business days.
                        </p>
                        <button
                          id="reset-form-btn-modal"
                          onClick={() => setIsSubmitted(false)}
                          className="mt-4 text-[10px] font-sans uppercase tracking-widest font-semibold text-[#2D2D2A]/60 hover:text-[#2D2D2A] underline"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Zoom Mode Overlay */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-stone-950/98 flex flex-col justify-between select-none"
              onClick={() => setIsZoomed(false)}
            >
              {/* Top Bar with Title and Scale Controls */}
              <div 
                className="p-4 sm:p-6 flex items-center justify-between text-[#F5F2ED] z-20 bg-gradient-to-b from-stone-950/80 to-transparent"
                onClick={(e) => e.stopPropagation()} // Prevent clicking bar from closing zoom
              >
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[#DE8C68] font-semibold">Fine Detail Inspection</span>
                  <span className="font-serif font-light text-sm sm:text-base tracking-tight mt-1">
                    {artwork.title} • {artwork.year}
                  </span>
                </div>

                {/* Scale controls + close buttons */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-stone-900/90 rounded border border-white/10 p-0.5">
                    <button
                      onClick={() => setZoomScale(Math.max(1.5, zoomScale - 0.4))}
                      disabled={zoomScale <= 1.5}
                      className="px-2.5 py-1 text-[11px] font-mono hover:bg-stone-800 disabled:opacity-30 rounded text-[#F5F2ED]/80 hover:text-white transition-all cursor-pointer"
                      title="Zoom Out"
                    >
                      -
                    </button>
                    <span className="px-3 text-[11.5px] font-mono font-medium min-w-[50px] text-center text-[#F5F2ED]/90 select-none">
                      {zoomScale.toFixed(1)}x
                    </span>
                    <button
                      onClick={() => setZoomScale(Math.min(4.0, zoomScale + 0.4))}
                      disabled={zoomScale >= 4.0}
                      className="px-2.5 py-1 text-[11px] font-mono hover:bg-stone-800 disabled:opacity-30 rounded text-[#F5F2ED]/80 hover:text-white transition-all cursor-pointer"
                      title="Zoom In"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => setIsZoomed(false)}
                    className="text-white/70 hover:text-white bg-stone-900/90 p-2 rounded border border-white/10 hover:bg-stone-800 transition-all shadow-md cursor-pointer"
                    aria-label="Close Zoom"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Interactive Magnifier Stage */}
              <div
                className="flex-grow w-full relative cursor-zoom-out flex items-center justify-center p-3 sm:p-6 md:p-8"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                  <div className="relative w-[95vw] h-[74vh] sm:h-[78vh] md:h-[82vh] max-w-[1350px] shadow-[0_45px_100px_rgba(0,0,0,0.95)] border-[5px] sm:border-[8px] border-stone-900 rounded-lg sm:rounded-xl overflow-hidden bg-stone-950/40 flex items-center justify-center">
                    <motion.img
                      src={artwork.imageUrl}
                      alt={`${artwork.title} brushwork magnification`}
                      className="w-full h-full max-w-full max-h-full object-contain transition-transform duration-100 ease-out"
                      style={{
                        transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                        transform: `scale(${zoomScale})`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Status / Guidance Bar */}
              <div className="p-4 sm:p-6 text-center text-[10px] tracking-widest uppercase font-mono text-[#F5F2ED]/40 z-20 bg-gradient-to-t from-stone-950/80 to-transparent">
                <span className="bg-stone-900/60 px-4 py-2 rounded-full border border-white/5 inline-flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#DE8C68] animate-pulse" />
                  <span>Move cursor or touch drag to pan textures • Click to exit</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );

}
