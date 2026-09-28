export type TalkKind = 'speaker' | 'panel' | 'mentor' | 'judge' | 'trainer';

export interface Talk {
  kind: TalkKind;
  month: string | null;
  year: number;
  role: string;
  title: string;
  org: string;
  blurb: string;
  accent: string;
  note?: string;
}

export const talks: Talk[] = [
  {
    kind: 'mentor',
    month: 'JUN',
    year: 2026,
    role: 'Mentor',
    title: 'Build with AI Hackathon',
    org: 'GDG Kolachi × Folio3 · Folio3 Pakistan',
    blurb: 'Mentored teams building AI-powered products across a full-day hackathon.',
    accent: '#4285F4',
  },
  {
    kind: 'panel',
    month: null,
    year: 2025,
    role: 'Panelist',
    title: 'Diverse Leadership Panel',
    org: 'Flutter Flash · Flutter Karachi',
    blurb: 'On leadership journeys, with founders and a Google Developer Expert, as Tech Lead at Xpence.',
    accent: '#1FA2F0',
  },
  {
    kind: 'speaker',
    month: 'JAN',
    year: 2023,
    role: 'Speaker',
    title: 'Kick Start Mobile App Development with Flutter',
    org: "Code Jam'23 · GDG On Campus SMIU",
    blurb: 'A full session getting students from zero to their first Flutter app.',
    accent: '#34A853',
  },
  {
    kind: 'panel',
    month: 'MAR',
    year: 2022,
    role: 'Panel speaker',
    title: 'Flutter Forward Extended Karachi',
    org: 'Flutter Karachi · Habib University',
    blurb: 'Live panel and Q&A with mentors for the Flutter Pakistan community.',
    accent: '#1FA2F0',
  },
  {
    kind: 'speaker',
    month: null,
    year: 2022,
    role: 'Speaker',
    title: 'Flutter Forward Extended',
    org: 'GDG Live Pakistan',
    blurb: 'Took attendees through Flutter and Dart, drawing on Flutter, native iOS and Kony experience.',
    accent: '#4285F4',
  },
  {
    kind: 'speaker',
    month: null,
    year: 2022,
    role: 'Speaker · Day 1',
    title: 'Flutter Flash',
    org: 'Flutter Karachi',
    blurb: "Day 1 speaker at Flutter Karachi's flagship community event.",
    accent: '#1FA2F0',
  },
  {
    kind: 'judge',
    month: null,
    year: 2022,
    role: 'Judge · Day 2',
    title: 'Flutter Flash: "Hot Reload"',
    org: 'Flutter Karachi',
    blurb: "Judged Day 2 alongside Pakistan's first female GDE for Flutter & Dart.",
    accent: '#FF7A00',
    note: 'Yes, the day was literally called Hot Reload.',
  },
  {
    kind: 'mentor',
    month: 'JUL',
    year: 2022,
    role: 'Community lounge mentor',
    title: 'Google I/O Extended Karachi',
    org: 'GDG Kolachi · Iqra University',
    blurb: 'Tech speaker and mentor in the community lounge.',
    accent: '#EA4335',
  },
  {
    kind: 'trainer',
    month: 'MAY',
    year: 2022,
    role: 'Workshop trainer',
    title: 'FreelanceFest 2022',
    org: 'PAFLA, Pakistan Freelancers Association · Pearl Continental',
    blurb: 'Two-day freelancing conference; ran a hands-on workshop.',
    accent: '#0F9D58',
  },
  {
    kind: 'speaker',
    month: null,
    year: 2022,
    role: 'Featured speaker',
    title: 'Flutter Festival Karachi',
    org: 'Flutter Karachi · featured at Google I/O 2022',
    blurb: 'Technical talk alongside IBA students I mentored. The event was featured globally at Google I/O.',
    accent: '#1FA2F0',
  },
];

export const community: { eyebrow: string; title: string; body: string; href: string }[] = [
  {
    eyebrow: 'CO-FOUNDER',
    title: 'Flutter Pakistan',
    body: 'Part of the Flutter Karachi community from the start: meetups, study jams and events.',
    href: 'https://flutterpk.github.io/',
  },
  {
    eyebrow: 'VISITING FACULTY · 2023 → NOW',
    title: 'Institute of Business Administration (IBA), Karachi',
    body: 'Teaching Application Development for Mobile Devices in the Computer Science department.',
    href: 'https://www.iba.edu.pk/faculty-profile.php?ftype=Visiting&id=rmnoman',
  },
  {
    eyebrow: 'WRITING',
    title: 'Medium',
    body: 'Flutter articles, such as adding build flavors to a Flutter app with Provider.',
    href: 'https://raonoman21.medium.com/',
  },
];
