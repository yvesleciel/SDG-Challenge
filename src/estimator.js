
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

const time = (days) => {
  let period;
  if (days.periodType === 'days') {
    period = days.timeToElapse;
  }
  if (days.periodType === 'weeks') {
    period = days.timeToElapse * 7;
  }
  if (days.periodType === 'months') {
    period = days.timeToElapse * 30;
  }
  return period;
};


const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfected1 = Math.trunc(data.reportedCases * 10);
  const currentlyInfected2 = Math.trunc(data.reportedCases * 50);
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
      dollarsInFlight: Math.trunc((currentlyInfected1 * (2 ** factor(data))
        * data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation)
        / time(data))
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
      dollarsInFlight: Math.trunc((currentlyInfected2 * (2 ** factor(data))
        * data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation)
        / time(data))
    }
  };
};
export default covid19ImpactEstimator;

