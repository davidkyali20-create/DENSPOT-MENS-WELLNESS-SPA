import {useState} from 'react';
import {MessageCircle, X, ArrowUpRight} from 'lucide-react';
import {BUSINESS_INFO} from '../data/spaData';

const QUICK_INQUIRIES = [
  {
    label: 'Check immediate slots today',
    message:
      'Hello Denspot Room 801, do you have an immediate opening today for a haircut or massage?',
  },
  {
    label: 'Friday evening booking',
    message:
      'Hello Denspot, I would like to reserve a Friday evening executive kinyozi + massage slot.',
  },
  {
    label: 'Gift voucher / corporate inquiry',
    message:
      'Hello Denspot, I would like to inquire about purchasing a gift voucher or corporate package.',
  },
  {
    label: 'Parking & directions to Room 801',
    message:
      'Hello Denspot, I am heading to Greenspot Towers in Kamakis. Please confirm parking and Room 801 access.',
  },
];

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp Room 801 Front Desk"
          className="w-[300px] sm:w-[320px] bg-[#16161A] border border-[#2C2C34] rounded-sm shadow-2xl overflow-hidden"
        >
          <div className="px-4 py-3 bg-[#0B0B0D] border-b border-[#26262C] flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#F5F5F7]">
                Room 801 Front Desk
              </p>
              <p className="text-xs text-[#A1A1AA]">
                Direct WhatsApp · {BUSINESS_INFO.phoneDisplay}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp inquiry panel"
              className="p-1.5 text-[#A1A1AA] hover:text-[#F5F5F7] rounded-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 space-y-2">
            <p className="text-xs text-[#A1A1AA] pb-1">
              Tap a topic below to message our Kamakis concierge directly:
            </p>
            {QUICK_INQUIRIES.map((item) => (
              <a
                key={item.label}
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                  item.message
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 w-full px-3 py-2.5 text-left text-xs font-medium text-[#F5F5F7] bg-[#0B0B0D] hover:bg-[#18241C] border border-[#26262C] hover:border-[#497B56] rounded-sm transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#6BC184] shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#18291E] hover:bg-[#1F3526] border border-[#32573E] text-[#E8F6EC] text-xs sm:text-sm font-semibold rounded-sm shadow-lg transition-colors whitespace-nowrap"
      >
        <MessageCircle className="w-4 h-4 text-[#6BC184]" />
        <span>WhatsApp Room 801</span>
      </button>
    </div>
  );
}
