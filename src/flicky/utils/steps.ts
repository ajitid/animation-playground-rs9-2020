import clamp from './clamp';

export type Direction = 'start' | 'end';

const clampProgress = clamp(0, 1);

const steps = (steps: number, direction: Direction = 'end') => (progress: number) => {
  progress = direction === 'end' ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
  const expanded = progress * steps;
  const rounded = direction === 'end' ? Math.floor(expanded) : Math.ceil(expanded);

  return clampProgress(rounded / steps);
};

export default steps;
