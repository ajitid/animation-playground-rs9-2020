import { Easing } from './easings';

// no easing, no acceleration
export const linear: Easing = t => t;
// accelerating from zero velocity
export const easeInQuad: Easing = t => t * t;
// decelerating to zero velocity
export const easeOutQuad: Easing = t => t * (2 - t);
// acceleration until halfway; then deceleration
export const easeInOutQuad: Easing = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
// accelerating from zero velocity
export const easeInCubic: Easing = t => t * t * t;
// decelerating to zero velocity
export const easeOutCubic: Easing = t => --t * t * t + 1;
// acceleration until halfway; then deceleration
export const easeInOutCubic: Easing = t =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
// accelerating from zero velocity
export const easeInQuart: Easing = t => t * t * t * t;
// decelerating to zero velocity
export const easeOutQuart: Easing = t => 1 - --t * t * t * t;
// acceleration until halfway; then deceleration
export const easeInOutQuart: Easing = t =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
// accelerating from zero velocity
export const easeInQuint: Easing = t => t * t * t * t * t;
// decelerating to zero velocity
export const easeOutQuint: Easing = t => 1 + --t * t * t * t * t;
// acceleration until halfway; then deceleration
export const easeInOutQuint: Easing = t =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
