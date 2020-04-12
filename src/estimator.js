
const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfected = input.reportedCases * 10;
  const currentlyInfected2 = input.reportedCases * 50;
  const factor = (days) => {
    let fact;
    if (days.periodType === 'day') {
      fact = Math.trunc(1 / 3);
    } else if (days.periodType === 'weeks') {
      fact = Math.trunc(7 / 3);
    } else if (days.periodType === 'months') {
      fact = Math.trunc(30 / 3);
    }
    return fact;
  }
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: Math.trunc(currentlyInfected * (2 ** factor(input))),
      severeCasesByRequestedTime: Math.trunc(currentlyInfected * (2 ** factor(input)) * (15 / 100)),
      hospitalBedsByRequestedTime: Math.trunc(input.totalHospitalBeds * (35 / 100)
        - currentlyInfected * (2 ** factor(input)) * (15 / 100))
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: Math.trunc(currentlyInfected2 * (2 ** factor(input))),
      severeCasesByRequestedTime: Math.trunc(currentlyInfected2 * (2 ** factor(input))
        * (15 / 100)),
      hospitalBedsByRequestedTime: Math.trunc(input.totalHospitalBeds * (35 / 100)
        - currentlyInfected2 * (2 ** factor(input)) * (15 / 100))
    }
  };
};
export default covid19ImpactEstimator;
