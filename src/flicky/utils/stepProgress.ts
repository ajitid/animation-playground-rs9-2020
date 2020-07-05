/**
  Create stepped version of 0-1 progress

  @param steps: Number of steps
  @param progress: Current value
  @return Stepped value
*/
export const stepProgress = (steps: number, progress: number) => {
  const segment = 1 / (steps - 1);
  const subsegment = 1 / (2 * (steps - 1));
  const percentProgressOfTarget = Math.min(progress, 1);
  const subsegmentProgressOfTarget = percentProgressOfTarget / subsegment;
  const segmentProgressOfTarget = Math.floor((subsegmentProgressOfTarget + 1) / 2);

  return segmentProgressOfTarget * segment;
};
