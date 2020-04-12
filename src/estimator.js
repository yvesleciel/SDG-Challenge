
const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfected1 = input.reportedCases * 10;
  const currentlyInfected2 = input.reportedCases * 50;
  const factor = (days) => {
    let fact;
    if (days.periodType === 'days') {
      fact = Math.trunc(1 / 3);
    } if (days.periodType === 'weeks') {
      fact = Math.trunc(7 / 3);
    } if (days.periodType === 'months') {
      fact = Math.trunc(30 / 3);
    }
    return fact;
  };
  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: currentlyInfected1 * (2 ** factor(input)),
      severeCasesByRequestedTime: Math.trunc(currentlyInfected1
        * (2 ** factor(input)) * (15 / 100)),
      hospitalBedsByRequestedTime: Math.trunc(input.totalHospitalBeds * (35 / 100)
        - currentlyInfected1 * (2 ** factor(input)) * (15 / 100)),
      casesForICUByRequestedTime: Math.trunc(currentlyInfected1 * (2 ** factor(input)) * (5 / 100)),
      casesForVentilatorsByRequestedTime: Math.trunc(currentlyInfected1 * (2 ** factor(input))
        * (2 / 100)),
      dollarsInFlight: Math.trunc((currentlyInfected1 * (2 ** factor(input)) * 0.65 * 1.5) / 30)
    },
    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: currentlyInfected2 * (2 ** factor(input)),
      severeCasesByRequestedTime: Math.trunc(currentlyInfected2 * (2 ** factor(input))
        * (15 / 100)),
      hospitalBedsByRequestedTime: Math.trunc(input.totalHospitalBeds * (35 / 100)
        - currentlyInfected2 * (2 ** factor(input)) * (15 / 100)),
      casesForICUByRequestedTime: Math.trunc(currentlyInfected2 * (2 ** factor(input)) * (5 / 100)),
      casesForVentilatorsByRequestedTime: Math.trunc(currentlyInfected2
        * (2 ** factor(input)) * (2 / 100)),
      dollarsInFlight: Math.trunc((currentlyInfected2 * (2 ** factor(input)) * 0.65 * 1.5) / 30)
    }
  };
};
export default covid19ImpactEstimator;
