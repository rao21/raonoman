import xpenceLogo from '../assets/logos/xpence.com.png';
import cenceLogo from '../assets/appicons/cence.png';
import ibaLogo from '../assets/logos/iba.png';
import rockLogo from '../assets/logos/rock.so.png';
import ventureDiveLogo from '../assets/logos/venturedive.com.png';
import xpertDigitalLogo from '../assets/logos/xpertdigital.co.png';
import piaLogo from '../assets/logos/piac.com.pk.png';

export interface Job {
  role: string;
  company: string;
  logo: ImageMetadata | null;
  mono: { text: string; bg: string; fg: string } | null;
  start: string;
  end: string;
  summary: string;
}

export const journey: Job[] = [
  {
    role: 'Senior Flutter Engineer',
    company: 'PsychPlus',
    logo: null,
    mono: { text: 'P+', bg: 'linear-gradient(135deg,#2BB5A0,#14655C)', fg: '#FFFFFF' },
    start: 'FEB 2026',
    end: 'NOW',
    summary:
      'Building a HIPAA-compliant mental healthcare app for BDD, OCD and foundation therapy programs, integrated with the proprietary Galaxy EHR for telemedicine, appointment scheduling and CBT-based therapy. Serving 120+ clinics across 30 US states with 1,000+ providers.',
  },
  {
    role: 'Flutter Instructor (Part-Time)',
    company: 'Institute of Business Administration (IBA), Karachi',
    logo: ibaLogo,
    mono: null,
    start: 'JAN 2023',
    end: 'NOW',
    summary:
      'Designed a Flutter curriculum adopted by 200+ students, and mentored 50+ students with 15 apps published.',
  },
  {
    role: 'Senior Flutter Engineer',
    company: 'CencePay',
    logo: cenceLogo,
    mono: null,
    start: 'JAN 2025',
    end: 'JAN 2026',
    summary:
      'Built the entire mobile app from scratch with Flutter and Python, scaling to 30,000+ active users in the UAE. Architected the AI-powered Best Card Now recommendation engine with LangChain, RAG and vector databases, increasing platform engagement by 90%.',
  },
  {
    role: 'Lead Flutter Engineer',
    company: 'Xpence',
    logo: xpenceLogo,
    mono: null,
    start: 'APR 2022',
    end: 'JAN 2025',
    summary:
      'Led a team of 8 mobile engineers across 3 fintech products serving 50,000+ users with 4.5+ star ratings. Drove $5M+ in monthly corporate transaction volume across the GCC and delivered 15+ major releases with zero critical production bugs.',
  },
  {
    role: 'Senior Flutter & AI Engineer',
    company: 'Figg Wealth',
    logo: null,
    mono: { text: 'F', bg: 'linear-gradient(135deg,#E9C874,#A97A24)', fg: '#1B1406' },
    start: 'AUG 2022',
    end: 'SEP 2023',
    summary:
      'Built an AI-driven wealth management platform, scaling to 5,000+ active users with a 4.5-star rating. Engineered a camera-based computer vision Asset Valuer with 95% accuracy and an AI portfolio recommendation engine using Python, LangChain and RAG pipelines.',
  },
  {
    role: 'Flutter Engineer',
    company: 'Rock',
    logo: rockLogo,
    mono: null,
    start: 'FEB 2021',
    end: 'APR 2022',
    summary:
      'Built an all-in-one workspace app reaching 10,000+ users with a 4.3-star rating. Executed 1,000+ Zapier integrations, increasing engagement by 45%.',
  },
  {
    role: 'Senior Software Engineer – Flutter',
    company: 'VentureDive',
    logo: ventureDiveLogo,
    mono: null,
    start: 'AUG 2020',
    end: 'NOV 2021',
    summary:
      'Built and led a Flutter engineering team across multiple client projects.',
  },
  {
    role: 'Software Engineer – KONY Digital Banking',
    company: 'Xpert Digital',
    logo: xpertDigitalLogo,
    mono: null,
    start: 'OCT 2019',
    end: 'AUG 2020',
    summary:
      'Customised Temenos Infinity core banking for 3 international banks in Oman and Saudi Arabia, serving 500,000+ customers.',
  },
  {
    role: 'Software Engineer – Flutter',
    company: 'TPS Worldwide',
    logo: null,
    mono: { text: 'TPS', bg: '#14305E', fg: '#FFFFFF' },
    start: 'NOV 2017',
    end: 'OCT 2019',
    summary:
      'Core contributor to the JazzCash mobile wallet, serving 5M+ active users. Delivered banking apps including Bank Nizwa Wallet and SAIB Corporate Card, serving 300,000+ users.',
  },
  {
    role: 'Software Engineering Trainee',
    company: 'Pakistan International Airlines (PIA)',
    logo: piaLogo,
    mono: null,
    start: 'OCT 2016',
    end: 'NOV 2017',
    summary:
      'Launched the PIA mobile app, with 100,000+ downloads, flight booking and PNR generation.',
  },
];
