import {useEffect, useState} from 'react';
import {PageId} from './data/spaData';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import {HomePage} from './components/HomePage';
import {ServicesPage} from './components/ServicesPage';
import {PackagesPage} from './components/PackagesPage';
import {VoucherStudio} from './components/VoucherStudio';
import {SanctuaryPage} from './components/SanctuaryPage';
import {BookingView} from './components/BookingView';
import {WhatsAppWidget} from './components/WhatsAppWidget';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [bookingItemIds, setBookingItemIds] = useState<string[]>(['pkg-executive-reset']);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleStartBooking = (itemIds?: string[]) => {
    if (itemIds && itemIds.length > 0) {
      setBookingItemIds(itemIds);
    }
    navigateTo('booking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#F4F1EA]">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenBooking={() => handleStartBooking()}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage onNavigate={navigateTo} onStartBooking={handleStartBooking} />
        )}
        {activePage === 'services' && (
          <ServicesPage
            onBookService={(id) => handleStartBooking([id])}
            onGoPackages={() => navigateTo('packages')}
          />
        )}
        {activePage === 'packages' && (
          <PackagesPage onBookPackage={(id) => handleStartBooking([id])} />
        )}
        {activePage === 'vouchers' && <VoucherStudio />}
        {activePage === 'sanctuary' && (
          <SanctuaryPage onBookNow={() => handleStartBooking()} />
        )}
        {activePage === 'booking' && (
          <BookingView key={bookingItemIds.join(',')} initialItemIds={bookingItemIds} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      <WhatsAppWidget />
    </div>
  );
}
