import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTIST_PROFILE, EXHIBITIONS } from '../data/artworks';
import { Mail, MapPin, Instagram, Calendar, Users, Crown, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const [formData, setFormData] = useState({ name: '', email: '', topic: 'Session', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', topic: 'Session', message: '' });
    }, 1200);
  };

  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* Bio and Portrait intro banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Artistic Portrait Wrapper */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl bg-[#EAE7E2] border border-[#2D2D2A]/10 shadow-xl overflow-hidden p-3 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* The real image we load is a gorgeous artist-at-work stock photography or portrait */}
            <img
              src="/linda-deluca-profile-image.jpeg"
              alt="Linda DeLuca Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Decorative film frame accent */}
            <div className="absolute inset-x-0 bottom-6 text-center">
              <span className="font-sans text-[10px] uppercase tracking-widest text-white bg-[#2D2D2A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-[#2D2D2A]/20">
                Linda DeLuca • 2026
              </span>
            </div>
          </div>
          {/* Background shapes mimicking desert clay sun */}
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#EAE7E2]/50 rounded-full filter blur-2xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#2D2D2A]/5 rounded-full filter blur-2xl opacity-40 pointer-events-none" />
        </div>

        {/* Bio text detail */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="font-sans text-[#2D2D2A]/50 font-semibold text-xs tracking-[0.25em] uppercase mb-3 block">
            Meet the Artist
          </span>
          <h2 id="about-artist-fullname" className="font-serif font-light text-3xl sm:text-5xl text-[#2D2D2A] tracking-tight">
            {ARTIST_PROFILE.name}
          </h2>
          <p id="about-artist-bio" className="mt-5 text-[#2D2D2A]/80 text-sm sm:text-base leading-relaxed font-sans font-light">
            {ARTIST_PROFILE.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center text-xs text-[#2D2D2A]/70">
            <span className="flex items-center gap-1.5 bg-[#EAE7E2]/50 px-3.5 py-2 rounded-md border border-[#2D2D2A]/10 font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-[#2D2D2A]/40" />
              {ARTIST_PROFILE.studioLocation}
            </span>
            <span className="flex items-center gap-1.5 bg-[#EAE7E2]/50 px-3.5 py-2 rounded-md border border-[#2D2D2A]/10 font-medium tracking-wide">
              <Mail className="w-3.5 h-3.5 text-[#2D2D2A]/40" />
              {ARTIST_PROFILE.email}
            </span>
          </div>
        </div>
      </div>

      {/* Artist Statement Column Grid */}
      <div className="mt-20 lg:mt-28 bg-[#EAE7E2] rounded-2xl p-8 sm:p-12 border border-[#2D2D2A]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#2D2D2A]/15 pb-6 lg:pb-0 lg:pr-8">
            <span className="font-sans text-[10px] uppercase text-[#2D2D2A]/50 tracking-widest font-semibold block">
              Philosophy
            </span>
            <h3 id="artist-statement-heading" className="font-serif font-light text-xl sm:text-2xl text-[#2D2D2A] tracking-tight mt-1">
              Artist Statement
            </h3>
            <p className="mt-3 text-[#2D2D2A]/60 text-xs sm:text-sm leading-relaxed font-sans font-light">
              An exploration of twilight structures, high-contrast desert silhouettes and raw Southwest aesthetics.
            </p>
          </div>
          <div className="lg:col-span-8">
            <p id="artist-statement-text" className="text-[#2D2D2A]/90 text-sm sm:text-lg leading-relaxed italic pr-4 font-serif font-light">
              "{ARTIST_PROFILE.statement}"
            </p>
          </div>
        </div>
      </div>

      {/* Exhibitions Timeline & General Studio Inquiry split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-20 lg:mt-28">
        {/* Exhibitions */}
        <div className="lg:col-span-6">
          <h3 id="exhibitions-heading" className="font-serif font-light text-2xl text-[#2D2D2A] tracking-tight mb-6">
            Selected Exhibitions
          </h3>

          <div className="space-y-6">
            {EXHIBITIONS.map((ex) => (
              <div 
                key={ex.id}
                id={`exhibition-item-${ex.id}`}
                className="flex gap-4 p-5 bg-[#EAE7E2]/40 border border-[#2D2D2A]/10 hover:border-[#2D2D2A]/20 transition-colors rounded-xl"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#EAE7E2] text-[#2D2D2A] border border-[#2D2D2A]/10">
                  {ex.type === 'solo' ? (
                    <Crown className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Users className="w-4 h-4 text-[#2D2D2A]/60" />
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#2D2D2A]/70 font-semibold bg-[#2D2D2A]/5 px-2 py-0.5 rounded-sm">
                      {ex.type} Exhibition
                    </span>
                    <span className="font-mono text-[10px] text-[#2D2D2A]/50">
                      {ex.dates}
                    </span>
                  </div>

                  <h4 id={`ex-title-${ex.id}`} className="font-serif font-normal text-[#2D2D2A] text-sm mt-1.5">
                    {ex.title}
                  </h4>

                  <p id={`ex-venue-${ex.id}`} className="text-[#2D2D2A]/60 text-xs mt-1 font-sans font-light">
                    {ex.venue} • {ex.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Form */}
        <div className="lg:col-span-6 bg-[#EAE7E2]/55 border border-[#2D2D2A]/10 p-6 sm:p-8 rounded-2xl">
          <h3 id="contact-heading" className="font-serif font-normal text-2xl text-[#2D2D2A] tracking-tight">
            Studio Inquiries
          </h3>
          <p className="mt-2 text-[#2D2D2A]/60 text-xs sm:text-sm leading-relaxed font-sans font-light">
            Interested in booking a studio visit in London, ON, scheduling a workshop, or requesting gallery coordinates? Please send an inquiry here.
          </p>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form 
                onSubmit={handleSubmit}
                id="studio-inquiry-form"
                className="space-y-4 mt-6 font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#2D2D2A]/50 uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="studio-name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Jane Smith"
                      className="w-full bg-white/60 border border-[#2D2D2A]/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#2D2D2A]/30 focus:bg-white transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#2D2D2A]/50 uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="studio-email-input"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="jane@example.com"
                      className="w-full bg-white/60 border border-[#2D2D2A]/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#2D2D2A]/30 focus:bg-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#2D2D2A]/50 uppercase mb-1.5">
                    Topic of Interest
                  </label>
                  <select
                    id="studio-topic-select"
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full bg-white/60 border border-[#2D2D2A]/10 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-[#2D2D2A]/30 focus:bg-white transition-all font-sans appearance-none"
                    style={{ backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%232D2D2A' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundSize: '1.25rem' }}
                  >
                    <option value="Representation">Gallery Representation</option>
                    <option value="StudioVisit">Studio Visit (London, ON)</option>
                    <option value="Press">Press Coordinates / Interview</option>
                    <option value="Commissions">Custom Commissions</option>
                    <option value="Session">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold tracking-widest text-[#2D2D2A]/50 uppercase mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="studio-message-textarea"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Hello Linda..."
                    className="w-full bg-white/60 border border-[#2D2D2A]/10 rounded-lg p-3.5 text-xs outline-none focus:border-[#2D2D2A]/30 focus:bg-white transition-all resize-none leading-relaxed font-sans"
                  />
                </div>

                <button
                  id="studio-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#2D2D2A] text-white hover:opacity-90 disabled:bg-[#2D2D2A]/40 px-4 py-3 text-xs font-semibold tracking-widest uppercase rounded-lg transition-all cursor-pointer border-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-stone-100 border-t-transparent rounded-full animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                key="studio-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center flex flex-col items-center justify-center bg-[#2D2D2A]/5 border border-[#2D2D2A]/10 rounded-xl"
              >
                <CheckCircle2 className="w-8 h-8 text-[#2D2D2A]/80 mb-2.5" />
                <h4 className="font-serif font-normal text-[#2D2D2A] text-base">Message Sent Successfully</h4>
                <p className="text-[11px] text-[#2D2D2A]/70 max-w-[280px] leading-relaxed mt-1 font-sans">
                  Thank you for your message! Linda appreciates your outreach tremendously and will get back to you at <strong>{formData.email}</strong> as soon as possible.
                </p>
                <button
                  id="reset-studio-form-btn"
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
    </section>
  );
}
