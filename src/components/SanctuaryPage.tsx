import {useState} from 'react';
import {ArrowRight, ShieldCheck, Sparkles, VolumeX, X} from 'lucide-react';
import {GALLERY_ITEMS, GalleryItem} from '../data/spaData';
import {ResilientImage} from './ResilientImage';
import {GreenspotLocationSection} from './GreenspotMap';

interface SanctuaryPageProps {
  onBookNow: () => void;
}

const STANDARDS = [
  {
    icon: ShieldCheck,
    title: 'Hospital-Grade Sanitization',
    copy: 'Every clipper blade, straight-razor holder, and manicure instrument undergoes UV & barbicide sterilization between clients, paired with fresh single-use neck strips and linens.',
  },
  {
    icon: VolumeX,
    title: 'Sound-Insulated 8th Floor Suites',
    copy: 'Positioned in Room 801 on the 8th floor of Greenspot Towers, our private massage and facial rooms isolate you completely from Eastern Bypass highway noise.',
  },
  {
    icon: Sparkles,
    title: 'Curated Men’s Apothecary',
    copy: 'We use dermatologically tested charcoal cleansers, warm volcanic basalt stones, and cold-pressed botanical oils formulated specifically for coarse beard hair and men’s skin.',
  },
];

export function SanctuaryPage({onBookNow}: SanctuaryPageProps) {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-14">
        {/* Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-[#26262C] pb-12">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#D4AF37]">
              About Room 801 · Greenspot Towers
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F7] text-balance">
              A Sanctuary Built Around Men’s Wellness
            </h1>
          </div>
          <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            <p>
              Located in the fast-growing hub of Kamakis along the Eastern Bypass, Denspot
              Men’s Wellness Spa was created to bridge the gap between a rushed street-side
              barbershop and an overly clinical spa.
            </p>
            <p>
              Modern men carry heavy demands—from navigating Nairobi traffic to leading
              businesses and families. Room 801 on the 8th floor of Greenspot Towers was
              engineered to be your personal reset button: spotless suites, warm lighting,
              and discreet, attentive care.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onBookNow}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8102E] hover:bg-[#DF193A] text-[#F5F5F7] text-sm font-semibold rounded-sm transition-colors"
              >
                Reserve Your Suite
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Hygiene & Privacy Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STANDARDS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="border-t border-[#26262C] pt-5 space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <h2 className="font-display text-2xl font-semibold text-[#F5F5F7]">
                    {item.title}
                  </h2>
                </div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.copy}</p>
              </div>
            );
          })}
        </div>

        {/* Gallery & Virtual Tour Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#D4AF37]">
                Inside Room 801
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F7] mt-1">
                Sanctuary Gallery &amp; Tour
              </h2>
            </div>
            <p className="text-xs text-[#A1A1AA]">
              Click any space to inspect in full detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {GALLERY_ITEMS.map((item, idx) => {
              const spanFix =
                idx === 0
                  ? 'md:col-span-12 lg:col-span-7'
                  : idx === 1
                  ? 'md:col-span-6 lg:col-span-5'
                  : 'md:col-span-6 lg:col-span-4';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  className={`${spanFix} group text-left bg-[#16161A] border border-[#26262C] hover:border-[#D4AF37]/70 rounded-sm overflow-hidden transition-colors flex flex-col`}
                >
                  <div className="w-full h-[260px] sm:h-[290px] overflow-hidden bg-[#0B0B0D]">
                    <ResilientImage
                      src={item.imageSrc}
                      alt={item.title}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-1.5 flex-1">
                    <p className="text-xs text-[#D4AF37]">{item.subtitle}</p>
                    <h3 className="font-display text-2xl font-semibold text-[#F5F5F7]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <GreenspotLocationSection />

      {/* Lightbox Dialog */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#16161A] border border-[#2F2F38] rounded-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#26262C]">
              <div>
                <p className="text-xs text-[#D4AF37]">{lightboxItem.subtitle}</p>
                <h3 className="font-display text-2xl font-semibold text-[#F5F5F7]">
                  {lightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close gallery preview"
                className="p-2 text-[#A1A1AA] hover:text-[#F5F5F7] rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-hidden bg-[#0B0B0D]">
              <ResilientImage
                src={lightboxItem.imageSrc}
                alt={lightboxItem.title}
                fallbackTitle={lightboxItem.title}
                className="w-full h-full max-h-[62vh] object-cover"
              />
            </div>
            <div className="px-5 py-4 text-sm text-[#A1A1AA]">
              {lightboxItem.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
