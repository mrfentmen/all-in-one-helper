export const prefsKey = 'helper_prefs';
export const recentKey = 'helper_recent';
export const settingsKey = (slug: string) => `helper_settings:${slug}`;

export function getPrefs(): any {
  try { return JSON.parse(localStorage.getItem(prefsKey) || '{}'); } catch { return {}; }
}
export function setPrefs(v: any) { localStorage.setItem(prefsKey, JSON.stringify(v)); }

export function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(recentKey) || '[]'); } catch { return []; }
}
export function pushRecent(slug: string) {
  const r = getRecent().filter(s=>s!==slug);
  r.unshift(slug);
  localStorage.setItem(recentKey, JSON.stringify(r.slice(0,5)));
}
export function getSettings(slug: string): any {
  try { return JSON.parse(localStorage.getItem(settingsKey(slug)) || '{}'); } catch { return {}; }
}
export function setSettings(slug: string, v: any) { localStorage.setItem(settingsKey(slug), JSON.stringify(v)); }

export async function cacheWasm(url: string): Promise<string> {
  if (!('caches' in window)) return url;
  const cache = await caches.open('wasm-v1');
  const res = await cache.match(url);
  if (res) return url;
  try { await cache.add(url); } catch {}
  return url;
}
export function clearAllCache() {
  localStorage.clear();
  if ('caches' in window) caches.delete('wasm-v1');
}
