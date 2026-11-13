import {FormEvent, useMemo, useState} from 'react';
import {
  Calendar,
  Check,
  Clock,
  Download,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  User,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICES,
  SIGNATURE_PACKAGES,
  SPECIALISTS,
  formatKes,
} from '../data/spaData';

export interface SelectableItem {
  id: string;
  name: string;
  durationMins: number;
  priceKes: number;
  type: 'service' | 'package';
}

interface ConfirmedBooking {
  reference: string;
  items: SelectableItem[];
  specialistName: string;
  dateLabel: string;
  timeSlot: string;
  clientName: string;
  phone: string;
  paymentMode: 'deposit' | 'full' | 'lounge';
  paidKes: number;
  totalKes: number;
  reminderChannel: 'whatsapp' | 'sms';
}

interface BookingViewProps {
  initialItemIds: string[];
}

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '06:30 PM',
  '07:30 PM',
  '08:15 PM',
];

function buildUpcomingDays(): {iso: string; dayName: string; dateNum: string; isPeak: boolean}[] {
  const days: {iso: string; dayName: string; dateNum: string; isPeak: boolean}[] = [];
  const base = new Date();
  for (let i = 0; i < 10; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const dayIdx = d.getDay();
    days.push({
      iso: d.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : d.toLocaleDateString('en-KE', {weekday: 'short'}),
      dateNum: d.toLocaleDateString('en-KE', {day: 'numeric', month: 'short'}),
      isPeak: dayIdx === 5 || dayIdx === 6,
    });
  }
  return days;
}

