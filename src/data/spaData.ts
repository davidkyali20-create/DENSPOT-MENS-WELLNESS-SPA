export type PageId =
  | 'home'
  | 'services'
  | 'packages'
  | 'vouchers'
  | 'sanctuary'
  | 'booking';

export type ServiceCategory =
  | 'Executive Kinyozi & Grooming'
  | 'Massage & Body Therapy'
  | 'Skin, Hand & Foot Care';

export interface ServiceOption {
  label: string;
  durationMins: number;
  priceKes: number;
}

export interface SpaService {
  id: string;
  category: ServiceCategory;
  name: string;
  durationLabel: string;
  durationMins: number;
  priceKes: number;
  options?: ServiceOption[];
  description: string;
  highlights: string[];
  popular?: boolean;
}

export interface SpaPackage {
  id: string;
  name: string;
  durationLabel: string;
  durationMins: number;
  priceKes: number;
  savingsLabel: string;
  tagline: string;
  includes: string[];
  featured?: boolean;
}

export interface MembershipTier {
  id: string;
  name: string;
  monthlyPriceKes: number;
  subtitle: string;
  perks: string[];
  featured?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  specialty: 'kinyozi' | 'massage' | 'skincare' | 'all';
  experienceYears: number;
  bio: string;
}

export interface ClientReview {
  id: string;
  name: string;
  location: string;
  serviceVisited: string;
  rating: number;
  quote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  imageSrc: string;
  aspectClass: string;
}

export const BUSINESS_INFO = {
  brandName: 'Denspot Men’s Wellness Spa',
  shortMark: 'DENSPOT',
  building: 'Greenspot Towers',
  floorSuite: '8th Floor, Room 801',
  streetArea: 'Eastern Bypass, Kamakis, Ruiru',
  fullAddress: 'Greenspot Towers, 8th Floor, Room 801, Eastern Bypass, Kamakis, Ruiru, Kenya',
  otherBranch: 'Kiambu Road Branch',
  rateNote:
    'Promotional offers and pricing may vary slightly between our Kamakis (Greenspot Towers) and Kiambu Road branches. Confirm current seasonal rates on WhatsApp (+254 704 388 221) or Instagram (@denspotmenswellness).',
  phoneDisplay: '+254 704 388 221',
  phoneRaw: '254704388221',
  instagram: '@denspotmenswellness',
  instagramUrl:
    'https://www.instagram.com/denspotmenswellness?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==',
  tiktok: '@denspotmens',
  tiktokUrl: 'https://www.tiktok.com/@denspotmens?is_from_webapp=1&sender_device=pc',
  parking: 'Ample, secure basement and street-level parking available on-site at Greenspot Towers.',
  hoursWeekday: 'Monday – Saturday: 8:30 AM – 9:30 PM',
  hoursSunday: 'Sunday: 10:00 AM – 8:00 PM',
  depositKes: 500,
};

export const IMAGES = {
  logo: '/assets/aistudio/image_9eaf590c.png',
  heroLounge: '/src/assets/images/exec_grooming_suite_1794559268397.webp',
  massageSuite: '/src/assets/images/exec_massage_suite_1794559268380.webp',
  kinyoziCraft: '/src/assets/images/exec_barber_station_1794559269661.webp',
  skincareBar: '/src/assets/images/exec_hammam_suite_1794559270742.webp',
  room801Lounge: '/src/assets/images/exec_retreat_lounge_1794559270242.webp',
};

