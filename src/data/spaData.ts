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
  phoneDisplay: '+254 704 388 221',
  phoneRaw: '254704388221',
  instagram: '@denspotmenswellness',
  tiktok: '@denspotmens',
  parking: 'Ample, secure basement and street-level parking available on-site at Greenspot Towers.',
  hoursWeekday: 'Monday – Saturday: 8:30 AM – 9:30 PM',
  hoursSunday: 'Sunday: 10:00 AM – 8:00 PM',
  depositKes: 500,
};

export const IMAGES = {
  heroLounge: '/src/assets/images/hero_grooming_lounge_1794557437319.jpg',
  massageSuite: '/src/assets/images/suite_massage_sanctuary_1794557437935.jpg',
  kinyoziCraft: '/src/assets/images/service_kinyozi_craft_1794557438175.jpg',
  skincareBar: '/src/assets/images/service_skincare_bar_1794557439935.jpg',
  room801Lounge: '/src/assets/images/room_801_lounge_retreat_1794557438991.jpg',
};

export const SERVICES: SpaService[] = [
  {
    id: 'exec-haircut',
    category: 'Executive Kinyozi & Grooming',
    name: 'The Denspot Executive Haircut',
    durationLabel: '45 Mins',
    durationMins: 45,
    priceKes: 1800,
    popular: true,
    description:
      'Precision fade or classic scissor cut, razor neck line-up, invigorating face scrub, hair wash, and a relaxing 15-minute neck and shoulder massage.',
    highlights: ['Precision fade or scissor cut', 'Hot towel & face scrub', '15-min neck & shoulder massage'],
  },
  {
    id: 'beard-sculpt',
    category: 'Executive Kinyozi & Grooming',
    name: 'Beard Sculpt & Hot Towel Ritual',
    durationLabel: '30 Mins',
    durationMins: 30,
    priceKes: 1200,
    description:
      'Detailed beard shaping, hot essential-oil towel compress, straight-razor finish, facial steam, and soothing beard balm conditioning.',
    highlights: ['Hot essential-oil towel', 'Straight-razor line-up', 'Organic beard balm finish'],
  },
  {
    id: 'kids-cut',
    category: 'Executive Kinyozi & Grooming',
    name: 'Kids’ Executive Cut (Under 14)',
    durationLabel: '30 Mins',
    durationMins: 30,
    priceKes: 1000,
    description:
      'Patient, stylish haircuts for young gentlemen in a calm, spotless private setting.',
    highlights: ['Gentle styling & line-up', 'Hair wash included', 'Calm private chair'],
  },
  {
    id: 'hair-color',
    category: 'Executive Kinyozi & Grooming',
    name: 'Hair Coloring, Black Dye & Texturizing',
    durationLabel: '45 Mins',
    durationMins: 45,
    priceKes: 2200,
    description:
      'Natural-looking grey blending, rich black dye, or curls enhancement paired with a deep-conditioning scalp hydration therapy.',
    highlights: ['Ammonia-free color options', 'Scalp hydration mask', 'Natural hairline finish'],
  },
  {
    id: 'gent-waxing',
    category: 'Executive Kinyozi & Grooming',
    name: 'Gentleman’s Waxing & Grooming',
    durationLabel: '30–45 Mins',
    durationMins: 35,
    priceKes: 1500,
    description:
      'Clean, hygienic, low-irritation hard wax grooming for nose, ears, eyebrows, chest, or back.',
    highlights: ['Single-use applicators', 'Soothing aloe post-care', 'Discreet private suite'],
  },
  {
    id: 'deep-tissue',
    category: 'Massage & Body Therapy',
    name: 'Deep Tissue Massage',
    durationLabel: '60 / 90 Mins',
    durationMins: 60,
    priceKes: 4000,
    popular: true,
    options: [
      {label: '60 Mins', durationMins: 60, priceKes: 4000},
      {label: '90 Mins', durationMins: 90, priceKes: 5500},
    ],
    description:
      'Firm, targeted pressure designed to break down chronic muscle knots, relieve lower back stiffness, and speed up post-workout recovery.',
    highlights: ['Targeted myofascial release', 'Warm muscle-relief balm', 'Heated treatment table'],
  },
  {
    id: 'swedish-massage',
    category: 'Massage & Body Therapy',
    name: 'Swedish Relaxation Massage',
    durationLabel: '60 / 90 Mins',
    durationMins: 60,
    priceKes: 3500,
    options: [
      {label: '60 Mins', durationMins: 60, priceKes: 3500},
      {label: '90 Mins', durationMins: 90, priceKes: 4800},
    ],
    description:
      'Smooth, rhythmic strokes using warm aromatic oils to calm the nervous system, improve circulation, and melt away Eastern Bypass commute stress.',
    highlights: ['Warm cedarwood & eucalyptus oil', 'Full-body rhythmic flow', 'Sound-insulated suite'],
  },
  {
    id: 'hot-stone',
    category: 'Massage & Body Therapy',
    name: 'Hot Stone Therapy',
    durationLabel: '75 Mins',
    durationMins: 75,
    priceKes: 4500,
    popular: true,
    description:
      'Smooth, heated basalt stones placed along key spinal and shoulder tension points to penetrate deep into tired muscles and restore total calm.',
    highlights: ['Heated volcanic basalt stones', 'Deep thermal muscle release', '75-min unhurried session'],
  },
  {
    id: 'thai-stretch',
    category: 'Massage & Body Therapy',
    name: 'Thai Assisted Stretching & Massage',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 4200,
    description:
      'Combines acupressure with guided yoga-like stretches to restore hip and shoulder mobility, improve posture, and boost daytime energy.',
    highlights: ['Joint mobility focus', 'Deep acupressure lines', 'Ideal for desk executives & runners'],
  },
  {
    id: 'four-hands',
    category: 'Massage & Body Therapy',
    name: 'Four-Hands Signature Massage',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 7500,
    description:
      'Two synchronized master therapists working in mirror rhythm for an immersive, deeply restorative full-body experience.',
    highlights: ['Two synchronized therapists', 'Private VIP suite', 'Complimentary herbal tonic'],
  },
  {
    id: 'deep-facial',
    category: 'Skin, Hand & Foot Care',
    name: 'Gentleman’s Deep-Cleansing Facial',
    durationLabel: '45 Mins',
    durationMins: 45,
    priceKes: 3200,
    popular: true,
    description:
      'Formulated specifically for men’s thicker skin to unclog pores, calm razor bumps and irritation, and hydrate using steam, exfoliation, and a charcoal mask.',
    highlights: ['Warm ozone steam', 'Gentle pore extraction', 'Anti-razor-burn soothing mask'],
  },
  {
    id: 'body-scrub',
    category: 'Skin, Hand & Foot Care',
    name: 'Full-Body Exfoliating Scrub & Steam',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 4000,
    description:
      'Mineral-rich sea salt and coffee polish followed by a detoxifying steam session and hydrating shea finish to leave skin smooth and revitalized.',
    highlights: ['Dead sea mineral & coffee polish', 'Detoxifying private steam', 'Hot shower & shea hydration'],
  },
  {
    id: 'exec-manicure',
    category: 'Skin, Hand & Foot Care',
    name: 'Executive Manicure',
    durationLabel: '30 Mins',
    durationMins: 30,
    priceKes: 1500,
    description:
      'Clean nail trimming, natural matte buffing, cuticle detailing, exfoliating hand scrub, and a hydrating forearm massage.',
    highlights: ['Natural matte finish', 'Cuticle & hangnail care', 'Forearm tension massage'],
  },
  {
    id: 'exec-pedicure',
    category: 'Skin, Hand & Foot Care',
    name: 'Executive Pedicure',
    durationLabel: '45 Mins',
    durationMins: 45,
    priceKes: 2200,
    description:
      'Warm herbal foot soak, heel callus smoothing, precise nail care, exfoliating leg scrub, and a tension-relieving calf and foot massage.',
    highlights: ['Eucalyptus warm foot soak', 'Callus & heel smoothing', '15-min foot reflexology'],
  },
];

