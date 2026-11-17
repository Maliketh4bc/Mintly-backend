const TCGDEX_URL = 'https://api.tcgdex.net/v2/en';

export interface TcgdexCardBrief {
  id: string;
  localId: string;
  name: string;
  image?: string;
}

export interface TcgdexSet {
  id: string;
  name: string;
  cards: TcgdexCardBrief[];
}

export interface TcgdexCard {
  id: string;
  localId: string | number;
  name: string;
  image?: string;
  rarity?: string;
  set: { id: string; name: string };
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${TCGDEX_URL}${path}`);
  if (!res.ok) throw new Error(`TCGdex respondió ${res.status} en ${path}`);
  return (await res.json()) as T;
}

export function fetchSet(setId: string) {
  return getJson<TcgdexSet>(`/sets/${encodeURIComponent(setId)}`);
}

export function fetchCard(cardId: string) {
  return getJson<TcgdexCard>(`/cards/${encodeURIComponent(cardId)}`);
}