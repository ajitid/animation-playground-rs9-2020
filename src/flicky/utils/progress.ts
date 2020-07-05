/**
  Progress within given range
  Also known as getProgressFromValue

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.

  @param from Lower limit
  @param to Upper limit
  @param value Value to find progress within given range
  @return Progress of value within range as expressed 0-1
*/
const progress = (from: number, to: number, value: number) => {
  const toFromDifference = to - from;

  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

export default progress;
