import React from 'react';
import useCurrencyConverter from '../../../hooks/useCurrencyConverter';

const ConverterForm: React.FC = () => {
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

  const handleAmountChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAmountChange(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Currency Converter
        </h1>
        
        {/* From Currency */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              id="amount"
              value={amount || ''}
              onChange={handleAmountChangeInput}
              disabled={isLoading}
              className={`block w-full pl-3 pr-12 py-2 border ${
                error ? 'border-red-300' : 'border-gray-300'
              } rounded-md ${isLoading ? 'bg-gray-50' : ''}`}
              placeholder="1.00"
              step="0.01"
              min="0"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value as 'USD' | 'INR')}
                className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-2">
          <button
            onClick={swapCurrencies}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Swap currencies"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        {/* To Currency */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Converted Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              readOnly
              value={formatCurrency(convertedAmount, toCurrency)}
              className="block w-full pl-3 pr-12 py-2 border border-gray-300 bg-gray-50 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value as 'USD' | 'INR')}
                disabled={isLoading}
                className={`h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md ${
                  isLoading ? 'cursor-not-allowed' : ''
                }`}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center text-blue-500">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading latest rates...</span>
            </div>
          ) : (
            <div className="text-center text-sm text-gray-500">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </div>
          )}
          {error && (
            <div className="mt-2 text-center text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConverterForm;
