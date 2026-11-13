import {Phone, MessageCircle, MapPin, Clock} from 'lucide-react';
import {BUSINESS_INFO, PageId} from '../data/spaData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({onNavigate}: FooterProps) {
  return (
    <footer className="border-t border-[#24211B] bg-[#070708] text-[#A6A198]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-4">
          <div className="font-display text-2xl font-semibold tracking-[0.14em] text-[#F4F1EA]">
            DENSPOT
          </div>
          <p className="text-sm leading-relaxed text-[#A6A198] max-w-md">
            Executive kinyozi, deep-tissue bodywork, and restorative skincare in the
            quiet privacy of Greenspot Towers, 8th Floor, Room 801 along the Eastern
            Bypass in Kamakis, Ruiru.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#C8A253]">
            <span>Instagram: {BUSINESS_INFO.instagram}</span>
            <span aria-hidden="true" className="text-[#453F35]">
              ·
            </span>
            <span>TikTok: {BUSINESS_INFO.tiktok}</span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h3 className="text-sm font-semibold text-[#F4F1EA] font-sans">Explore</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="hover:text-[#C8A253] transition-colors"
              >
                Services &amp; KES Pricing
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('packages')}
                className="hover:text-[#C8A253] transition-colors"
              >
                Signature Combos &amp; VIP Club
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('vouchers')}
                className="hover:text-[#C8A253] transition-colors"
              >
                Digital Gift Vouchers
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('sanctuary')}
                className="hover:text-[#C8A253] transition-colors"
              >
                Room 801 Gallery &amp; Map
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('booking')}
                className="hover:text-[#C8A253] transition-colors"
              >
                24/7 Online Booking
              </button>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3 text-sm">
          <h3 className="text-sm font-semibold text-[#F4F1EA] font-sans">
            Greenspot Towers · Room 801
          </h3>
          <div className="space-y-2.5">
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C8A253] shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.fullAddress}</span>
            </p>
            <p className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#C8A253] shrink-0 mt-0.5" />
              <span>
                {BUSINESS_INFO.hoursWeekday}
                <br />
                {BUSINESS_INFO.hoursSunday}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`tel:+${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-3 py-2 border border-[#2C2820] hover:border-[#C8A253] text-[#F4F1EA] text-xs font-medium rounded-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C8A253]" />
                {BUSINESS_INFO.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                  'Hello Denspot Room 801, I would like to inquire about booking a session.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#162019] border border-[#294030] hover:border-[#497B56] text-[#D7EDE0] text-xs font-medium rounded-sm transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#67B57E]" />
                WhatsApp Front Desk
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#181612] py-5 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7B766D]">
          <p>© {new Date().getFullYear()} Denspot Men’s Wellness Spa. Kamakis, Ruiru.</p>
          <p>
            Location map powered by Google Maps Platform ·{' '}
            <a
              href="https://maps.google.com/help/terms_maps/?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#A6A198]"
            >
              Google Maps End-User Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
