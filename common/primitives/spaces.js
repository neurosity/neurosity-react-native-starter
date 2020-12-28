// Base spacing unit. Everything is its multiple
const baseAtom = 4;

const spaces = {
  x1: baseAtom, // 4
  x2: baseAtom * 2, // 8
  x3: baseAtom * 3, // 12
  x4: baseAtom * 4, // 16
  x6: baseAtom * 6, // 24
  x8: baseAtom * 8, // 32
  x10: baseAtom * 10, // 40
  x14: baseAtom * 14, // 56
  x18: baseAtom * 18, // 72
  x22: baseAtom * 22, // 88
  x28: baseAtom * 28, // 112
  x34: baseAtom * 34, // 136
  x40: baseAtom * 40, // 160
  x48: baseAtom * 48, // 192
  x56: baseAtom * 56, // 224
  x64: baseAtom * 64, // 256
  x74: baseAtom * 74, // 296
  x84: baseAtom * 84, // 336
  x94: baseAtom * 94, // 376
  x106: baseAtom * 106, // 424
  x118: baseAtom * 118, // 472
  x130: baseAtom * 130 // 520
};

const margins = {
  xs: spaces.x1,
  sm: spaces.x2,
  md: spaces.x4,
  lg: spaces.x6,
  xl: spaces.x8,
  xxl: spaces.x10
};

const paddings = {
  xs: spaces.x1,
  sm: spaces.x2,
  md: spaces.x4,
  lg: spaces.x6,
  xl: spaces.x8,
  xxl: spaces.x10
};

export { margins, paddings, spaces };
