// Pythagorean Numerology Calculation Engine

export const reduceNum = (n) => {
  if (n <= 9 || n === 11 || n === 22 || n === 33) return n;
  const newSum = n
    .toString()
    .split('')
    .reduce((a, b) => parseInt(a) + parseInt(b), 0);
  return reduceNum(newSum);
};

export const calculateLifePath = (dateOfBirth) => {
  // Input: YYYY-MM-DD format
  if (!dateOfBirth) return null;

  const digits = dateOfBirth.replace(/-/g, '');
  let sum = 0;
  for (let char of digits) {
    sum += parseInt(char);
  }

  return reduceNum(sum);
};

export const nameToNumbers = (name) => {
  // Pythagorean letter-to-number conversion
  const letterMap = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };

  let sum = 0;
  for (let char of name.toLowerCase()) {
    if (letterMap[char]) {
      sum += letterMap[char];
    }
  }

  return reduceNum(sum);
};

export const calculateExpressionNumber = (fullName) => {
  return nameToNumbers(fullName);
};

export const calculateSoulUrge = (name) => {
  // Vowels only: A, E, I, O, U
  const vowels = 'aeiou';
  let sum = 0;

  for (let char of name.toLowerCase()) {
    if (vowels.includes(char)) {
      sum += nameToNumbers(char);
    }
  }

  return reduceNum(sum);
};

export const calculatePersonality = (name) => {
  // Consonants only
  const vowels = 'aeiou';
  let sum = 0;

  for (let char of name.toLowerCase()) {
    if (!vowels.includes(char) && /[a-z]/.test(char)) {
      sum += nameToNumbers(char);
    }
  }

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