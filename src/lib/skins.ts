export type Skin = 'paper' | 'graphite' | 'flutter';
export const SKINS: Skin[] = ['paper', 'graphite', 'flutter'];
const isSkin = (v: unknown): v is Skin => SKINS.includes(v as Skin);
export const nextSkin = (s: Skin): Skin => SKINS[(SKINS.indexOf(s) + 1) % SKINS.length];
export function readSkin(storage: Pick<Storage, 'getItem'> | null, prefersDark: boolean): Skin {
  try {
    const v = storage?.getItem('skin');
    if (isSkin(v)) return v;
  } catch {}
  return prefersDark ? 'graphite' : 'paper';
}
export function saveSkin(storage: Pick<Storage, 'setItem'> | null, s: Skin): void {
  try {
    storage?.setItem('skin', s);
  } catch {}
}
