const project = (intialVelocity: number, decelerationRate: number) =>
  ((intialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);

export default project;
