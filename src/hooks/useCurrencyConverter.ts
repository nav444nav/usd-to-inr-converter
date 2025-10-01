import { useState, useEffect, useCallback } from 'react';
import { getExchangeRate } from '../services/exchangeRateService';

// Types
type CurrencyCode = 'USD' | 'INR';

interface ExchangeRates {
  [key: string]: number;
}

// Fallback rates in case API fails
const FALLBACK_RATES: ExchangeRates = {
  'USD_INR': 83.25,
  'INR_USD': 0.012,
};

const useCurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('INR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch exchange rate from API
  const fetchRate = useCallback(async (from: CurrencyCode, to: CurrencyCode) => {
    if (from === to) return 1;
    
    try {
      setIsLoading(true);
      const rate = await getExchangeRate(from, to);
      if (rate) {
        setExchangeRate(rate);
        setConvertedAmount(amount * rate);
        setError(null);
        return rate;
      }
      throw new Error('Invalid exchange rate received');
    } catch (err) {
      console.error('Error fetching exchange rate:', err);
      setError('Failed to fetch latest exchange rates. Using fallback rates.');
      const fallbackRate = FALLBACK_RATES[`${from}_${to}`] || 0;
      setExchangeRate(fallbackRate);
      setConvertedAmount(amount * fallbackRate);
      return fallbackRate;
    } finally {
      setIsLoading(false);
    }
  }, [amount]);

  // Update converted amount when amount or currencies change
  useEffect(() => {
    fetchRate(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency, fetchRate]);

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Handle amount change with validation
  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setAmount(numValue);
  };

  // Format currency amount
  const formatCurrency = (value: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return {
    amount,
    fromCurrency,
    toCurrency,
    convertedAmount,
    exchangeRate,
    isLoading,
    error,
    setFromCurrency,
    setToCurrency,
    handleAmountChange,
    swapCurrencies,
    formatCurrency,
  };
};

export default useCurrencyConverter;
