export interface StackItem {
  label: string;
  icon?: string;
  glyph?: string;
}

export interface StackGroup {
  code: string;
  title: string;
  featured?: boolean;
  items: StackItem[];
}

export const stack: StackGroup[] = [
  {
    code: '01 · Widget mobile()',
    title: 'Mobile',
    items: [
      { label: 'Flutter', icon: 'flutter' },
      { label: 'Dart', icon: 'dart' },
      { label: 'Swift', icon: 'swift' },
      { label: 'SwiftUI', icon: 'apple' },
      { label: 'Android', icon: 'android' },
      { label: 'React Native', icon: 'react' },
      { label: 'Xamarin', icon: 'xamarin' },
    ],
  },
  {
    code: '02 · Future<Answer> ai()',
    title: 'AI & LLM',
    featured: true,
    items: [
      { label: 'Python', icon: 'python' },
      { label: 'Claude', icon: 'claude' },
      { label: 'Claude Code', icon: 'anthropic' },
      { label: 'OpenAI Codex', icon: 'openai' },
      { label: 'Cursor', icon: 'cursor' },
      { label: 'RAG', glyph: 'RAG' },
      { label: 'LLM apps', glyph: 'LLM' },
    ],
  },
  {
    code: '03 · Stream api()',
    title: 'Backend & APIs',
    items: [
      { label: 'Python', icon: 'python' },
      { label: 'FastAPI', icon: 'fastapi' },
      { label: 'Firebase', icon: 'firebase' },
      { label: 'REST APIs', glyph: 'API' },
      { label: 'GraphQL', icon: 'graphql' },
      { label: 'JavaScript', icon: 'javascript' },
      { label: 'PHP', icon: 'php' },
    ],
  },
  {
    code: '04 · void ship()',
    title: 'Ship & DevOps',
    items: [
      { label: 'App Store', icon: 'appstore' },
      { label: 'Google Play', icon: 'googleplay' },
      { label: 'Codemagic', icon: 'codemagic' },
      { label: 'Fastlane', icon: 'fastlane' },
      { label: 'GitHub Actions', icon: 'githubactions' },
      { label: 'Azure DevOps', icon: 'azuredevops' },
      { label: 'Git', icon: 'git' },
    ],
  },
  {
    code: '05 · Money fintech()',
    title: 'Fintech',
    items: [
      { label: 'Temenos Infinity', glyph: 'T∞' },
      { label: 'Kony Fabric', glyph: 'K' },
      { label: 'Digital wallets', glyph: '₩' },
      { label: 'Payments', glyph: '$' },
      { label: 'Card management', glyph: '▭' },
    ],
  },
];
