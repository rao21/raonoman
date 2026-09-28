export interface Testimonial {
  role: string;
  relation: string;
  date: string;
  quote: string;
  highlight?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    role: 'Engineering @ talabat (Delivery Hero) · Google Developer Expert',
    relation: 'Worked on the same team',
    date: 'Feb 2024',
    quote:
      'One of the most real people I have worked with in my professional career. His technical skills & the way he handles situations is commendable. He has a keen knowledge of software development, especially in mobile development & is always eager to learn anything that comes in his professional career. Highly recommended as a Senior Flutter Engineer/Architect!',
    highlight: 'Highly recommended as a Senior Flutter Engineer/Architect!',
    featured: true,
  },
  {
    role: 'Technical Lead at AeroGlobe',
    relation: 'Managed Rao directly',
    date: 'Dec 2021',
    quote:
      'It has always been a delight to have Rao as part of my team. His work ethic and dedication is exemplary. He is self motivated and has an unquenchable hunger for making himself better. You can throw any sort of technically challenging tasks at him and rest assured that he will get them done.',
  },
  {
    role: 'Senior Engineering Manager · Digital Banking Specialist',
    relation: 'Senior colleague',
    date: 'Feb 2021',
    quote:
      'I had the pleasure of working with Rao Noman on multiple projects for Digital Banking Solutions and different cutting-edge technologies. He holds a very positive attitude and ambitious to get the job done and deliver at his best. Rao would be an asset to any team and I would highly recommend him.',
  },
  {
    role: 'Google Developer Expert in Flutter & Dart · Mobile Consultant',
    relation: 'Worked on the same team',
    date: 'Jun 2023',
    quote:
      'I highly recommend Rao as a great team member and a continuous learner. His enthusiasm for learning new things and skills is truly inspiring. He consistently goes above and beyond to stay updated with industry trends and implement innovative approaches in his work.',
  },
  {
    role: 'Engineering Manager · AI-Driven Development',
    relation: 'Senior colleague',
    date: 'Jan 2022',
    quote:
      'Hardworking, dedicated and energetic are some of the qualities that define Rao Noman not only as a professional but on a personal level as well. He has consistently worked to deliver high quality products for his clients and is a very talented and known Flutter developer.',
  },
  {
    role: 'Former teammate',
    relation: 'LinkedIn recommendation',
    date: '',
    quote:
      'I worked with Rao for more than a year, and he is an excellent developer, he get things done, always on time and direct to the point.',
  },
];
