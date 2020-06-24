const project = (intialVelocity: number, decelerationRate: number) =>
  ((intialVelocity / 1000.0) * decelerationRate) / (1.0 - decelerationRate);

export default project;
