
const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfected = input.reportedCases * 10;
  const currentlyInfected2 = input.reportedCases * 50;
  const factor = (days) => {
    let fact;
    if (days.periodType === 'days') {
      fact = 0;
    } if (days.periodType === 'weeks') {
      fact = 2;
    } else if (days.periodType === 'months') {
      fact = Math.trunc(30 / 3);
    }
    return fact;
  };
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      infectionsByRequestedTime: Math.trunc(currentlyInfected * (2 ** factor(input))),
      severeCasesByRequestedTime: Math.trunc(currentlyInfected * (2 ** factor(input)) * (15 / 100)),
      hospitalBedsByRequestedTime: Math.trunc(input.totalHospitalBeds * (35 / 100)
        - currentlyInfected * (2 ** factor(input)) * (15 / 100)),
      casesForICUByRequestedTime: Math.trunc(currentlyInfected * (2 ** factor(input)) * (5 / 100)),
      casesForVentilatorsByRequestedTime: Math.trunc(currentlyInfected * (2 ** factor(input))
        * (2 / 100)),
      dollarsInFlight: Math.trunc((currentlyInfected * (2 ** factor(input)) * 0.65 * 1.5) / 30)
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      infectionsByRequestedTime: Math.trunc(currentlyInfected2 * (2 ** factor(input))),
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
