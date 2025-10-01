// Mock implementation of exchangeRateService

export const getExchangeRate = jest.fn(async (from: string, to: string) => {
  if (from === to) return 1;
  if (from === 'USD' && to === 'INR') return 83.25;
  if (from === 'INR' && to === 'USD') return 0.012;
  return 0;
});

export const fetchExchangeRates = jest.fn(async (baseCurrency: string) => {
  if (baseCurrency === 'USD') {
    return {
      base: 'USD',
      rates: {
        INR: 83.25,
        USD: 1
      }
    };
  }
  return {
    base: 'INR',
    rates: {
      USD: 0.012,
      INR: 1
    }
  };
});
