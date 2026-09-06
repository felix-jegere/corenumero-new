// Pythagorean Numerology Calculation Engine

export const reduceNum = (n, keepMasters = true) => {
  if (n <= 9 || (keepMasters && (n === 11 || n === 22 || n === 33))) return n;
  const newSum = n
    .toString()
    .split('')
    .reduce((a, b) => a + parseInt(b, 10), 0);
  return reduceNum(newSum, keepMasters);
};

const sumDigits = (s) =>
  s.split('').reduce((a, b) => a + parseInt(b, 10), 0);

export const calculateLifePath = (dateOfBirth) => {
  // Input: YYYY-MM-DD format
  // Each component (month/day/year) is reduced separately first so that
  // master numbers (11, 22, 33) in any component are preserved.
  if (!dateOfBirth) return null;

  const parts = dateOfBirth.split('-');
  if (parts.length !== 3) return null;
  const [year, month, day] = parts;
  if (
    !/^\d{4}$/.test(year) ||
    !/^\d{1,2}$/.test(month) ||
    !/^\d{1,2}$/.test(day)
  ) {
    return null;
  }

  const monthReduced = reduceNum(sumDigits(month.padStart(2, '0')));
  const dayReduced = reduceNum(sumDigits(day.padStart(2, '0')));
  const yearReduced = reduceNum(sumDigits(year));

  return reduceNum(monthReduced + dayReduced + yearReduced);
};

export const nameToNumbers = (name) => {
  // Pythagorean letter-to-number conversion
  if (!name) return null;
  const letterMap = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };

  let sum = 0;
  let found = false;
  for (let char of name.toLowerCase()) {
    if (char in letterMap) {
      sum += letterMap[char];
      found = true;
    }
  }

  if (!found) return null;
  return reduceNum(sum);
};

export const calculateExpressionNumber = (fullName) => {
  if (!fullName || !fullName.trim()) return null;
  return nameToNumbers(fullName);
};

export const calculateSoulUrge = (name) => {
  // Vowels only: A, E, I, O, U (Y is treated as a consonant)
  if (!name || !name.trim()) return null;
  const vowels = 'aeiou';
  let sum = 0;
  let found = false;

  for (let char of name.toLowerCase()) {
    if (vowels.includes(char)) {
      sum += nameToNumbers(char);
      found = true;
    }
  }

  if (!found) return null;
  return reduceNum(sum);
};

export const calculatePersonality = (name) => {
  // Consonants only (Y is treated as a consonant)
  if (!name || !name.trim()) return null;
  const vowels = 'aeiou';
  let sum = 0;
  let found = false;

  for (let char of name.toLowerCase()) {
    if (!vowels.includes(char) && /[a-z]/.test(char)) {
      sum += nameToNumbers(char);
      found = true;
    }
  }

  if (!found) return null;
  return reduceNum(sum);
};

export const calculateNumerologyProfile = (fullName, dateOfBirth) => {
  return {
    lifePath: calculateLifePath(dateOfBirth),
    expression: calculateExpressionNumber(fullName),
    soulUrge: calculateSoulUrge(fullName),
    personality: calculatePersonality(fullName),
  };
};

// ── Personal cycles (Personal Year / Month / Day) ────────────────────────────
// Standard method: Personal Year = birth month + birth day + current calendar
// year; Personal Month = Personal Year + calendar month; Personal Day =
// Personal Month + calendar day. Cycles always reduce to 1-9 (no masters).

export const calculatePersonalYear = (dateOfBirth, forYear = new Date().getFullYear()) => {
  if (!dateOfBirth) return null;
  const parts = dateOfBirth.split('-');
  if (parts.length !== 3) return null;
  const [, month, day] = parts;
  if (!/^\d{1,2}$/.test(month) || !/^\d{1,2}$/.test(day)) return null;

  const base =
    sumDigits(month.padStart(2, '0')) +
    sumDigits(day.padStart(2, '0')) +
    sumDigits(String(forYear));
  return reduceNum(base, false);
};