export function BookingView({initialItemIds}: BookingViewProps) {
  const allBookable: SelectableItem[] = useMemo(
    () => [
      ...SIGNATURE_PACKAGES.map((p) => ({
        id: p.id,
        name: p.name,
        durationMins: p.durationMins,
        priceKes: p.priceKes,
        type: 'package' as const,
      })),
      ...SERVICES.map((s) => ({
        id: s.id,
        name: s.name,
        durationMins: s.durationMins,
        priceKes: s.priceKes,
        type: 'service' as const,
      })),
    ],
    []
  );

  const upcomingDays = useMemo(() => buildUpcomingDays(), []);

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    initialItemIds.length > 0 ? initialItemIds : ['pkg-haircut-grooming']
  );
  const [specialistId, setSpecialistId] = useState<string>('any');
  const [selectedDateIso, setSelectedDateIso] = useState<string>(upcomingDays[0].iso);
  const [selectedTime, setSelectedTime] = useState<string>('05:30 PM');

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('+254 ');
  const [notes, setNotes] = useState('');
  const [reminderChannel, setReminderChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [paymentMode, setPaymentMode] = useState<'deposit' | 'full' | 'lounge'>('deposit');

  const [formError, setFormError] = useState<string | null>(null);
  const [stkStep, setStkStep] = useState<'idle' | 'prompting' | 'processing'>('idle');
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);

  const selectedItems = useMemo(
    () => allBookable.filter((item) => selectedIds.includes(item.id)),
    [allBookable, selectedIds]
  );

  const totals = useMemo(() => {
    const totalKes = selectedItems.reduce((sum, item) => sum + item.priceKes, 0);
    const totalMins = selectedItems.reduce((sum, item) => sum + item.durationMins, 0);
    const depositAmount =
      totalKes < 1500 ? Math.min(300, totalKes) : Math.min(BUSINESS_INFO.depositKes, totalKes);
    const dueNowKes =
      paymentMode === 'deposit'
        ? depositAmount
        : paymentMode === 'full'
        ? totalKes
        : 0;
    return {totalKes, totalMins, depositAmount, dueNowKes};
  }, [selectedItems, paymentMode]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const selectedDayMeta =
    upcomingDays.find((d) => d.iso === selectedDateIso) || upcomingDays[0];
  const selectedSpecialist =
    SPECIALISTS.find((s) => s.id === specialistId) || SPECIALISTS[0];

  const isUnavailableSlot = (slot: string) => {
    if (selectedDateIso === upcomingDays[0].iso && slot === '09:00 AM') return true;
    if (selectedDayMeta.isPeak && slot === '06:30 PM' && specialistId === 'kelvin') return true;
    return false;
  };

  const finalizeBooking = () => {
    const refCode = `DSP-801-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmed({
      reference: refCode,
      items: selectedItems,
      specialistName: selectedSpecialist.name,
      dateLabel: `${selectedDayMeta.dayName}, ${selectedDayMeta.dateNum}`,
      timeSlot: selectedTime,
      clientName: clientName.trim(),
      phone: phone.trim(),
      paymentMode,
      paidKes: totals.dueNowKes,
      totalKes: totals.totalKes,
      reminderChannel,
    });
    setStkStep('idle');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (selectedItems.length === 0) {
      setFormError('Select at least one treatment or package.');
      return;
    }
    if (clientName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9) {
      setFormError('Enter a valid Kenyan mobile number for M-Pesa & reminders (e.g. +254 712 345 678).');
      return;
    }

    if (paymentMode === 'lounge') {
      finalizeBooking();
    } else {
      setStkStep('prompting');
    }
  };

  const handleConfirmStkPush = () => {
    setStkStep('processing');
    window.setTimeout(() => {
      finalizeBooking();
    }, 1100);
  };

  const handleDownloadIcs = () => {
    if (!confirmed) return;
    const summary = `Denspot Room 801: ${confirmed.items.map((i) => i.name).join(' + ')}`;
    const description = `Reference: ${confirmed.reference}\\nSpecialist: ${confirmed.specialistName}\\nLocation: ${BUSINESS_INFO.fullAddress}\\nPhone: ${BUSINESS_INFO.phoneDisplay}`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Denspot Mens Wellness Spa//Booking//EN',
      'BEGIN:VEVENT',
      `UID:${confirmed.reference}@denspotwellness.co.ke`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${BUSINESS_INFO.fullAddress}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], {type: 'text/calendar;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${confirmed.reference}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (confirmed) {
    const whatsappSummary = `Hello Denspot Room 801, my booking ${confirmed.reference} is confirmed for ${confirmed.dateLabel} at ${confirmed.timeSlot} with ${confirmed.specialistName} (${confirmed.items
      .map((i) => i.name)
      .join(', ')}). Client: ${confirmed.clientName} (${confirmed.phone}).`;

    return (
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="bg-[#16161A] border border-[#D4AF37]/50 rounded-sm p-6 sm:p-10 space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-[#26262C] pb-6">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#D4AF37]">
                Reservation Confirmed
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F7] mt-1">
                See You at Room 801
              </h2>
            </div>
            <div className="w-10 h-10 rounded-sm bg-[#1A2A1E] border border-[#33543C] flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-[#7AD394]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div className="space-y-1">
              <p className="text-xs text-[#A1A1AA]">Booking Reference</p>
              <p className="font-semibold text-[#D4AF37] tabular-nums">{confirmed.reference}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-[#A1A1AA]">Date &amp; Time</p>
              <p className="font-semibold text-[#F5F5F7] tabular-nums">
                {confirmed.dateLabel} · {confirmed.timeSlot}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-[#A1A1AA]">Specialist</p>
              <p className="font-semibold text-[#F5F5F7]">{confirmed.specialistName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-[#A1A1AA]">Payment Status</p>
              <p className="font-semibold text-[#F5F5F7] tabular-nums">
                {confirmed.paidKes > 0
                  ? `${formatKes(confirmed.paidKes)} Paid via M-Pesa (Balance: ${formatKes(
                      confirmed.totalKes - confirmed.paidKes
                    )})`
                  : `Pay ${formatKes(confirmed.totalKes)} at Room 801 Lounge`}
              </p>
            </div>
          </div>

          <div className="border-t border-[#26262C] pt-5 space-y-2">
            <p className="text-xs text-[#A1A1AA]">Selected Treatments</p>
            <ul className="space-y-1.5 text-sm text-[#E4E4E7]">
              {confirmed.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between tabular-nums">
                  <span>{item.name}</span>
                  <span>{formatKes(item.priceKes)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0B0B0D] border border-[#26262C] p-4 rounded-sm text-xs text-[#A1A1AA] leading-relaxed">
            Automated {confirmed.reminderChannel === 'whatsapp' ? 'WhatsApp' : 'SMS'} reminder
            scheduled for 2 hours prior to your slot at {confirmed.phone}. Basement parking is
            available on arrival at Greenspot Towers.
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                whatsappSummary
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3122] hover:bg-[#23402C] border border-[#376345] text-[#E6F7EB] text-sm font-semibold rounded-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#74CE90]" />
              Send to Front Desk WhatsApp
            </a>
            <button
              type="button"
              onClick={handleDownloadIcs}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B0B0D] hover:bg-[#1E1E24] border border-[#2F2F38] text-[#F5F5F7] text-sm font-medium rounded-sm transition-colors"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" />
              Add to Calendar (.ics)
            </button>
            <button
              type="button"
              onClick={() => setConfirmed(null)}
              className="px-4 py-2.5 text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F7] underline underline-offset-4"
            >
              Book Another Session
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-10 space-y-2">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#D4AF37]">
          24/7 Online Scheduling · Room 801
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#F5F5F7] text-balance">
          Book Your Session
        </h1>
        <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
          Select your grooming or spa treatments, choose your specialist, and lock in your
          Greenspot Towers slot with optional M-Pesa STK Push deposit.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Steps 1–3 */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Services & Packages */}
          <div className="bg-[#16161A] border border-[#26262C] rounded-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-[#26262C] pb-3">
              <h2 className="font-display text-2xl font-semibold text-[#F5F5F7]">
                01. Choose Treatments or Combos
              </h2>
              <span className="text-xs text-[#D4AF37] tabular-nums">
                {selectedItems.length} selected
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium text-[#A1A1AA]">Signature Combos</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SIGNATURE_PACKAGES.map((pkg) => {
                  const active = selectedIds.includes(pkg.id);
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => toggleItem(pkg.id)}
                      className={`text-left p-3.5 rounded-sm border transition-colors ${
                        active
                          ? 'bg-[#0B0B0D] border-[#D4AF37] text-[#F5F5F7]'
                          : 'bg-[#0B0B0D]/60 border-[#26262C] text-[#E4E4E7] hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold">{pkg.name}</span>
                        <span className="text-xs font-semibold text-[#D4AF37] tabular-nums shrink-0">
                          {formatKes(pkg.priceKes)}
                        </span>
                      </div>
                      <p className="text-xs text-[#A1A1AA] mt-1 tabular-nums">
                        {pkg.durationLabel} · {pkg.savingsLabel}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs font-medium text-[#A1A1AA] pt-3">
                Individual Kinyozi, Massage &amp; Skincare
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {SERVICES.map((svc) => {
                  const active = selectedIds.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleItem(svc.id)}
                      className={`text-left p-3 rounded-sm border transition-colors ${
                        active
                          ? 'bg-[#0B0B0D] border-[#D4AF37] text-[#F5F5F7]'
                          : 'bg-[#0B0B0D]/60 border-[#26262C] text-[#E4E4E7] hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs sm:text-sm font-medium">{svc.name}</span>
                        <span className="text-xs font-semibold text-[#D4AF37] tabular-nums shrink-0">
                          {formatKes(svc.priceKes)}
                        </span>
                      </div>
                      <p className="text-xs text-[#A1A1AA] mt-1 tabular-nums">
                        {svc.durationLabel} · {svc.category.split(' ')[0]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Specialist */}
          <div className="bg-[#16161A] border border-[#26262C] rounded-sm p-5 sm:p-6 space-y-4">
            <h2 className="font-display text-2xl font-semibold text-[#F5F5F7] border-b border-[#26262C] pb-3">
              02. Preferred Barber or Therapist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPECIALISTS.map((spec) => {
                const active = specialistId === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setSpecialistId(spec.id)}
                    className={`text-left p-3.5 rounded-sm border transition-colors ${
                      active
                        ? 'bg-[#0B0B0D] border-[#D4AF37]'
                        : 'bg-[#0B0B0D]/60 border-[#26262C] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#F5F5F7]">{spec.name}</span>
                      <User className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    </div>
                    <p className="text-xs text-[#D4AF37] mt-0.5">{spec.role}</p>
                    <p className="text-xs text-[#A1A1AA] mt-1.5 line-clamp-2">{spec.bio}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Date & Time */}
          <div className="bg-[#16161A] border border-[#26262C] rounded-sm p-5 sm:p-6 space-y-5">
            <h2 className="font-display text-2xl font-semibold text-[#F5F5F7] border-b border-[#26262C] pb-3">
              03. Pick Date &amp; Time Slot
            </h2>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Select Day
                </span>
                <span>Fri–Sat slots fill fastest</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {upcomingDays.map((day) => {
                  const active = day.iso === selectedDateIso;
                  return (
                    <button
                      key={day.iso}
                      type="button"
                      onClick={() => setSelectedDateIso(day.iso)}
                      className={`p-2.5 text-center rounded-sm border transition-colors ${
                        active
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B0B0D]'
                          : 'bg-[#0B0B0D]/60 border-[#26262C] text-[#F5F5F7] hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <p className="text-xs font-semibold">{day.dayName}</p>
                      <p className="text-[11px] opacity-85 tabular-nums mt-0.5">{day.dateNum}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Available Times (East Africa Time)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const unavailable = isUnavailableSlot(slot);
                  const active = selectedTime === slot && !unavailable;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={unavailable}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 px-2 text-xs font-medium rounded-sm border tabular-nums transition-colors ${
                        unavailable
                          ? 'bg-[#0B0B0D]/30 border-[#1F1F26] text-[#52525B] line-through cursor-not-allowed'
                          : active
                          ? 'bg-[#0B0B0D] border-[#D4AF37] text-[#D4AF37] font-semibold'
                          : 'bg-[#0B0B0D]/60 border-[#26262C] text-[#F5F5F7] hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Client Details, Summary & M-Pesa STK Push Checkout */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 bg-[#16161A] border border-[#2F2F38] rounded-sm p-5 sm:p-6 space-y-5">
          <div className="border-b border-[#26262C] pb-4">
            <h2 className="font-display text-2xl font-semibold text-[#F5F5F7]">
              04. Your Details &amp; Checkout
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-1 tabular-nums">
              {selectedDayMeta.dayName}, {selectedDayMeta.dateNum} at {selectedTime} ·{' '}
              {selectedSpecialist.name}
            </p>
          </div>

          <div className="space-y-2 border-b border-[#26262C] pb-4 text-sm">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-2 tabular-nums">
                <span className="text-[#E4E4E7]">
                  {item.name}{' '}
                  <span className="text-xs text-[#A1A1AA]">({item.durationMins}m)</span>
                </span>
                <span className="font-medium text-[#F5F5F7] shrink-0">
                  {formatKes(item.priceKes)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 text-sm font-semibold text-[#F5F5F7] border-t border-[#26262C] tabular-nums">
              <span>Total ({totals.totalMins} mins)</span>
              <span className="text-[#D4AF37]">{formatKes(totals.totalKes)}</span>
            </div>
          </div>

          <div className="space-y-3.5">
            <div>
              <label htmlFor="booking-name" className="block text-xs font-medium text-[#E4E4E7] mb-1">
                Full Name
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. James Kariuki"
                className="w-full px-3.5 py-2.5 bg-[#0B0B0D] border border-[#2C2C34] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F5F7] rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="booking-phone" className="block text-xs font-medium text-[#E4E4E7] mb-1">
                M-Pesa / WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-3" />
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 712 345 678"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#0B0B0D] border border-[#2C2C34] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F5F7] rounded-sm tabular-nums"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-xs font-medium text-[#E4E4E7] mb-1">
                Preferences (Optional)
              </label>
              <input
                id="booking-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Firm pressure, skin fade #1, espresso on arrival"
                className="w-full px-3.5 py-2.5 bg-[#0B0B0D] border border-[#2C2C34] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F5F7] rounded-sm"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs text-[#A1A1AA]">Automated Reminder:</span>
              <div className="inline-flex p-0.5 bg-[#0B0B0D] border border-[#27272E] rounded-sm">
                {(['whatsapp', 'sms'] as const).map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setReminderChannel(channel)}
                    className={`px-3 py-1 text-xs font-medium rounded-sm capitalize transition-colors ${
                      reminderChannel === channel
                        ? 'bg-[#D4AF37] text-[#0B0B0D]'
                        : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                    }`}
                  >
                    {channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-2 border-t border-[#26262C] pt-4">
            <p className="text-xs font-medium text-[#E4E4E7]">Payment Preference</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPaymentMode('deposit')}
                className={`w-full text-left p-3 rounded-sm border transition-colors ${
                  paymentMode === 'deposit'
                    ? 'bg-[#0B0B0D] border-[#D4AF37]'
                    : 'bg-[#0B0B0D]/60 border-[#26262C]'
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#F5F5F7]">
                  <span>M-Pesa Booking Deposit</span>
                  <span className="text-[#D4AF37] tabular-nums">
                    {formatKes(totals.depositAmount)}
                  </span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Locks peak Friday &amp; weekend slots; balance paid in Room 801.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('full')}
                className={`w-full text-left p-3 rounded-sm border transition-colors ${
                  paymentMode === 'full'
                    ? 'bg-[#0B0B0D] border-[#D4AF37]'
                    : 'bg-[#0B0B0D]/60 border-[#26262C]'
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#F5F5F7]">
                  <span>Full M-Pesa Express Checkout</span>
                  <span className="text-[#D4AF37] tabular-nums">
                    {formatKes(totals.totalKes)}
                  </span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Walk out refreshed with zero checkout wait.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('lounge')}
                className={`w-full text-left p-3 rounded-sm border transition-colors ${
                  paymentMode === 'lounge'
                    ? 'bg-[#0B0B0D] border-[#D4AF37]'
                    : 'bg-[#0B0B0D]/60 border-[#26262C]'
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#F5F5F7]">
                  <span>Pay at Room 801 Lounge</span>
                  <span className="text-[#A1A1AA] tabular-nums">KES 0 Now</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Settle via M-Pesa Till or Card after your treatment.
                </p>
              </button>
            </div>
          </div>

          {formError && (
            <p role="alert" className="text-xs text-[#FCA5A5] bg-[#2D1218] border border-[#C8102E]/60 p-3 rounded-sm">
              {formError}
            </p>
          )}

          {stkStep === 'idle' ? (
            <button
              type="submit"
              className="w-full py-3 px-5 bg-[#C8102E] hover:bg-[#DF193A] text-[#F5F5F7] text-sm font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              {paymentMode === 'lounge'
                ? 'Confirm Appointment'
                : `Send M-Pesa STK Push (${formatKes(totals.dueNowKes)})`}
            </button>
          ) : (
            <div className="bg-[#162019] border border-[#32573E] rounded-sm p-4 space-y-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#E6F7EB]">
                <Smartphone className="w-4 h-4 text-[#74CE90]" />
                <span>
                  {stkStep === 'processing'
                    ? 'Verifying M-Pesa Transaction…'
                    : 'M-Pesa STK Push Sent to Your Phone'}
                </span>
              </div>
              <p className="text-xs text-[#BFD8C7] leading-relaxed tabular-nums">
                Check <strong className="text-white">{phone}</strong> for the Lipa na M-Pesa
                prompt for <strong className="text-white">{formatKes(totals.dueNowKes)}</strong>{' '}
                to Denspot Men’s Wellness Spa.
              </p>
              {stkStep === 'prompting' && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleConfirmStkPush}
                    className="flex-1 py-2 px-3 bg-[#4CAF50] hover:bg-[#5CC060] text-[#07140A] text-xs font-bold rounded-sm transition-colors"
                  >
                    Simulate M-Pesa PIN Entered
                  </button>
                  <button
                    type="button"
                    onClick={() => setStkStep('idle')}
                    className="py-2 px-3 border border-[#3B5944] text-[#D7EDE0] text-xs rounded-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
