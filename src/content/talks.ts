import type { ImageMetadata } from 'astro';
import buildWithAi2026 from '../assets/talks/build-with-ai-2026.jpg';
import flutterFlash2Panel2025 from '../assets/talks/flutter-flash-2-panel-2025.jpg';
import flutterMeetup2024 from '../assets/talks/flutter-meetup-2024.jpg';
import flutterForwardExtended2023 from '../assets/talks/flutter-forward-extended-2023.jpg';
import codeJam2023 from '../assets/talks/code-jam-2023.jpg';
import flutterFlashDay12022 from '../assets/talks/flutter-flash-day1-2022.jpg';
import flutterFlashJudge2022 from '../assets/talks/flutter-flash-judge-2022.jpg';
import ioExtended2022 from '../assets/talks/io-extended-2022.jpg';
import freelancefest2022 from '../assets/talks/freelancefest-2022.jpg';
import flutterFestival2022 from '../assets/talks/flutter-festival-2022.jpg';

export type TalkKind = 'speaker' | 'panel' | 'mentor' | 'judge' | 'trainer' | 'community';

export interface Talk {
  kind: TalkKind;
  month: string | null;
  year: number;
  role: string;
  title: string;
  org: string;
  blurb: string;
  accent: string;
  banner: ImageMetadata;
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
    blurb: 'Mentored teams building AI-powered solutions across a full-day hackathon.',
    accent: '#4285F4',
    banner: buildWithAi2026,
  },
  {
    kind: 'panel',
    month: 'JAN',
    year: 2025,
    role: 'Panelist',
    title: 'Flutter Flash 2.0: Diverse Leadership Panel',
    org: 'Flutter Karachi · IBA City Campus',
    blurb: 'Panel on leadership journeys with founders and a Google Developer Expert, speaking as Tech Lead at Xpence.',
    accent: '#1FA2F0',
    banner: flutterFlash2Panel2025,
  },
  {
    kind: 'community',
    month: null,
    year: 2024,
    role: 'Community',
    title: 'Flutter Meetup Karachi',
    org: 'Flutter Karachi · Folio3',
    blurb: "Part of Flutter Karachi's biggest meetup of the season, with 250+ attendees.",
    accent: '#1FA2F0',
    banner: flutterMeetup2024,
  },
  {
    kind: 'speaker',
    month: 'MAR',
    year: 2023,
    role: 'Speaker',
    title: 'Flutter Forward Extended',
    org: 'GDG Live Pakistan',
    blurb: 'Took attendees through Flutter and Dart, drawing on Flutter, native iOS and Kony experience.',
    accent: '#4285F4',
    banner: flutterForwardExtended2023,
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
    banner: codeJam2023,
  },
  {
    kind: 'speaker',
    month: 'SEP',
    year: 2022,
    role: 'Speaker · Day 1',
    title: 'Use Protocol Buffers in Flutter',
    org: 'Flutter Flash · Flutter Karachi',
    blurb: "Day 1 talk at Flutter Karachi's flagship event, as part of Flutter Karachi's Executive Committee.",
    accent: '#1FA2F0',
    banner: flutterFlashDay12022,
  },
  {
    kind: 'judge',
    month: 'SEP',
    year: 2022,
    role: 'Judge · Day 2',
    title: 'Flutter Flash: "Hot Reload"',
    org: 'Flutter Karachi · IBA City Campus',
    blurb: "Judged Day 2 alongside Pakistan's first female GDE for Flutter & Dart.",
    accent: '#FF7A00',
    banner: flutterFlashJudge2022,
    note: 'Yes, the day was literally called Hot Reload.',
  },
  {
    kind: 'mentor',
    month: 'JUL',
    year: 2022,
    role: 'Mentor for Flutter',
    title: 'Google I/O Extended Karachi',
    org: 'GDG Kolachi · Iqra University',
    blurb: 'Mentored attendees on Flutter in the community lounge.',
    accent: '#EA4335',
    banner: ioExtended2022,
  },
  {
    kind: 'trainer',
    month: 'MAY',
    year: 2022,
    role: 'Workshop trainer',
    title: 'Introduction to Flutter for Mobile Applications',
    org: 'FreelanceFest 2022 · PAFLA, Pearl Continental',
    blurb: 'Hands-on Flutter workshop at a two-day freelancing conference.',
    accent: '#0F9D58',
    banner: freelancefest2022,
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
    banner: flutterFestival2022,
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
