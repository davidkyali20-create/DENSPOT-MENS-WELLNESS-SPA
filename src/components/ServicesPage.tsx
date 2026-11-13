import {useState} from 'react';
import {ArrowRight, Clock} from 'lucide-react';
import {BUSINESS_INFO, IMAGES, SERVICES, ServiceCategory, SpaService, formatKes} from '../data/spaData';
import {ResilientImage} from './ResilientImage';

interface ServicesPageProps {
  onBookService: (serviceId: string) => void;
  onGoPackages: () => void;
}

const CATEGORIES: ('All' | ServiceCategory)[] = [
  'All',
  'Executive Kinyozi & Grooming',
  'Massage & Body Therapy',
  'Skin, Hand & Foot Care',
];

function ServiceRow({
  service,
  onBook,
}: {
  service: SpaService;
  onBook: (id: string) => void;
}) {
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);
  const activeOption = service.options?.[selectedOptionIdx];
  const displayPrice = activeOption ? activeOption.priceKes : service.priceKes;
  const displayDuration = activeOption ? activeOption.label : service.durationLabel;

  return (
    <div className="bg-[#111114] border border-[#24211B] hover:border-[#3E372A] rounded-sm p-5 sm:p-6 flex flex-col justify-between gap-5 transition-colors">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs text-[#9E978B]">
              {service.category}
              {service.popular && (
                <>
                  <span aria-hidden="true"> · </span>
                  <span className="text-[#C8A253]">Client Favorite</span>
                </>
              )}
            </p>
            <h3 className="font-display text-2xl font-semibold text-[#F4F1EA]">
              {service.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-base sm:text-lg font-semibold text-[#C8A253] tabular-nums">
              {formatKes(displayPrice)}
            </p>
            <p className="text-xs text-[#9E978B] inline-flex items-center gap-1 justify-end tabular-nums">
              <Clock className="w-3 h-3" />
              {displayDuration}
            </p>
          </div>
        </div>

        <p className="text-sm text-[#A6A198] leading-relaxed">{service.description}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#D5CFC4] pt-1">
          {service.highlights.map((hl, idx) => (
            <span key={hl} className="inline-flex items-center gap-3">
              {idx > 0 && (
                <span aria-hidden="true" className="text-[#50493D]">
                  ·
                </span>
              )}
              <span>{hl}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1E1C17] pt-4">
        {service.options ? (
          <div className="inline-flex p-0.5 bg-[#0A0A0B] border border-[#26231D] rounded-sm">
            {service.options.map((opt, idx) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedOptionIdx(idx)}
                className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors tabular-nums ${
                  selectedOptionIdx === idx
                    ? 'bg-[#C8A253] text-[#0A0A0B]'
                    : 'text-[#A6A198] hover:text-[#F4F1EA]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-xs text-[#8D867B]">Complimentary beverage included</span>
        )}

        <button
          type="button"
          onClick={() => onBook(service.id)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1814] hover:bg-[#C8A253] text-[#F4F1EA] hover:text-[#0A0A0B] border border-[#3A3325] hover:border-[#C8A253] text-xs font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0"
        >
          Book Treatment
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ServicesPage({onBookService, onGoPackages}: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | ServiceCategory>('All');

  const filtered =
    activeCategory === 'All'
      ? SERVICES
      : SERVICES.filter((svc) => svc.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-12">
      {/* Header + Visual Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-b border-[#221F1A] pb-12">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C8A253]">
              Transparent KES Rate Card · Room 801
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#F4F1EA] text-balance">
              Our Service Menu
            </h1>
            <p className="text-sm sm:text-base text-[#A6A198] leading-relaxed max-w-2xl">
              Every treatment begins with a brief consultation to tailor clippers, skin
              actives, or massage pressure to your exact comfort. Complimentary espresso,
              fresh juice, or herbal tea is served with every visit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#C8A253] border-[#C8A253] text-[#0A0A0B]'
                      : 'bg-[#121215] border-[#26231D] text-[#D5CFC4] hover:border-[#494134]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="w-full h-[220px] lg:h-full rounded-sm overflow-hidden border border-[#26231D]">
            <ResilientImage
              src={IMAGES.kinyoziCraft}
              alt="Master barber performing hot towel ritual at Denspot Kamakis"
              fallbackTitle="Executive Kinyozi & Spa"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((service) => (
          <ServiceRow key={service.id} service={service} onBook={onBookService} />
        ))}
      </div>

      {/* Cross-sell to Combos & Branch Rate Note */}
      <div className="space-y-6">
        <div className="bg-[#121215] border border-[#2A251C] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#C8A253]">
              Bundles Starting at KES 600
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
              Looking for Haircut + Massage Combos?
            </h2>
            <p className="text-sm text-[#A6A198]">
              Explore our Haircut Grooming Package (KES 600), Massage + Free Haircut Offer (KES 3,500), and VIP Memberships.
            </p>
          </div>
          <button
            type="button"
            onClick={onGoPackages}
            className="px-5 py-3 bg-[#C8A253] hover:bg-[#D9B76C] text-[#0A0A0B] text-sm font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0"
          >
            View Combos &amp; VIP Club
          </button>
        </div>

        <p className="text-xs text-[#9E978B] leading-relaxed">
          {BUSINESS_INFO.rateNote}
        </p>
      </div>
    </div>
  );
}