export const SERVICES: SpaService[] = [
  {
    id: 'exec-haircut',
    category: 'Executive Kinyozi & Grooming',
    name: 'Haircut Grooming Package',
    durationLabel: '45 Mins',
    durationMins: 45,
    priceKes: 600,
    popular: true,
    description:
      'Our signature Kamakis grooming package: precision haircut, mini facial scrub, mini nail care, and a soothing back massage.',
    highlights: ['Precision haircut', 'Mini facial scrub & mini nail care', 'Soothing back massage'],
  },
  {
    id: 'haircut-dye-combo',
    category: 'Executive Kinyozi & Grooming',
    name: 'Haircut + Dye Combo',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 1500,
    description:
      'Precision fade or classic cut paired with rich black dye, natural grey blending, or hair coloring and scalp conditioning.',
    highlights: ['Precision cut & line-up', 'Hair coloring or black dye', 'Scalp hydration finish'],
  },
  {
    id: 'beard-sculpt',
    category: 'Executive Kinyozi & Grooming',
    name: 'Beard Sculpt & Hot Towel Ritual',
    durationLabel: '30 Mins',
    durationMins: 30,
    priceKes: 800,
    description:
      'Detailed beard shaping, hot essential-oil towel compress, straight-razor finish, facial steam, and soothing beard balm conditioning.',
    highlights: ['Hot essential-oil towel', 'Straight-razor line-up', 'Organic beard balm finish'],
  },
  {
    id: 'waxing-shaving',
    category: 'Executive Kinyozi & Grooming',
    name: 'Waxing & Shaving',
    durationLabel: '30–45 Mins',
    durationMins: 40,
    priceKes: 1500,
    description:
      'Clean, hygienic waxing and precision shaving for face, nose, ears, chest, or back with soothing post-care.',
    highlights: ['Single-use applicators', 'Smooth irritation-free finish', 'Discreet private suite'],
  },
  {
    id: 'full-body-massage',
    category: 'Massage & Body Therapy',
    name: 'Full-Body Massage',
    durationLabel: '60 / 90 Mins',
    durationMins: 60,
    priceKes: 3000,
    popular: true,
    options: [
      {label: 'Standard (60 Mins)', durationMins: 60, priceKes: 3000},
      {label: '90-Min Promo', durationMins: 90, priceKes: 2500},
    ],
    description:
      'Smooth, restorative full-body massage using warm aromatic oils to calm the nervous system and relieve Eastern Bypass commute fatigue. Occasional 1 hr 30 min promotional slots available at KES 2,500.',
    highlights: ['Warm aromatic oils', 'Full-body tension relief', 'Seasonal 90-min promo available'],
  },
  {
    id: 'thai-massage',
    category: 'Massage & Body Therapy',
    name: 'Thai Massage',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 3500,
    description:
      'Combines acupressure with guided yoga-like assisted stretching to restore hip and shoulder mobility, improve posture, and boost daytime energy.',
    highlights: ['Assisted stretching', 'Deep acupressure lines', 'Posture & mobility recovery'],
  },
  {
    id: 'deep-tissue',
    category: 'Massage & Body Therapy',
    name: 'Deep Tissue Massage',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 4000,
    popular: true,
    description:
      'Firm, targeted pressure designed to break down chronic muscle knots, relieve lower back stiffness, and speed up post-workout recovery.',
    highlights: ['Targeted myofascial release', 'Warm muscle-relief balm', 'Heated treatment table'],
  },
  {
    id: 'hot-stone',
    category: 'Massage & Body Therapy',
    name: 'Hot Stone Massage',
    durationLabel: '75 Mins',
    durationMins: 75,
    priceKes: 4500,
    popular: true,
    description:
      'Smooth, heated basalt stones placed along key spinal and shoulder tension points to penetrate deep into tired muscles and restore total calm.',
    highlights: ['Heated volcanic basalt stones', 'Deep thermal muscle release', '75-min unhurried session'],
  },
  {
    id: 'four-hands',
    category: 'Massage & Body Therapy',
    name: 'Four-Hands Signature Massage',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 7000,
    description:
      'Two synchronized therapists working in mirror rhythm for an immersive, deeply restorative full-body experience.',
    highlights: ['Two synchronized therapists', 'Private VIP suite', 'Complimentary herbal tonic'],
  },
  {
    id: 'moroccan-bath',
    category: 'Skin, Hand & Foot Care',
    name: 'Moroccan Bath',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 3000,
    popular: true,
    description:
      'Traditional steam-infused Moroccan Hammam cleanse with black soap exfoliation, kessa mitt polish, and nourishing aromatic finish for total skin renewal.',
    highlights: ['Warm Hammam steam chamber', 'Black soap & kessa exfoliation', 'Hydrating botanical rinse'],
  },
  {
    id: 'facials-vip-normal',
    category: 'Skin, Hand & Foot Care',
    name: 'VIP & Normal Facials',
    durationLabel: '45 / 60 Mins',
    durationMins: 45,
    priceKes: 1500,
    popular: true,
    options: [
      {label: 'Normal Facial', durationMins: 45, priceKes: 1500},
      {label: 'VIP Facial', durationMins: 60, priceKes: 3000},
    ],
    description:
      'Targeted men’s skincare to clear congested pores, calm razor bumps, and restore hydration—choose our everyday Normal Facial or upgraded VIP treatment.',
    highlights: ['Warm ozone steam & extraction', 'Anti-razor-burn soothing mask', 'VIP option with extended massage'],
  },
  {
    id: 'steaming-scrub',
    category: 'Skin, Hand & Foot Care',
    name: 'Detox Steaming & Body Scrub',
    durationLabel: '45 Mins',
    durationMins: 45,
    priceKes: 2000,
    description:
      'Private eucalyptus steam session paired with a mineral salt exfoliating scrub and warm rinse to open pores and revitalize tired skin.',
    highlights: ['Private herbal steam session', 'Full-body mineral exfoliation', 'Hydrating post-scrub balm'],
  },
  {
    id: 'manicure-pedicure',
    category: 'Skin, Hand & Foot Care',
    name: 'Executive Manicure & Pedicure',
    durationLabel: '30–60 Mins',
    durationMins: 45,
    priceKes: 1200,
    options: [
      {label: 'Manicure', durationMins: 30, priceKes: 1200},
      {label: 'Pedicure', durationMins: 45, priceKes: 1800},
      {label: 'Mani + Pedi Combo', durationMins: 60, priceKes: 2800},
    ],
    description:
      'Detailed nail trimming, cuticle care, warm eucalyptus foot soak, heel callus smoothing, natural matte buffing, and forearm or calf massage.',
    highlights: ['Natural matte nail finish', 'Warm eucalyptus foot soak', 'Heel callus & tension relief'],
  },
];