export const SIGNATURE_PACKAGES: SpaPackage[] = [
  {
    id: 'pkg-quick-refresh',
    name: 'The Quick Refresh',
    durationLabel: '60 Mins',
    durationMins: 60,
    priceKes: 3200,
    savingsLabel: 'Save KES 500',
    tagline: 'Ideal for lunch breaks or a sharp mid-week reset between meetings.',
    includes: [
      'Denspot Executive Haircut',
      'Beard Trim & Razor Line-Up',
      '20-Min Back, Neck & Shoulder Massage',
      'Complimentary Espresso or Fresh Juice',
    ],
  },
  {
    id: 'pkg-executive-reset',
    name: 'The Executive Reset',
    durationLabel: '90 Mins',
    durationMins: 90,
    priceKes: 4800,
    savingsLabel: 'Most Popular',
    tagline: 'Look razor-sharp and clear away shoulder tension in a single 90-minute visit.',
    featured: true,
    includes: [
      'Signature Executive Haircut & Wash',
      'Beard Sculpt & Hot Towel Ritual',
      'Refreshing Deep Facial Scrub & Steam',
      '20-Min Back & Shoulder Massage',
    ],
  },
  {
    id: 'pkg-weekend-wind-down',
    name: 'The Weekend Wind-Down',
    durationLabel: '2 Hours',
    durationMins: 120,
    priceKes: 6800,
    savingsLabel: 'Save KES 1,400',
    tagline: 'Built for Friday evenings and Saturday recovery after a demanding work week.',
    includes: [
      '60-Min Deep Tissue Massage',
      'Full-Body Detox Steam Session',
      'Executive Pedicure & Foot Massage',
      'Complimentary Chilled Refreshment',
    ],
  },
  {
    id: 'pkg-boss-experience',
    name: 'The Boss Experience',
    durationLabel: '2 Hours',
    durationMins: 120,
    priceKes: 7900,
    savingsLabel: 'Save KES 1,600',
    tagline: 'Our flagship head-to-toe executive grooming and restorative bodywork ritual.',
    featured: true,
    includes: [
      'Denspot Executive Haircut & Beard Line-Up',
      'Gentleman’s Deep-Cleansing Facial',
      'Executive Pedicure',
      '45-Min Swedish or Deep Tissue Massage',
    ],
  },
  {
    id: 'pkg-ultimate-recovery',
    name: 'The Ultimate Recovery',
    durationLabel: '2.5 Hours',
    durationMins: 150,
    priceKes: 9500,
    savingsLabel: 'Save KES 2,000',
    tagline: 'Complete muscular and skin restoration for athletes and busy leaders.',
    includes: [
      'Full-Body Exfoliating Scrub & Steam',
      '75-Min Heated Basalt Hot Stone Massage',
      'Foot Reflexology & Heel Care',
      'Private Lounge Refreshment Service',
    ],
  },
];

