import xpenceIcon from '../assets/appicons/xpence.png';
import cenceIcon from '../assets/appicons/cence.png';
import jazzcashIcon from '../assets/appicons/jazzcash.png';
import rockIcon from '../assets/appicons/rock.png';
import nizwaIcon from '../assets/appicons/nizwa.png';
import saibIcon from '../assets/appicons/saib.png';
import piaIcon from '../assets/appicons/pia.png';

import xpence1 from '../assets/shots/xpence-1.jpg';
import xpence2 from '../assets/shots/xpence-2.jpg';
import xpence3 from '../assets/shots/xpence-3.jpg';
import cence1 from '../assets/shots/cence-1.jpg';
import cence2 from '../assets/shots/cence-2.jpg';
import cence3 from '../assets/shots/cence-3.jpg';
import jazzcash1 from '../assets/shots/jazzcash-1.jpg';
import jazzcash2 from '../assets/shots/jazzcash-2.jpg';
import jazzcash3 from '../assets/shots/jazzcash-3.jpg';
import rock1 from '../assets/shots/rock-1.jpg';
import rock2 from '../assets/shots/rock-2.jpg';
import rock3 from '../assets/shots/rock-3.jpg';
import nizwa1 from '../assets/shots/nizwa-1.jpg';
import nizwa2 from '../assets/shots/nizwa-2.jpg';
import saib1 from '../assets/shots/saib-1.jpg';
import saib2 from '../assets/shots/saib-2.jpg';
import pia1 from '../assets/shots/pia-1.jpg';
import pia2 from '../assets/shots/pia-2.jpg';

export interface CaseStudy {
  slug: string;
  name: string;
  accent: string;
  meta: string;
  website: string | null;
  appStore: string | null;
  googlePlay: string | null;
  client: string;
  role: string;
  result: string | null;
  screenshots: ImageMetadata[];
  icon: ImageMetadata | null;
  tagline: string;
}

export interface MoreApp {
  name: string;
  meta: string;
  description: string;
  website: string;
  screenshots: ImageMetadata[];
  mark: string | null;
  appStore: string | null;
  googlePlay: string | null;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'xpence',
    name: 'Xpence',
    accent: '#1FB58C',
    meta: 'FINTECH · GCC · LEAD FLUTTER ENGINEER · 2022 → NOW',
    website: 'https://xpence.com/',
    appStore: 'https://apps.apple.com/us/app/xpence/id1499502623',
    googlePlay: 'https://play.google.com/store/apps/details?id=co.xpence.alpha2',
    client:
      'Business expense platform for the GCC: corporate debit cards, spend control and automated bookkeeping.',
    role: 'Lead the mobile app end to end: architecture, corporate card flows, real-time spend tracking and store releases.',
    result: null,
    screenshots: [xpence1, xpence2, xpence3],
    icon: xpenceIcon,
    tagline: 'Fintech · GCC',
  },
  {
    slug: 'cence',
    name: 'Cence',
    accent: '#3D6BFF',
    meta: 'AI · FINTECH · UAE · LEAD FLUTTER ENGINEER',
    website: 'https://cencepay.com/',
    appStore: 'https://apps.apple.com/us/app/cence-ai-for-personal-finance/id6739706195',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.cencepay',
    client: 'AI-powered fintech app for the UAE that compares cards and finds cashback and offers.',
    role: 'Architected and delivered the app: personalised card recommendations, cashback discovery and the Cencai AI chat assistant.',
    result: null,
    screenshots: [cence1, cence2, cence3],
    icon: cenceIcon,
    tagline: 'AI finance · UAE',
  },
  {
    slug: 'figg-wealth',
    name: 'Figg Wealth',
    accent: '#B98A2E',
    meta: 'AI · WEALTH · DUBAI · SENIOR SOFTWARE ENGINEER · 2022 – 2023',
    website: null,
    appStore: null,
    googlePlay: null,
    client:
      'Dubai startup, built by banking professionals, bringing every asset from stocks to watches into one wealth app.',
    role: 'Built the Flutter app: camera-based AI Asset Valuer, portfolio insights, watchlist news sentiment and end-to-end AES encryption.',
    result: null,
    screenshots: [],
    icon: null,
    tagline: 'AI wealth · Dubai',
  },
  {
    slug: 'jazzcash',
    name: 'JazzCash',
    accent: '#D8262E',
    meta: 'MOBILE WALLET · PAKISTAN · VIA VENTUREDIVE · 2020 – 2021',
    website: 'https://www.jazzcash.com.pk/',
    appStore: 'https://apps.apple.com/us/app/jazzcash-your-mobile-account/id1224617688',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.techlogix.mobilinkcustomer',
    client: 'A nationwide mobile wallet app: payments, transfers, bill payments and mobile top-ups.',
    role: "Worked on the Flutter app as one of VentureDive's client projects.",
    result: "Pakistan's largest mobile wallet, used by millions of people.",
    screenshots: [jazzcash1, jazzcash2, jazzcash3],
    icon: jazzcashIcon,
    tagline: 'Wallet · Pakistan',
  },
  {
    slug: 'rock',
    name: 'Rock',
    accent: '#7B61FF',
    meta: 'PRODUCTIVITY · US STARTUP · FLUTTER ENGINEER · 2021 – 2022',
    website: 'https://www.rock.so/',
    appStore: 'https://apps.apple.com/app/id1496242752',
    googlePlay: 'https://play.google.com/store/apps/details?id=team.shiny.rock',
    client: 'US startup building one workspace for messaging, tasks, notes, files and video meetings.',
    role: 'Built the Flutter app for iOS and Android, including the 1000+ integrations through Zapier.',
    result: null,
    screenshots: [rock1, rock2, rock3],
    icon: rockIcon,
    tagline: 'Workspace · US',
  },
];

