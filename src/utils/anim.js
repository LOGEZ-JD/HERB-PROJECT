// src/utils/anim.js
export const linear = "linear";
export const DUR = { short: 0.35, med: 0.6, long: 0.95 };
export const TRANS = {
  leftIn: (delay = 0) => ({ duration: DUR.med, delay, ease: linear }),
  rightIn: (delay = 0) => ({ duration: DUR.med, delay, ease: linear }),
  fade: (delay = 0) => ({ duration: DUR.med, delay, ease: linear }),
};
