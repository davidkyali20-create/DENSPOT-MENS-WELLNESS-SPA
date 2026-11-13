import {useState} from 'react';
import {ArrowRight, Check, MessageCircle, Shield} from 'lucide-react';
import {
  BUSINESS_INFO,
  IMAGES,
  SIGNATURE_PACKAGES,
  VIP_MEMBERSHIPS,
  formatKes,
} from '../data/spaData';
import {ResilientImage} from './ResilientImage';

interface PackagesPageProps {
  onBookPackage: (packageId: string) => void;
}

export function PackagesPage({onBookPackage}: PackagesPageProps) {
  const [selectedMembership, setSelectedMembership] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-16">
      {/* Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-b border-[#26262C] pb-12">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#D4AF37]">
            Bundled Experiences &amp; VIP Access
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F5F5F7] text-balance">
            Curated Packages &amp; Memberships
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
            Maximize your time at Greenspot Towers by combining precision barbering, facial
            care, and deep-tissue recovery in a single seamless booking—or join our Monthly
            VIP Grooming Club for priority Friday evening access.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="w-full h-[220px] lg:h-full rounded-sm overflow-hidden border border-[#26262C]">
            <ResilientImage
              src={IMAGES.massageSuite}
              alt="Private spa suite with hot basalt stones at Denspot Room 801"
              fallbackTitle="Signature Spa Packages"
            />
          </div>
        </div>
      </div>

      {/* Signature Combos */}
      <section aria-labelledby="combos-heading" className="space-y-8">
        <div className="space-y-1">
          <h2 id="combos-heading" className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F7]">
            Signature Grooming &amp; Spa Combos
          </h2>
          <p className="text-sm text-[#A1A1AA]">
            Transparent all-inclusive KES rates with zero hidden add-ons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIGNATURE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-[#16161A] rounded-sm border p-6 flex flex-col justify-between gap-6 ${
                pkg.featured
                  ? 'border-[#D4AF37]/70'
                  : 'border-[#26262C]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs">
                  {pkg.featured ? (
                    <span className="px-2 py-0.5 bg-[#C8102E] text-[#F5F5F7] text-[11px] font-semibold tracking-wide rounded-sm">
                      {pkg.savingsLabel}
                    </span>
                  ) : (
                    <span className="text-[#D4AF37] font-medium">{pkg.savingsLabel}</span>
                  )}
                  <span className="text-[#A1A1AA] tabular-nums">{pkg.durationLabel}</span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#F5F5F7]">
                    {pkg.name}
                  </h3>
                  <p className="text-2xl font-semibold text-[#D4AF37] tabular-nums mt-1">
                    {formatKes(pkg.priceKes)}
                  </p>
                </div>

                <p className="text-sm text-[#A1A1AA] leading-relaxed">{pkg.tagline}</p>

                <ul className="space-y-2 border-t border-[#26262C] pt-4 text-xs sm:text-sm text-[#E4E4E7]">
                  {pkg.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onBookPackage(pkg.id)}
                className={`w-full py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-sm transition-colors inline-flex items-center justify-center gap-2 ${
                  pkg.featured
                    ? 'bg-[#C8102E] hover:bg-[#DF193A] text-[#F5F5F7]'
                    : 'bg-[#0B0B0D] hover:bg-[#D4AF37] text-[#F5F5F7] hover:text-[#0B0B0D] border border-[#34343D]'
                }`}
              >
                Book {pkg.name}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly VIP Club */}
      <section
        aria-labelledby="vip-heading"
        className="border-t border-[#26262C] pt-14 space-y-8"
      >
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#D4AF37]">
            Ruiru &amp; Eastern Bypass Regulars
          </p>
          <h2 id="vip-heading" className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F7]">
            Monthly VIP Grooming Club
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Built for gentlemen who stay sharp every week. Members enjoy priority Friday
            evening and Saturday booking slots plus guaranteed monthly savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIP_MEMBERSHIPS.map((tier) => {
            const isSelected = selectedMembership === tier.id;
            return (
              <div
                key={tier.id}
                className={`bg-[#16161A] rounded-sm border p-7 flex flex-col justify-between gap-6 ${
                  tier.featured
                    ? 'border-[#D4AF37]'
                    : 'border-[#26262C]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#D4AF37] font-medium">
                        {tier.featured ? 'All-Access Executive Pass' : 'Essential Monthly Pass'}
                      </p>
                      <h3 className="font-display text-3xl font-semibold text-[#F5F5F7] mt-1">
                        {tier.name}
                      </h3>
                    </div>
                    <Shield className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  </div>

                  <p className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7] tabular-nums">
                    {formatKes(tier.monthlyPriceKes)}{' '}
                    <span className="text-sm font-normal text-[#A1A1AA]">/ Month</span>
                  </p>

                  <p className="text-sm text-[#A1A1AA]">{tier.subtitle}</p>

                  <ul className="space-y-2.5 border-t border-[#26262C] pt-4 text-sm text-[#E4E4E7]">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isSelected ? (
                  <div className="bg-[#162019] border border-[#32573E] rounded-sm p-4 space-y-3">
                    <p className="text-xs text-[#E6F7EB] leading-relaxed">
                      Activate <strong>{tier.name}</strong> directly with our Room 801
                      concierge via WhatsApp or at your next visit.
                    </p>
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                        `Hello Denspot Room 801, I would like to enroll in the ${tier.name} membership (${formatKes(
                          tier.monthlyPriceKes
                        )}/month).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-[#4CAF50] hover:bg-[#5CC060] text-[#07140A] text-xs font-bold rounded-sm transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Activate via WhatsApp Concierge
                    </a>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedMembership(tier.id)}
                    className={`w-full py-3 px-4 text-sm font-semibold rounded-sm transition-colors ${
                      tier.featured
                        ? 'bg-[#D4AF37] hover:bg-[#E2C04D] text-[#0B0B0D]'
                        : 'bg-[#0B0B0D] hover:bg-[#1E1E24] text-[#F5F5F7] border border-[#34343D]'
                    }`}
                  >
                    Enroll in {tier.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-[#26262C] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#A1A1AA] leading-relaxed">
          <p>{BUSINESS_INFO.rateNote}</p>
          <div className="flex items-center gap-3 shrink-0 text-[#D4AF37]">
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 whitespace-nowrap"
            >
              Instagram {BUSINESS_INFO.instagram}
            </a>
            <span aria-hidden="true" className="text-[#52525B]">·</span>
            <a
              href={BUSINESS_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 whitespace-nowrap"
            >
              TikTok {BUSINESS_INFO.tiktok}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
