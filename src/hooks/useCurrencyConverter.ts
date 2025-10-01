import { useState, useEffect, useCallback } from 'react';
import { getExchangeRate } from '../services/exchangeRateService';

// Types
export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'JPY';

interface ExchangeRates {
  [key: string]: number;
}

// Fallback rates in case API fails
const FALLBACK_RATES: ExchangeRates = {
  'USD_INR': 83.25,
  'INR_USD': 0.012,
  'USD_EUR': 0.92,
  'EUR_USD': 1.09,
  'USD_GBP': 0.79,
  'GBP_USD': 1.27,
  'USD_JPY': 149.5,
  'JPY_USD': 0.0067,
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
    if (from === to) {
      setExchangeRate(1);
      setConvertedAmount(Number(amount));
      return 1;
    }
    
    try {
      setIsLoading(true);
      const rate = await getExchangeRate(from, to);
      if (rate) {
        setExchangeRate(rate);
        setConvertedAmount(Number(amount) * rate);
        setError(null);
        return rate;
      }
      throw new Error('Invalid exchange rate received');
    } catch (err) {
      console.error('Error fetching exchange rate:', err);
      setError('Failed to fetch latest exchange rates. Using fallback rates.');
      const fallbackRate = FALLBACK_RATES[`${from}_${to}`] || 1;
      setExchangeRate(fallbackRate);
      setConvertedAmount(Number(amount) * fallbackRate);
      return fallbackRate;
    } finally {
      setIsLoading(false);
    }
  }, [amount]);

  // Update converted amount when amount or currencies change
  useEffect(() => {
    fetchRate(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency, fetchRate]);

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  // Handle amount change
  const handleAmountChange = useCallback((value: string) => {
    // Store the numeric value (or 0 if empty)
    const numValue = value === '' ? 0 : parseFloat(value);
    setAmount(isNaN(numValue) ? 0 : numValue);
    
    // Update converted amount if we have a valid number
    if (!isNaN(numValue)) {
      setConvertedAmount(numValue * exchangeRate);
    } else {
      setConvertedAmount(0);
    }
  }, [exchangeRate]);

  const formatCurrency = useCallback((value: number, currency: string): string => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (e) {
      // Fallback if Intl.NumberFormat fails
      return `${currency} ${value.toFixed(2)}`;
    }
  }, []);

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
