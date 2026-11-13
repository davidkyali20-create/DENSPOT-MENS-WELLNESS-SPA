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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-b border-[#221F1A] pb-12">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C8A253]">
            Bundled Experiences &amp; VIP Access
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F4F1EA] text-balance">
            Curated Packages &amp; Memberships
          </h1>
          <p className="text-sm sm:text-base text-[#A6A198] leading-relaxed max-w-2xl">
            Maximize your time at Greenspot Towers by combining precision barbering, facial
            care, and deep-tissue recovery in a single seamless booking—or join our Monthly
            VIP Grooming Club for priority Friday evening access.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="w-full h-[220px] lg:h-full rounded-sm overflow-hidden border border-[#26231D]">
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
          <h2 id="combos-heading" className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F1EA]">
            Signature Grooming &amp; Spa Combos
          </h2>
          <p className="text-sm text-[#A6A198]">
            Transparent all-inclusive KES rates with zero hidden add-ons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIGNATURE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-sm border p-6 flex flex-col justify-between gap-6 ${
                pkg.featured
                  ? 'bg-[#15130F] border-[#C8A253]/70'
                  : 'bg-[#111114] border-[#24211B]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#C8A253] font-medium">{pkg.savingsLabel}</span>
                  <span className="text-[#9E978B] tabular-nums">{pkg.durationLabel}</span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#F4F1EA]">
                    {pkg.name}
                  </h3>
                  <p className="text-2xl font-semibold text-[#C8A253] tabular-nums mt-1">
                    {formatKes(pkg.priceKes)}
                  </p>
                </div>

                <p className="text-sm text-[#A6A198] leading-relaxed">{pkg.tagline}</p>

                <ul className="space-y-2 border-t border-[#221F1A] pt-4 text-xs sm:text-sm text-[#D5CFC4]">
                  {pkg.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C8A253] shrink-0 mt-0.5" />
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
                    ? 'bg-[#C8A253] hover:bg-[#D9B76C] text-[#0A0A0B]'
                    : 'bg-[#1A1814] hover:bg-[#C8A253] text-[#F4F1EA] hover:text-[#0A0A0B] border border-[#352F23]'
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
        className="border-t border-[#221F1A] pt-14 space-y-8"
      >
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C8A253]">
            Ruiru &amp; Eastern Bypass Regulars
          </p>
          <h2 id="vip-heading" className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F1EA]">
            Monthly VIP Grooming Club
          </h2>
          <p className="text-sm text-[#A6A198] leading-relaxed">
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
                className={`rounded-sm border p-7 flex flex-col justify-between gap-6 ${
                  tier.featured
                    ? 'bg-gradient-to-br from-[#191610] to-[#111114] border-[#C8A253]'
                    : 'bg-[#111114] border-[#26231D]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#C8A253] font-medium">
                        {tier.featured ? 'All-Access Executive Pass' : 'Essential Monthly Pass'}
                      </p>
                      <h3 className="font-display text-3xl font-semibold text-[#F4F1EA] mt-1">
                        {tier.name}
                      </h3>
                    </div>
                    <Shield className="w-5 h-5 text-[#C8A253] shrink-0" />
                  </div>

                  <p className="text-2xl sm:text-3xl font-semibold text-[#F4F1EA] tabular-nums">
                    {formatKes(tier.monthlyPriceKes)}{' '}
                    <span className="text-sm font-normal text-[#9E978B]">/ Month</span>
                  </p>

                  <p className="text-sm text-[#A6A198]">{tier.subtitle}</p>

                  <ul className="space-y-2.5 border-t border-[#26221B] pt-4 text-sm text-[#E5E0D5]">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#C8A253] shrink-0 mt-0.5" />
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
                        ? 'bg-[#C8A253] hover:bg-[#D9B76C] text-[#0A0A0B]'
                        : 'bg-[#1A1814] hover:bg-[#26221C] text-[#F4F1EA] border border-[#352F23]'
                    }`}
                  >
                    Enroll in {tier.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-[#9E978B] border-t border-[#221F1A] pt-6 leading-relaxed">
          {BUSINESS_INFO.rateNote}
        </p>
      </section>
    </div>
  );
}
