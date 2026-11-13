import {FormEvent, useState} from 'react';
import {ArrowRight, Calendar, Check, Star} from 'lucide-react';
import {
  IMAGES,
  PageId,
  SERVICES,
  SIGNATURE_PACKAGES,
  TESTIMONIALS,
  formatKes,
} from '../data/spaData';
import {ResilientImage} from './ResilientImage';
import {GreenspotLocationSection} from './GreenspotMap';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onStartBooking: (itemIds?: string[]) => void;
}

export function HomePage({onNavigate, onStartBooking}: HomePageProps) {
  const [quickServiceId, setQuickServiceId] = useState<string>('pkg-executive-reset');

  const handleQuickBook = (e: FormEvent) => {
    e.preventDefault();
    onStartBooking([quickServiceId]);
  };

  const featuredCombos = SIGNATURE_PACKAGES.filter((p) =>
    ['pkg-executive-reset', 'pkg-weekend-wind-down', 'pkg-boss-experience'].includes(p.id)
  );

  const quickServicesPreview = SERVICES.filter((s) => s.popular);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-[#201D18]">
        <div className="absolute inset-0">
          <ResilientImage
            src={IMAGES.heroLounge}
            alt="Denspot Men's Wellness Spa executive barber chairs and warm brass lighting in Room 801"
            fallbackTitle="Denspot Executive Lounge"
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/88 to-[#0A0A0B]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C8A253]">
              Greenspot Towers · 8th Floor, Room 801 · Kamakis
            </p>
            <h1
              className="font-display font-semibold text-[#F4F1EA] leading-[1.06] text-balance"
              style={{fontSize: 'clamp(2.35rem, 4.4vw, 3.85rem)'}}
            >
              Precision Grooming. Deep Relaxation. Built for the Modern Man.
            </h1>
            <p className="text-base sm:text-lg text-[#C9C3B8] leading-relaxed max-w-xl">
              Step away from the Eastern Bypass rush. Experience executive kinyozi
              craftsmanship, deep-tissue massage, and tailored skincare in a private,
              sound-insulated sanctuary.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onStartBooking()}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C8A253] hover:bg-[#D9B76C] text-[#0A0A0B] text-sm font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                Book Your Session
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#121215]/80 hover:bg-[#1B1A1E] border border-[#352F23] text-[#F4F1EA] text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0"
              >
                Explore Service Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick-Book Impulse Bar (Full-width row below Hero) */}
      <section
        aria-label="Quick Slot Reservation"
        className="bg-[#111114] border-b border-[#24211B]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5">
          <form
            onSubmit={handleQuickBook}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
          >
            <div className="md:col-span-5">
              <label
                htmlFor="quick-treatment"
                className="block text-xs font-medium text-[#A6A198] mb-1.5"
              >
                Select Service or Combo
              </label>
              <select
                id="quick-treatment"
                value={quickServiceId}
                onChange={(e) => setQuickServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0A0B] border border-[#2C2820] focus:border-[#C8A253] focus:outline-none text-sm text-[#F4F1EA] rounded-sm"
              >
                <optgroup label="Signature Combos">
                  {SIGNATURE_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.durationLabel} — {formatKes(pkg.priceKes)})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Individual Treatments">
                  {SERVICES.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.name} ({svc.durationLabel} — {formatKes(svc.priceKes)})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0A0A0B] border border-[#221F1A] px-3.5 py-2.5 rounded-sm">
                <span className="text-[#8D867B] block">Hours Today</span>
                <span className="text-[#F4F1EA] font-medium tabular-nums">
                  8:30 AM – 9:30 PM
                </span>
              </div>
              <div className="bg-[#0A0A0B] border border-[#221F1A] px-3.5 py-2.5 rounded-sm">
                <span className="text-[#8D867B] block">M-Pesa Deposit</span>
                <span className="text-[#C8A253] font-semibold tabular-nums">
                  KES 500 or Lounge
                </span>
              </div>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 px-5 bg-[#C8A253] hover:bg-[#D9B76C] text-[#0A0A0B] text-sm font-semibold rounded-sm transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Pick Time Slot
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Built for the Modern Gentleman (Editorial 2-Column Split + 3 Unboxed Pillars) */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5">
            <div className="w-full h-[320px] lg:h-full rounded-sm overflow-hidden border border-[#26231D]">
              <ResilientImage
                src={IMAGES.kinyoziCraft}
                alt="Master barber crafting a hot towel beard sculpt at Denspot Kamakis"
                fallbackTitle="Built for the Modern Gentleman"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C8A253]">
                The Room 801 Standard
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F1EA] text-balance">
                Built for the Modern Gentleman
              </h2>
              <p className="text-sm sm:text-base text-[#A6A198] leading-relaxed">
                At Denspot Men’s Wellness Spa, self-care is treated as part of peak
                performance. Whether you are stopping by Kamakis for a sharp Friday evening
                fade or unwinding with a 75-minute hot stone massage, our team delivers
                discreet, unhurried hospitality every single visit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#24211B] pt-7">
              <div className="space-y-1.5">
                <p className="text-xs text-[#C8A253] font-medium">01. Privacy</p>
                <h3 className="font-display text-xl font-semibold text-[#F4F1EA]">
                  Discreet &amp; Private
                </h3>
                <p className="text-xs text-[#9E978B] leading-relaxed">
                  Tucked away on the 8th floor of Greenspot Towers with sound-insulated
                  suites far from street traffic.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-[#C8A253] font-medium">02. Convenience</p>
                <h3 className="font-display text-xl font-semibold text-[#F4F1EA]">
                  All-in-One Care
                </h3>
                <p className="text-xs text-[#9E978B] leading-relaxed">
                  Move seamlessly from a razor-sharp haircut and beard sculpt into deep-tissue
                  bodywork under one roof.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-[#C8A253] font-medium">03. Craft</p>
                <h3 className="font-display text-xl font-semibold text-[#F4F1EA]">
                  Certified Team
                </h3>
                <p className="text-xs text-[#9E978B] leading-relaxed">
                  Experienced barbers, estheticians, and therapists tailoring pressure and
                  style to your routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Signature Combos & Transparent Pricing Preview */}
      <section className="border-t border-[#201D18] bg-[#0D0D10] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C8A253]">
                Most Popular Experiences
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F1EA]">
                Signature Grooming &amp; Spa Combos
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('packages')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#C8A253] hover:text-[#DFBE76] whitespace-nowrap"
            >
              View All Packages &amp; VIP Club
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCombos.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#121215] border border-[#26231D] hover:border-[#C8A253]/60 rounded-sm p-6 flex flex-col justify-between gap-6 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#C8A253] font-medium">{pkg.savingsLabel}</span>
                    <span className="text-[#9E978B] tabular-nums">{pkg.durationLabel}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#F4F1EA]">
                    {pkg.name}
                  </h3>
                  <p className="text-xl font-semibold text-[#C8A253] tabular-nums">
                    {formatKes(pkg.priceKes)}
                  </p>
                  <p className="text-sm text-[#A6A198]">{pkg.tagline}</p>
                  <ul className="space-y-1.5 pt-2 border-t border-[#201D18] text-xs text-[#D5CFC4]">
                    {pkg.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C8A253] shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => onStartBooking([pkg.id])}
                  className="w-full py-2.5 px-4 bg-[#1B1915] hover:bg-[#C8A253] text-[#F4F1EA] hover:text-[#0A0A0B] border border-[#342E23] hover:border-[#C8A253] text-xs font-semibold rounded-sm transition-colors"
                >
                  Book This Package
                </button>
              </div>
            ))}
          </div>

          {/* Individual Favorites Strip */}
          <div className="border-t border-[#221F1A] pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#C8A253]">
                À La Carte Highlights
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
                Transparent Menu Rates
              </h3>
              <p className="text-sm text-[#A6A198]">
                Know exact durations and KES rates before you arrive.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-[#C8A253] hover:underline"
              >
                Browse Full 14-Treatment Menu
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {quickServicesPreview.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => onStartBooking([svc.id])}
                  className="text-left p-4 bg-[#121215] border border-[#24211B] hover:border-[#C8A253] rounded-sm transition-colors flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#F4F1EA]">{svc.name}</p>
                    <p className="text-xs text-[#9E978B] mt-0.5 tabular-nums">
                      {svc.durationLabel} · {svc.category.split(' ')[0]}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#C8A253] tabular-nums shrink-0">
                    {formatKes(svc.priceKes)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Social Proof / Client Reviews */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C8A253]">
              Google Client Reviews
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F1EA]">
              Trusted by Gentlemen Across Ruiru &amp; Nairobi
            </h2>
          </div>
          <p className="text-xs text-[#A6A198] tabular-nums">
            Rated 4.9 / 5.0 by Kamakis &amp; Eastern Bypass regulars
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((rev) => (
            <article
              key={rev.id}
              className="bg-[#111114] border border-[#24211B] rounded-sm p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#C8A253]" aria-label={`${rev.rating} out of 5 stars`}>
                  {Array.from({length: rev.rating}).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#D5CFC4] leading-relaxed">“{rev.quote}”</p>
              </div>
              <div className="border-t border-[#201D18] pt-4 text-xs">
                <p className="font-semibold text-[#F4F1EA]">{rev.name}</p>
                <p className="text-[#9E978B] mt-0.5">
                  {rev.location} · {rev.serviceVisited}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Gift Voucher Banner */}
        <div className="bg-gradient-to-r from-[#17140E] via-[#121215] to-[#15130F] border border-[#332B1E] rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#C8A253]">
              Birthdays · Father’s Day · Corporate Gifting
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
              Send an Instant Room 801 Digital Gift Voucher
            </h3>
            <p className="text-sm text-[#A6A198]">
              Choose from KES 2,500, KES 5,000, KES 10,000, or a signature spa combo—delivered
              via WhatsApp or ready in gold-embossed print.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('vouchers')}
            className="px-5 py-3 bg-[#C8A253] hover:bg-[#D9B76C] text-[#0A0A0B] text-sm font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0"
          >
            Create Gift Voucher
          </button>
        </div>
      </section>

      {/* 6. Greenspot Towers Interactive Location & Map */}
      <GreenspotLocationSection />
    </div>
  );
}
