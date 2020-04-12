
const factor = (days) => {
  let fact;
  if (days.periodType === 'days') {
    fact = Math.trunc(days.timeToElapse / 3);
  }
  if (days.periodType === 'weeks') {
    fact = Math.trunc((days.timeToElapse * 7) / 3);
  }
  if (days.periodType === 'months') {
    fact = Math.trunc((days.timeToElapse * 30) / 3);
  }
  return fact;
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfected1 = Math.trunc(data.reportedCases * 10);
  const currentlyInfected2 = Math.trunc(data.reportedCases * 50);
  // const ICU1 = currentlyInfected1 * (2 ** factor(data));
  // const ICU2 = currentlyInfected2 * (2 ** factor(data));

  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: currentlyInfected1 * (2 ** factor(data)),
      severeCasesByRequestedTime: Math.trunc(currentlyInfected1
        * (2 ** factor(input)) * (15 / 100)),
      hospitalBedsByRequestedTime: Math.trunc(input.totalHospitalBeds * (35 / 100)
        - currentlyInfected1 * (2 ** factor(input)) * (15 / 100)),
      casesForICUByRequestedTime: Math.trunc(currentlyInfected1 * (2 ** factor(data)) * (5 / 100)),
      casesForVentilatorsByRequestedTime: Math.trunc(currentlyInfected1 * (2 ** factor(data))
        * 0.02),
      dollarsInFlight: Math.trunc((currentlyInfected1 * (2 ** factor(data)) * 0.65 * 1.5) / 30)
    },
    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: currentlyInfected2 * (2 ** factor(data)),
      severeCasesByRequestedTime: Math.trunc(currentlyInfected2 * (2 ** factor(input))
        * (15 / 100)),
      hospitalBedsByRequestedTime: Math.trunc(input.totalHospitalBeds * (35 / 100)
        - currentlyInfected2 * (2 ** factor(input)) * (15 / 100)),
      casesForICUByRequestedTime: Math.trunc(currentlyInfected2 * (2 ** factor(data)) * (5 / 100)),
      casesForVentilatorsByRequestedTime: Math.trunc(currentlyInfected2 * (2 ** factor(data))
        * 0.02),
      dollarsInFlight: Math.trunc((currentlyInfected2 * (2 ** factor(data)) * 0.65 * 1.5) / 30)
    }
  };
};


export default covid19ImpactEstimator;