export const moreApps: MoreApp[] = [
  {
    name: 'Bank Nizwa Wallet',
    meta: 'OMAN · FLUTTER · TPS WORLDWIDE · 2017 – 2019',
    description: 'Turns a phone into a digital wallet for Bank Nizwa customers, with secure payments anytime.',
    website: 'https://www.banknizwa.om/',
    screenshots: [nizwa1, nizwa2],
    mark: null,
    appStore: 'https://apps.apple.com/au/app/bank-nizwa-wallet/id1248765650',
    googlePlay: 'https://play.google.com/store/apps/details?id=om.nizwa.wallet',
  },
  {
    name: 'SAIB Corporate Currency Card',
    meta: 'SAUDI ARABIA · FLUTTER · TPS WORLDWIDE',
    description: 'The first multi-currency corporate card app in Saudi Arabia, for managing cards electronically.',
    website: 'https://www.saib.com.sa/',
    screenshots: [saib1, saib2],
    mark: null,
    appStore: 'https://apps.apple.com/pk/app/saib-corporate-currency-card/id1479004808',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.saib.mobile.corp.ccycard',
  },
  {
    name: 'PIA App',
    meta: 'PAKISTAN · SWIFT · PIA · 2016 – 2017',
    description: "Pakistan International Airlines' iOS app: flight booking, PNR generation, mileage and flight tracking.",
    website: 'https://www.piac.com.pk/',
    screenshots: [pia1, pia2],
    mark: null,
    appStore: 'https://apps.apple.com/us/app/pia-app/id1143220222',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.piac.thepiaapp.android',
  },
  {
    name: 'MIB Bank',
    meta: 'PAKISTAN · XAMARIN · C# · TPS WORLDWIDE',
    description: 'Mobile banking with fingerprint login, fund transfers, bill payments and mini statements.',
    website: 'https://www.mcbislamicbank.com/',
    screenshots: [],
    mark: 'MIB',
    appStore: null,
    googlePlay: 'https://play.google.com/store/apps/details?id=com.mcbislamicbank.mobileapp',
  },
  {
    name: 'Temenos Infinity',
    meta: 'INTERNATIONAL BANKS · KONY · XPERT DIGITAL · 2019 – 2020',
    description: 'Customised and delivered Temenos Infinity (Kony DBX) digital banking for several international banks.',
    website: 'https://www.temenos.com/',
    screenshots: [],
    mark: 'T∞',
    appStore: null,
    googlePlay: null,
  },
];

export const marqueeApps: {
  name: string;
  tagline: string;
  accent: string;
  website: string | null;
  icon: ImageMetadata | null;
}[] = [
  { name: 'Xpence', tagline: 'Fintech · GCC', accent: '#1FB58C', website: 'https://xpence.com/', icon: xpenceIcon },
  { name: 'Cence', tagline: 'AI finance · UAE', accent: '#3D6BFF', website: 'https://cencepay.com/', icon: cenceIcon },
  {
    name: 'JazzCash',
    tagline: 'Wallet · Pakistan',
    accent: '#D8262E',
    website: 'https://www.jazzcash.com.pk/',
    icon: jazzcashIcon,
  },
  { name: 'Rock', tagline: 'Workspace · US', accent: '#7B61FF', website: 'https://www.rock.so/', icon: rockIcon },
  { name: 'Figg Wealth', tagline: 'AI wealth · Dubai', accent: '#C9A24B', website: null, icon: null },
  {
    name: 'Bank Nizwa',
    tagline: 'Banking · Oman',
    accent: '#0E8A8A',
    website: 'https://www.banknizwa.om/',
    icon: nizwaIcon,
  },
  { name: 'SAIB', tagline: 'Corporate cards · KSA', accent: '#1F5FAE', website: 'https://www.saib.com.sa/', icon: saibIcon },
  { name: 'PIA', tagline: 'Airline · Pakistan', accent: '#0B6B3A', website: 'https://www.piac.com.pk/', icon: piaIcon },
];
