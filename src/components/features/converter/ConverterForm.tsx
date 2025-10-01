import React, { useState, useEffect } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import type { CurrencyCode } from '../../../hooks/useCurrencyConverter';
import useCurrencyConverter from '../../../hooks/useCurrencyConverter';

// List of supported currencies with their symbols and names
const CURRENCIES = [
  { code: 'USD' as const, name: 'US Dollar', symbol: '$' },
  { code: 'INR' as const, name: 'Indian Rupee', symbol: '₹' },
  { code: 'EUR' as const, name: 'Euro', symbol: '€' },
  { code: 'GBP' as const, name: 'British Pound', symbol: '£' },
  { code: 'JPY' as const, name: 'Japanese Yen', symbol: '¥' },
];

export const ConverterForm: React.FC = () => {
  const {
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
  } = useCurrencyConverter();

  const [isSwapping, setIsSwapping] = useState(false);

  const [inputValue, setInputValue] = useState<string>('');

  // Update the input value when the amount changes from outside
  useEffect(() => {
    if (amount !== 0) {
      setInputValue(amount.toString());
    }
  }, [amount]);

  const handleAmountChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      handleAmountChange(value);
    }
  };

  const handleCurrencyChange = (type: 'from' | 'to', value: CurrencyCode) => {
    if (type === 'from') {
      setFromCurrency(value);
    } else {
      setToCurrency(value);
    }
  };

  const handleSwap = () => {
    setIsSwapping(true);
    swapCurrencies();
    setTimeout(() => setIsSwapping(false), 300);
  };

  const fromCurrencyInfo = CURRENCIES.find(c => c.code === fromCurrency) || CURRENCIES[0];
  const toCurrencyInfo = CURRENCIES.find(c => c.code === toCurrency) || CURRENCIES[1];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="container max-w-md">
        <div className="card">
          <header className="header">
            <h1>Currency Converter</h1>
            <p>Convert between different currencies with real-time rates</p>
          </header>
          
          {/* From Currency */}
          <div className="input-group">
            <label htmlFor="amount" className="input-label">
              Amount to Convert
            </label>
            <div className="relative">
              <input
                type="text"
                id="amount"
                value={inputValue}
                onChange={handleAmountChangeInput}
                disabled={isLoading}
                className={`input-field pr-24 ${error ? 'border-red-500' : ''} ${isLoading ? 'opacity-75' : ''}`}
                placeholder="0.00"
                inputMode="decimal"
                aria-label="Amount to convert"
              />
              <select
                value={fromCurrency}
                onChange={(e) => handleCurrencyChange('from', e.target.value as CurrencyCode)}
                disabled={isLoading}
                className="select-currency"
                aria-label="From currency"
              >
                {CURRENCIES.map((currency) => (
                  <option key={`from-${currency.code}`} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>
            {fromCurrencyInfo && (
              <p className="text-sm text-gray-500 mt-1">
                {fromCurrencyInfo.name} ({fromCurrencyInfo.symbol})
              </p>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-2">
            <button
              onClick={handleSwap}
              className={`swap-btn ${isSwapping ? 'rotate-180' : ''}`}
              aria-label="Swap currencies"
              disabled={isLoading}
            >
              <FiArrowDown className={`transition-transform ${isSwapping ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* To Currency */}
          <div className="input-group">
            <label htmlFor="converted-amount" className="input-label">
              Converted Amount
            </label>
            <div className="relative">
              <input
                type="text"
                id="converted-amount"
                readOnly
                value={convertedAmount !== null ? formatCurrency(Number(convertedAmount), toCurrency) : ''}
                className="input-field pr-24 bg-gray-50"
                aria-label="Converted amount"
              />
              <select
                value={toCurrency}
                onChange={(e) => handleCurrencyChange('to', e.target.value as CurrencyCode)}
                disabled={isLoading}
                className="select-currency"
                aria-label="To currency"
              >
                {CURRENCIES.map((currency) => (
                  <option key={`to-${currency.code}`} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>
            {toCurrencyInfo && (
              <p className="text-sm text-gray-500 mt-1">
                {toCurrencyInfo.name} ({toCurrencyInfo.symbol})
              </p>
            )}
          </div>

          {/* Exchange Rate */}
          {exchangeRate && (
            <div className="result">
              <p className="result-rate">
                1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Exchange rates are updated regularly
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