const toRefDate = (forDate) =>
  forDate instanceof Date ? forDate : new Date(forDate);

export const calculatePersonalMonth = (dateOfBirth, forDate = new Date()) => {
  const ref = toRefDate(forDate);
  if (Number.isNaN(ref.getTime())) return null;
  const personalYear = calculatePersonalYear(dateOfBirth, ref.getFullYear());
  if (personalYear === null) return null;
  return reduceNum(personalYear + sumDigits(String(ref.getMonth() + 1)), false);
};

export const calculatePersonalDay = (dateOfBirth, forDate = new Date()) => {
  const ref = toRefDate(forDate);
  if (Number.isNaN(ref.getTime())) return null;
  const personalMonth = calculatePersonalMonth(dateOfBirth, ref);
  if (personalMonth === null) return null;
  return reduceNum(personalMonth + sumDigits(String(ref.getDate())), false);
};

export const calculateCycleProfile = (dateOfBirth, forDate = new Date()) => ({
  personalYear: calculatePersonalYear(dateOfBirth, toRefDate(forDate).getFullYear()),
  personalMonth: calculatePersonalMonth(dateOfBirth, forDate),
  personalDay: calculatePersonalDay(dateOfBirth, forDate),
});

export const CYCLE_MEANINGS = {
  1: 'New beginnings — plant seeds, take initiative, act boldly.',
  2: 'Patience and partnership — cooperate, listen, nurture bonds.',
  3: 'Expression and joy — create, socialize, embrace playfulness.',
  4: 'Foundation and focus — work steadily, organize, handle details.',
  5: 'Change and freedom — stay flexible, welcome adventure.',
  6: 'Harmony and responsibility — home, family, care for others.',
  7: 'Reflection and wisdom — rest, study, turn inward.',
  8: 'Power and manifestation — career moves, finances, harvest.',
  9: 'Completion and release — conclude, forgive, let go.',
};

// ── Compatibility ────────────────────────────────────────────────────────────
// Heuristic Life Path pairing score. Master numbers resonate with their root
// (11↔2, 22↔4, 33↔6); the classic triads (1-5-7 mind, 2-4-8 material,
// 3-6-9 creative) harmonize naturally; everything else is a growth pairing.

const rootOf = (n) => (n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n);

const HARMONY_GROUPS = [
  [1, 5, 7],
  [2, 4, 8],
  [3, 6, 9],
];

export const scoreCompatibility = (lifePathA, lifePathB) => {
  if (lifePathA === null || lifePathB === null || lifePathA === undefined || lifePathB === undefined) {
    return null;
  }

  if (lifePathA === lifePathB) {
    return {
      score: 95,
      label: 'Mirror Match',
      summary: `Two Life Path ${lifePathA}s — instant recognition, shared rhythm. Guard against mirroring each other's blind spots.`,
    };
  }

  const a = rootOf(lifePathA);
  const b = rootOf(lifePathB);
  const isMasterBond =
    (lifePathA !== a && b === a) || (lifePathB !== b && a === b);
  if (isMasterBond) {
    return {
      score: 90,
      label: 'Master–Root Bond',
      summary: `A master number (${lifePathA === a ? lifePathB : lifePathA}) paired with its root (${a === lifePathA ? b : a}) — mentorship energy with deep mutual understanding.`,
    };
  }

  const sameGroup = HARMONY_GROUPS.some((g) => g.includes(a) && g.includes(b));
  if (sameGroup) {
    return {
      score: 85,
      label: 'Natural Harmony',
      summary: `Life Paths ${lifePathA} and ${lifePathB} move in the same elemental current — cooperation tends to feel effortless.`,
    };
  }

  return {
    score: 70,
    label: 'Growth Pairing',
    summary: `Life Paths ${lifePathA} and ${lifePathB} see the world differently — friction is the teacher here, and the growth potential is high.`,
  };
};
