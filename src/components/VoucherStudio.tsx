import {FormEvent, useMemo, useState} from 'react';
import {Check, Gift, MessageCircle, Smartphone} from 'lucide-react';
import {BUSINESS_INFO, SIGNATURE_PACKAGES, formatKes} from '../data/spaData';

const PRESET_AMOUNTS = [2500, 5000, 10000];
const OCCASIONS = ['Birthday', 'Father’s Day', 'Anniversary', 'Corporate Appreciation'];

export function VoucherStudio() {
  const [giftMode, setGiftMode] = useState<'amount' | 'package'>('amount');
  const [amountKes, setAmountKes] = useState<number>(5000);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(SIGNATURE_PACKAGES[1].id);
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [recipientName, setRecipientName] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [recipientPhoneOrEmail, setRecipientPhoneOrEmail] = useState<string>('');
  const [personalNote, setPersonalNote] = useState<string>(
    'Take an afternoon off at Room 801. Enjoy an executive grooming & spa reset on me.'
  );
  const [deliveryMethod, setDeliveryMethod] = useState<'whatsapp' | 'email' | 'pickup'>(
    'whatsapp'
  );
  const [paymentChannel, setPaymentChannel] = useState<'mpesa' | 'card'>('mpesa');
  const [payerPhone, setPayerPhone] = useState<string>('+254 ');
  const [error, setError] = useState<string | null>(null);
  const [stkPrompt, setStkPrompt] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  const selectedPackage = useMemo(
    () => SIGNATURE_PACKAGES.find((p) => p.id === selectedPkgId) || SIGNATURE_PACKAGES[0],
    [selectedPkgId]
  );

  const activeTotalKes = giftMode === 'amount' ? amountKes : selectedPackage.priceKes;
  const activeGiftLabel =
    giftMode === 'amount' ? formatKes(amountKes) : selectedPackage.name;

  const validUntil = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d.toLocaleDateString('en-KE', {day: 'numeric', month: 'short', year: 'numeric'});
  }, []);

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (recipientName.trim().length < 2) {
      setError('Please enter the recipient’s name.');
      return;
    }
    if (senderName.trim().length < 2) {
      setError('Please enter your name (From).');
      return;
    }
    if (deliveryMethod !== 'pickup' && recipientPhoneOrEmail.trim().length < 5) {
      setError(
        deliveryMethod === 'whatsapp'
          ? 'Enter recipient WhatsApp number for digital delivery.'
          : 'Enter recipient email address for digital delivery.'
      );
      return;
    }
    if (paymentChannel === 'mpesa' && payerPhone.replace(/\D/g, '').length < 9) {
      setError('Enter your M-Pesa phone number to receive the STK Push.');
      return;
    }

    setStkPrompt(true);
  };

  const completeVoucherOrder = () => {
    const code = `DENSPOT-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(
      100 + Math.random() * 900
    )}`;
    setVoucherCode(code);
    setStkPrompt(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-10 space-y-2">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#C8A253]">
          Digital &amp; Gold-Embossed Gift Cards
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#F4F1EA] text-balance">
          Give the Gift of Relaxation &amp; Style
        </h1>
        <p className="text-sm sm:text-base text-[#A6A198] leading-relaxed">
          For birthdays, Father’s Day, anniversaries, or corporate appreciation. Valid for 6
          months toward any executive kinyozi, massage, or skincare session at Room 801.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Configurator & Checkout */}
        <div className="lg:col-span-7 bg-[#111114] border border-[#25221B] rounded-sm p-5 sm:p-7">
          {voucherCode ? (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#1A2A1E] border border-[#33543C] flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#7AD394]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#C8A253]">
                    Voucher Issued
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
                    Code: {voucherCode}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-[#B5AFA3] leading-relaxed">
                Your {activeGiftLabel} voucher for{' '}
                <strong className="text-[#F4F1EA]">{recipientName}</strong> is active and valid
                until <span className="tabular-nums">{validUntil}</span>.{' '}
                {deliveryMethod === 'pickup'
                  ? 'Your gold-embossed physical card will be ready for pickup at Greenspot Towers, Room 801.'
                  : `We have queued instant delivery via ${
                      deliveryMethod === 'whatsapp' ? 'WhatsApp' : 'Email'
                    } to ${recipientPhoneOrEmail}.`}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                    `Hello Denspot Room 801, I just purchased Gift Voucher ${voucherCode} (${activeGiftLabel}) for ${recipientName}. Delivery: ${deliveryMethod}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3122] hover:bg-[#23402C] border border-[#376345] text-[#E6F7EB] text-sm font-semibold rounded-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#74CE90]" />
                  Share Voucher via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setVoucherCode(null);
                    setRecipientName('');
                  }}
                  className="px-4 py-2.5 text-sm text-[#A6A198] hover:text-[#F4F1EA] underline underline-offset-4"
                >
                  Create Another Voucher
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-6">
              {/* Step 1: Value or Package */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[#F4F1EA]">
                    1. Choose Cash Value or Signature Combo
                  </span>
                  <div className="inline-flex p-0.5 bg-[#0A0A0B] border border-[#26231D] rounded-sm">
                    <button
                      type="button"
                      onClick={() => setGiftMode('amount')}
                      className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                        giftMode === 'amount'
                          ? 'bg-[#C8A253] text-[#0A0A0B]'
                          : 'text-[#A6A198] hover:text-[#F4F1EA]'
                      }`}
                    >
                      Cash Value
                    </button>
                    <button
                      type="button"
                      onClick={() => setGiftMode('package')}
                      className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                        giftMode === 'package'
                          ? 'bg-[#C8A253] text-[#0A0A0B]'
                          : 'text-[#A6A198] hover:text-[#F4F1EA]'
                      }`}
                    >
                      Gift a Combo
                    </button>
                  </div>
                </div>

                {giftMode === 'amount' ? (
                  <div className="grid grid-cols-3 gap-3">
                    {PRESET_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmountKes(amt)}
                        className={`py-3 px-4 rounded-sm border text-sm font-semibold tabular-nums transition-colors ${
                          amountKes === amt
                            ? 'bg-[#1D1911] border-[#C8A253] text-[#C8A253]'
                            : 'bg-[#161519] border-[#26231D] text-[#E5E0D5] hover:border-[#494134]'
                        }`}
                      >
                        {formatKes(amt)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SIGNATURE_PACKAGES.slice(0, 4).map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`text-left p-3 rounded-sm border transition-colors ${
                          selectedPkgId === pkg.id
                            ? 'bg-[#1D1911] border-[#C8A253]'
                            : 'bg-[#161519] border-[#26231D] hover:border-[#494134]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-[#F4F1EA]">
                          <span>{pkg.name}</span>
                          <span className="text-[#C8A253] tabular-nums">
                            {formatKes(pkg.priceKes)}
                          </span>
                        </div>
                        <p className="text-xs text-[#8D867B] mt-1">{pkg.durationLabel}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: Personalize */}
              <div className="space-y-4 border-t border-[#221F1A] pt-5">
                <span className="block text-sm font-semibold text-[#F4F1EA]">
                  2. Personalize Recipient &amp; Note
                </span>

                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccasion(occ)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
                        occasion === occ
                          ? 'bg-[#1D1911] border-[#C8A253] text-[#C8A253]'
                          : 'bg-[#161519] border-[#26231D] text-[#A6A198] hover:text-[#F4F1EA]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="voucher-to" className="block text-xs text-[#D5CFC4] mb-1">
                      Recipient Name
                    </label>
                    <input
                      id="voucher-to"
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Michael Ndegwa"
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0B] border border-[#2B2720] focus:border-[#C8A253] focus:outline-none text-sm text-[#F4F1EA] rounded-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="voucher-from" className="block text-xs text-[#D5CFC4] mb-1">
                      From (Your Name / Company)
                    </label>
                    <input
                      id="voucher-from"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Brenda Wanjiru"
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0B] border border-[#2B2720] focus:border-[#C8A253] focus:outline-none text-sm text-[#F4F1EA] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="voucher-note" className="block text-xs text-[#D5CFC4] mb-1">
                    Personal Message
                  </label>
                  <textarea
                    id="voucher-note"
                    rows={2}
                    maxLength={140}
                    value={personalNote}
                    onChange={(e) => setPersonalNote(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0A0B] border border-[#2B2720] focus:border-[#C8A253] focus:outline-none text-sm text-[#F4F1EA] rounded-sm resize-none"
                  />
                </div>
              </div>

              {/* Step 3: Delivery & Payment */}
              <div className="space-y-4 border-t border-[#221F1A] pt-5">
                <span className="block text-sm font-semibold text-[#F4F1EA]">
                  3. Delivery &amp; M-Pesa / Card Checkout
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {id: 'whatsapp', label: 'WhatsApp Digital'},
                    {id: 'email', label: 'Email PDF Voucher'},
                    {id: 'pickup', label: 'Gold Card Pickup'},
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setDeliveryMethod(opt.id as 'whatsapp' | 'email' | 'pickup')
                      }
                      className={`py-2.5 px-3 text-xs font-medium rounded-sm border transition-colors ${
                        deliveryMethod === opt.id
                          ? 'bg-[#1D1911] border-[#C8A253] text-[#C8A253]'
                          : 'bg-[#161519] border-[#26231D] text-[#C9C3B8]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {deliveryMethod !== 'pickup' && (
                  <div>
                    <label
                      htmlFor="voucher-delivery-target"
                      className="block text-xs text-[#D5CFC4] mb-1"
                    >
                      {deliveryMethod === 'whatsapp'
                        ? 'Recipient WhatsApp Number'
                        : 'Recipient Email Address'}
                    </label>
                    <input
                      id="voucher-delivery-target"
                      type={deliveryMethod === 'email' ? 'email' : 'tel'}
                      value={recipientPhoneOrEmail}
                      onChange={(e) => setRecipientPhoneOrEmail(e.target.value)}
                      placeholder={
                        deliveryMethod === 'whatsapp' ? '+254 7XX XXX XXX' : 'name@company.co.ke'
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0B] border border-[#2B2720] focus:border-[#C8A253] focus:outline-none text-sm text-[#F4F1EA] rounded-sm"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentChannel('mpesa')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-sm border transition-colors ${
                      paymentChannel === 'mpesa'
                        ? 'bg-[#162019] border-[#4CAF50] text-[#E6F7EB]'
                        : 'bg-[#161519] border-[#26231D] text-[#A6A198]'
                    }`}
                  >
                    M-Pesa STK Push
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentChannel('card')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-sm border transition-colors ${
                      paymentChannel === 'card'
                        ? 'bg-[#1D1911] border-[#C8A253] text-[#C8A253]'
                        : 'bg-[#161519] border-[#26231D] text-[#A6A198]'
                    }`}
                  >
                    Visa / Mastercard (Pesapal)
                  </button>
                </div>

                {paymentChannel === 'mpesa' && (
                  <div>
                    <label htmlFor="voucher-payer-phone" className="block text-xs text-[#D5CFC4] mb-1">
                      Your M-Pesa Number for Payment
                    </label>
                    <input
                      id="voucher-payer-phone"
                      type="tel"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="+254 712 345 678"
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0B] border border-[#2B2720] focus:border-[#C8A253] focus:outline-none text-sm text-[#F4F1EA] rounded-sm tabular-nums"
                    />
                  </div>
                )}
              </div>

              {error && (
                <p role="alert" className="text-xs text-[#F28B82] bg-[#2B1514] border border-[#5A2926] p-3 rounded-sm">
                  {error}
                </p>
              )}

              {!stkPrompt ? (
                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-[#C8A253] hover:bg-[#D9B76C] text-[#0A0A0B] text-sm font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 tabular-nums"
                >
                  <Gift className="w-4 h-4" />
                  Buy Digital Voucher · {formatKes(activeTotalKes)}
                </button>
              ) : (
                <div className="bg-[#162019] border border-[#32573E] rounded-sm p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#E6F7EB]">
                    <Smartphone className="w-4 h-4 text-[#74CE90]" />
                    <span>
                      {paymentChannel === 'mpesa'
                        ? `M-Pesa Prompt Sent (${formatKes(activeTotalKes)})`
                        : `Pesapal Secure Card Checkout (${formatKes(activeTotalKes)})`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={completeVoucherOrder}
                      className="flex-1 py-2 px-3 bg-[#4CAF50] hover:bg-[#5CC060] text-[#07140A] text-xs font-bold rounded-sm transition-colors"
                    >
                      Complete &amp; Issue Voucher
                    </button>
                    <button
                      type="button"
                      onClick={() => setStkPrompt(false)}
                      className="py-2 px-3 border border-[#3B5944] text-[#D7EDE0] text-xs rounded-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Right: Live Matte Black & Gold Foil Card Preview */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
          <p className="text-xs text-[#9E978B]">Live Gift Card Preview</p>

          <div className="relative bg-gradient-to-br from-[#191611] via-[#0E0E10] to-[#1C170F] border border-[#C8A253]/50 rounded-sm p-7 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-[#2E271B] pb-4">
              <div>
                <p className="font-display text-2xl font-semibold tracking-[0.14em] text-[#F4F1EA]">
                  DENSPOT
                </p>
                <p className="text-xs text-[#C8A253] mt-0.5">
                  Men’s Wellness Spa · Room 801
                </p>
              </div>
              <span className="text-xs font-medium text-[#D5CFC4]">{occasion}</span>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-[#9E978B]">Gift Value / Treatment</p>
              <p className="font-display text-3xl sm:text-4xl font-semibold text-[#C8A253] tabular-nums">
                {activeGiftLabel}
              </p>
            </div>

            <p className="text-sm italic text-[#D5CFC4] leading-relaxed min-h-[44px]">
              “{personalNote || 'Enjoy an executive grooming and spa reset at Room 801.'}”
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-[#2E271B] pt-4 text-xs">
              <div>
                <p className="text-[#8D867B]">Prepared For</p>
                <p className="text-sm font-semibold text-[#F4F1EA] mt-0.5 truncate">
                  {recipientName || 'Distinguished Guest'}
                </p>
              </div>
              <div>
                <p className="text-[#8D867B]">Presented By</p>
                <p className="text-sm font-semibold text-[#F4F1EA] mt-0.5 truncate">
                  {senderName || 'Your Name'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8D867B] pt-1 tabular-nums">
              <span>Greenspot Towers · Kamakis</span>
              <span>Valid 6 Months · Until {validUntil}</span>
            </div>
          </div>

          <div className="bg-[#121215] border border-[#24211B] rounded-sm p-5 space-y-2 text-xs text-[#A6A198] leading-relaxed">
            <p className="font-semibold text-[#F4F1EA]">Corporate &amp; Bulk Gifting</p>
            <p>
              Ordering 5+ executive vouchers for company leadership, groomsmen, or client
              appreciation? Message our Kamakis front desk on WhatsApp for branded corporate
              envelopes and volume rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