export const SIGNATURE_PACKAGES: SpaPackage[] = [
  {
    id: 'pkg-haircut-grooming',
    name: 'Haircut Grooming Package',
    durationLabel: '45 Mins',
    durationMins: 45,
    priceKes: 600,
    savingsLabel: 'Signature Deal · From KES 600',
    tagline: 'Our signature Kamakis grooming bundle—sharp, clean, and refreshing for everyday upkeep.',
    featured: true,
    includes: [
      'Precision Executive Haircut',
      'Mini Facial Scrub',
      'Mini Nail Care',
      'Soothing Back Massage',
    ],
  },
  {
    id: 'pkg-haircut-dye',
    name: 'Haircut + Dye Combo',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 1500,
    savingsLabel: 'Style Bundle',
    tagline: 'Crisp fade or classic cut paired with rich black dye or natural hair coloring.',
    includes: [
      'Precision Haircut & Razor Line-Up',
      'Hair Coloring or Rich Black Dye',
      'Hot Towel Cleanse',
      'Deep Scalp Conditioning',
    ],
  },
  {
    id: 'pkg-massage-free-cut',
    name: 'Massage + Free Haircut Offer',
    durationLabel: '90 Mins',
    durationMins: 90,
    priceKes: 3500,
    savingsLabel: 'Most Popular Promo',
    tagline: 'Full-body therapeutic massage paired with a complimentary executive haircut at Room 801.',
    featured: true,
    includes: [
      'Full-Body Massage Session',
      'Complimentary Precision Haircut',
      'Hot Towel Refreshment',
      'Complimentary Lounge Beverage',
    ],
  },
  {
    id: 'pkg-moroccan-recovery',
    name: 'Moroccan Bath & Deep Tissue Reset',
    durationLabel: '2 Hours',
    durationMins: 120,
    priceKes: 6500,
    savingsLabel: 'Save KES 500',
    tagline: 'Complete skin renewal and deep muscular recovery for weekends and post-travel.',
    includes: [
      '60-Min Traditional Moroccan Bath & Steam',
      '60-Min Deep Tissue Massage',
      'Complimentary Herbal Tea Service',
    ],
  },
];

