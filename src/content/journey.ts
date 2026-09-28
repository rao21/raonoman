import xpenceLogo from '../assets/logos/xpence.com.png';
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
    role: 'Lead Flutter Engineer',
    company: 'Xpence',
    logo: xpenceLogo,
    mono: null,
    start: 'APR 2022',
    end: 'NOW',
    summary:
      'Leading mobile for fintech products across the GCC: Xpence, Cence and Figg Wealth. Architecture, team leadership and end-to-end delivery.',
  },
  {
    role: 'Visiting Faculty',
    company: 'Institute of Business Administration (IBA), Karachi',
    logo: ibaLogo,
    mono: null,
    start: 'JAN 2023',
    end: 'NOW',
    summary:
      "Visiting faculty in the Computer Science department, teaching Application Development for Mobile Devices at one of Pakistan's top universities, and mentoring students in Flutter, Dart and app architecture.",
  },
  {
    role: 'Senior Software Engineer',
    company: 'Figg Wealth',
    logo: null,
    mono: { text: 'F', bg: 'linear-gradient(135deg,#E9C874,#A97A24)', fg: '#1B1406' },
    start: 'AUG 2022',
    end: 'SEP 2023',
    summary:
      'AI wealth management app for a Dubai startup: camera-based asset valuation, portfolio insights and AES encryption.',
  },
  {
    role: 'Flutter Engineer',
    company: 'Rock',
    logo: rockLogo,
    mono: null,
    start: 'FEB 2021',
    end: 'APR 2022',
    summary:
      "Built Rock's all-in-one workspace app in Flutter: messaging, tasks, notes and video meetings with 1000+ Zapier integrations.",
  },
  {
    role: 'Senior Software Engineer',
    company: 'VentureDive',
    logo: ventureDiveLogo,
    mono: null,
    start: 'AUG 2020',
    end: 'NOV 2021',
    summary: "Built the Flutter team from the ground up and delivered Flutter apps for VentureDive's clients.",
  },
  {
    role: 'Software Engineer',
    company: 'Xpert Digital',
    logo: xpertDigitalLogo,
    mono: null,
    start: 'OCT 2019',
    end: 'AUG 2020',
    summary:
      'Customised and delivered Temenos Infinity (Kony DBX) digital banking for international banks. Kony Certified Mobile Developer.',
  },
  {
    role: 'Software Engineer',
    company: 'TPS Worldwide',
    logo: null,
    mono: { text: 'TPS', bg: '#14305E', fg: '#FFFFFF' },
    start: 'NOV 2017',
    end: 'OCT 2019',
    summary:
      'Banking apps for international clients: Bank Nizwa Wallet (Oman), MIB Bank and SAIB Corporate Currency Card (Saudi Arabia), in Flutter, Xamarin and Kony.',
  },
  {
    role: 'Software Engineering Trainee',
    company: 'Pakistan International Airlines (PIA)',
    logo: piaLogo,
    mono: null,
    start: 'OCT 2016',
    end: 'NOV 2017',
    summary: 'Where it started: built the PIA iOS app in Swift, with flight booking, PNR generation, mileage and flight tracking.',
  },
];