export const VIP_MEMBERSHIPS: MembershipTier[] = [
  {
    id: 'vip-silver',
    name: 'The Silver Gentleman',
    monthlyPriceKes: 6500,
    subtitle: 'Consistent bi-weekly upkeep for Ruiru & Eastern Bypass professionals.',
    perks: [
      '2 Executive Haircuts & Beard Sculpts per month',
      '1 Express Facial or Executive Manicure',
      '10% off all 60-min and 90-min massage therapies',
      'Complimentary beverage at Room 801 lounge',
    ],
  },
  {
    id: 'vip-gold',
    name: 'The Gold Executive',
    monthlyPriceKes: 14500,
    subtitle: 'All-access monthly grooming, recovery, and priority Friday evening slots.',
    featured: true,
    perks: [
      'Unlimited Executive Haircuts & Beard Care',
      '2 Full-Body Massages (60 Mins each)',
      '1 Gentleman’s Deep-Cleansing Facial & Executive Pedicure',
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
    serviceVisited: 'The Weekend Wind-Down',
    rating: 5,
    quote:
      'Hands down the best executive kinyozi and spa along the Eastern Bypass. Clean rooms, great calm music, and the 60-minute deep tissue massage after a long week is unmatched.',
  },
  {
    id: 'rev-2',
    name: 'David Mwangi',
    location: 'Nairobi · Ridgeways',
    serviceVisited: 'The Executive Reset',
    rating: 5,
    quote:
      'Very professional staff and easy basement parking at Greenspot Towers. The haircut and facial combo left me looking and feeling brand new before a Saturday wedding.',
  },
  {
    id: 'rev-3',
    name: 'Kevin Otieno',
    location: 'Kamakis · Kiambu',
    serviceVisited: 'Gold Executive Member',
    rating: 5,
    quote:
      'Booking my Friday 6:00 PM slot takes 30 seconds with M-Pesa deposit. Being up on the 8th floor in Room 801 means zero street noise and total privacy.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Executive Grooming Lounge',
    subtitle: 'Greenspot Towers · 8th Floor',
    caption: 'Ergonomic leather barber chairs, warm brass lighting, and hospital-grade tool sterilization between every gentleman.',
    imageSrc: IMAGES.heroLounge,
    aspectClass: 'aspect-[16/9]',
  },
  {
    id: 'gal-2',
    title: 'Private Spa Suites',
    subtitle: 'Sound-Insulated Treatment Rooms',
    caption: 'Climate-controlled suites dressed in fresh dark charcoal linens, heated basalt stones, and ambient acoustic calm.',
    imageSrc: IMAGES.massageSuite,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-3',
    title: 'Precision Hot Towel Ritual',
    subtitle: 'Master Barber Craft',
    caption: 'Unhurried straight-razor line-ups, essential-oil steamed towels, and tailored beard conditioning.',
    imageSrc: IMAGES.kinyoziCraft,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-4',
    title: 'Grooming & Skincare Apothecary',
    subtitle: 'Formulated for Men’s Skin',
    caption: 'Botanical charcoal cleansers, soothing post-shave balms, and cold-pressed oils selected specifically for men.',
    imageSrc: IMAGES.skincareBar,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-5',
    title: 'Room 801 Retreat Lounge',
    subtitle: 'Above Eastern Bypass',
    caption: 'Step off the elevator into quiet luxury—complimentary espresso, herbal tea, and relaxed arrival before your session.',
    imageSrc: IMAGES.room801Lounge,
    aspectClass: 'aspect-[16/9]',
  },
];

export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}
