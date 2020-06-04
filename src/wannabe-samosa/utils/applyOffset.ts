/**
  Apply offset

  A function that, given a value, will get the offset from `from`
  and apply it to `to`
*/
const applyOffset = (from: number, to?: number) => {
  let onlyReceivedFrom = to === undefined;

  return (v: number) => {
    if (onlyReceivedFrom) {
      to = from;
      return v - from + to;
    } else {
      from = v;
      onlyReceivedFrom = true;
      return to;
    }
  };
};

export default applyOffset;