export const VIP_MEMBERSHIPS: MembershipTier[] = [
  {
    id: 'vip-silver',
    name: 'The Silver Gentleman',
    monthlyPriceKes: 4500,
    subtitle: 'Consistent bi-weekly grooming upkeep for Ruiru & Eastern Bypass regulars.',
    perks: [
      '2 Haircut Grooming Packages per month',
      '1 Normal Facial or Executive Manicure',
      '10% off Full-Body, Thai, or Deep Tissue Massages',
      'Complimentary beverage at Room 801 lounge',
    ],
  },
  {
    id: 'vip-gold',
    name: 'The Gold Executive',
    monthlyPriceKes: 12500,
    subtitle: 'All-access monthly grooming, massage recovery, and priority Friday evening slots.',
    featured: true,
    perks: [
      'Unlimited Haircut Grooming Packages',
      '2 Full-Body or Deep Tissue Massages per month',
      '1 VIP Facial & Executive Pedicure',
      'Priority Friday Evening & Weekend Slot Reservation',
      '15% off Gift Vouchers for family or colleagues',
    ],
  },
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'any',
    name: 'Any Available Specialist',
    role: 'Fastest Slot Confirmation',
    specialty: 'all',
    experienceYears: 6,
    bio: 'Automatically pairs you with our top available barber or certified therapist for your chosen time.',
  },
  {
    id: 'kelvin',
    name: 'Kelvin Njoroge',
    role: 'Master Barber & Grooming Lead',
    specialty: 'kinyozi',
    experienceYears: 9,
    bio: 'Known across Kamakis and Thika Road for razor-clean skin fades, scissor work, and hot towel beard sculpts.',
  },
  {
    id: 'brian',
    name: 'Brian Ochieng',
    role: 'Senior Executive Kinyozi',
    specialty: 'kinyozi',
    experienceYears: 7,
    bio: 'Specialist in executive tapers, grey blending, hairline preservation, and relaxing scalp massages.',
  },
  {
    id: 'grace',
    name: 'Grace Wanjiku',
    role: 'Lead Massage & Esthetics Therapist',
    specialty: 'massage',
    experienceYears: 8,
    bio: 'Certified in clinical deep tissue, heated basalt stone therapy, and men’s corrective deep-cleansing facials.',
  },
  {
    id: 'samuel',
    name: 'Samuel Kamau',
    role: 'Senior Body & Recovery Therapist',
    specialty: 'massage',
    experienceYears: 6,
    bio: 'Focuses on sports deep-tissue recovery, Thai assisted stretching, and lower-back tension release.',
  },
];

export const TESTIMONIALS: ClientReview[] = [
  {
    id: 'rev-1',
    name: 'Brian Kamau',
    location: 'Ruiru · Eastern Bypass',
    serviceVisited: 'Massage + Free Haircut Offer',
    rating: 5,
    quote:
      'Hands down the best executive kinyozi and spa along the Eastern Bypass. The KES 3,500 full-body massage and complimentary haircut deal in Room 801 is unmatched.',
  },
  {
    id: 'rev-2',
    name: 'David Mwangi',
    location: 'Nairobi · Ridgeways',
    serviceVisited: 'Haircut Grooming Package',
    rating: 5,
    quote:
      'Very professional staff and easy parking at Greenspot Towers. Even their KES 600 haircut grooming package comes with a mini facial scrub, nail care, and back massage.',
  },
  {
    id: 'rev-3',
    name: 'Kevin Otieno',
    location: 'Kamakis · Kiambu',
    serviceVisited: 'Moroccan Bath & Deep Tissue',
    rating: 5,
    quote:
      'Booking my Friday evening slot takes 30 seconds with M-Pesa deposit. Being up on the 8th floor in Room 801 means zero street noise and total privacy.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Executive Grooming Lounge',
    subtitle: 'Greenspot Towers · 8th Floor',
    caption: 'Sculpted black leather barber chairs, backlit circular mirrors, walnut cabinetry, and spotless black marble stations.',
    imageSrc: IMAGES.heroLounge,
    aspectClass: 'aspect-[16/9]',
  },
  {
    id: 'gal-2',
    title: 'Private Spa Suites',
    subtitle: 'Sound-Insulated Treatment Rooms',
    caption: 'Climate-controlled suites dressed in crisp dark charcoal linens, heated volcanic basalt stones, and ambient golden glow.',
    imageSrc: IMAGES.massageSuite,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-3',
    title: 'Private Barbering & Facial Station',
    subtitle: 'One-on-One Executive Suite',
    caption: 'Dedicated reclining kinyozi chairs, honed black marble basins, hot steamed towels, and brushed brass fixtures.',
    imageSrc: IMAGES.kinyoziCraft,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-4',
    title: 'Moroccan Bath & Steam Sanctuary',
    subtitle: 'Private Hammam & Scrub Room',
    caption: 'Heated basalt stone seating, gentle aromatic eucalyptus steam, and brushed brass rain fittings for complete skin renewal.',
    imageSrc: IMAGES.skincareBar,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-5',
    title: 'Room 801 Retreat Lounge',
    subtitle: 'Above Eastern Bypass',
    caption: 'Step off the elevator into quiet luxury—charcoal leather seating, smoked walnut walls, and complimentary espresso or herbal tea.',
    imageSrc: IMAGES.room801Lounge,
    aspectClass: 'aspect-[16/9]',
  },
];

export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}
