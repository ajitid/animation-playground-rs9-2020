/**
  Value in range from progress.
  Also known as getValueFromProgress or dilate.
 
  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1).
 
  So progress = 0.5 would change
 
  from -------- to
 
  to
 
  from ---- to
 
  E.g. from = 10, to = 20, progress = 0.5 => 15
 
  @param from Lower limit of range
  @param to Upper limit of range
  @param progress The progress between lower and upper limits expressed 0-1
  @return Value as calculated from progress within range (not limited within range)
 */
const mix = (from: number, to: number, progress: number) =>
  -progress * from + progress * to + from;

export default mix;
