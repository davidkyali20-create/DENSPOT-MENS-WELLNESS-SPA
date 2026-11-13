import {useState} from 'react';
import {Menu, X} from 'lucide-react';
import {PageId} from '../data/spaData';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

const NAV_ITEMS: {id: PageId; label: string}[] = [
  {id: 'home', label: 'Home'},
  {id: 'services', label: 'Services'},
  {id: 'packages', label: 'Packages'},
  {id: 'vouchers', label: 'Vouchers'},
  {id: 'sanctuary', label: 'Sanctuary'},
];

export function Navbar({activePage, onNavigate, onOpenBooking}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0D]/92 backdrop-blur-md border-b border-[#26262C]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="font-display text-2xl font-semibold tracking-[0.14em] text-[#F5F5F7] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
        >
          DENSPOT
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm ${
                  isActive
                    ? 'text-[#D4AF37]'
                    : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#D4AF37]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA button + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenBooking();
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#F5F5F7] bg-[#C8102E] hover:bg-[#DF193A] transition-colors rounded-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Book Now
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 text-[#F5F5F7] hover:text-[#D4AF37] border border-[#27272E] rounded-sm min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#26262C] bg-[#16161A] px-5 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-3 text-sm font-medium rounded-sm transition-colors ${
                  isActive
                    ? 'text-[#D4AF37] bg-[#0B0B0D]'
                    : 'text-[#F5F5F7] hover:text-[#D4AF37] hover:bg-[#0B0B0D]/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
