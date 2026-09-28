import { describe, it, expect } from 'vitest';
import { findPlaceholders } from '../../src/lib/placeholders';
import { site } from '../../src/content/site';
import { caseStudies, moreApps, marqueeApps } from '../../src/content/projects';
import { testimonials } from '../../src/content/testimonials';
import { talks, community } from '../../src/content/talks';
import { stack } from '../../src/content/stack';
import { journey } from '../../src/content/journey';
import { services } from '../../src/content/services';
import { problems } from '../../src/content/problems';
import { steps } from '../../src/content/process';
import { reasons } from '../../src/content/why';

const all = { site, caseStudies, moreApps, marqueeApps, testimonials, talks, community, stack, journey, services, problems, steps, reasons };

describe('placeholder guard', () => {
  it('flags placeholder strings', () => {
    expect(findPlaceholders({ a: 'Add a real result', b: ['ok', 'TODO later'] })).toEqual(['a', 'b[1]']);
  });
  it('content has no placeholders', () => expect(findPlaceholders(all)).toEqual([]));
});

describe('content rules', () => {
  const text = JSON.stringify(all);
  it('never says Karachi outside the IBA name', () => {
    expect(text.replace(/\(IBA\), Karachi/g, '').replace(/Asia\/Karachi/g, '')).not.toMatch(/Karachi/);
  });
  it('has no recommender names', () => {
    for (const n of ['Waleed', 'Burhanuddin', 'Usman', 'Taha', 'Ambreen']) expect(JSON.stringify(testimonials)).not.toContain(n);
  });
  it('has no .NET and no FAQ-style NDA promise', () => {
    expect(JSON.stringify(stack)).not.toMatch(/\.NET/);
    expect(text).not.toMatch(/NDA/);
  });
  it('gets the corrected facts right', () => {
    expect(journey.find(j => j.company === 'Figg Wealth')?.role).toBe('Senior Software Engineer');
    expect(journey.find(j => j.company.startsWith('Institute of Business Administration'))?.role).toBe('Visiting Faculty');
    expect(JSON.stringify(journey)).not.toMatch(/led the mobile team|mentored junior/i);
  });
  it('uses https for every external link', () => {
    for (const p of [...caseStudies, ...moreApps]) for (const u of [p.website, p.appStore, p.googlePlay]) if (u) expect(u).toMatch(/^https:\/\//);
  });
  it('has exactly one featured testimonial and ten talks', () => {
    expect(testimonials.filter(t => t.featured)).toHaveLength(1);
    expect(talks).toHaveLength(10);
  });
  it('keeps rotating phrases short enough for one line', () => {
    for (const p of site.phrases) expect(p.length).toBeLessThanOrEqual(19);
  });
});
