const API_BASE_URL = 'http://localhost:3001/api';

interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: {
    [key: string]: number;
  };
}

export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRateResponse> => {
  const url = `${API_BASE_URL}/exchange-rates/${baseCurrency}`;
  console.log('Fetching exchange rates from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors'
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    if (data.result === 'error') {
      throw new Error(`API error: ${data['error-type'] || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchExchangeRates:', error);
    throw error;
  }
};

export const getExchangeRate = async (from: string, to: string): Promise<number> => {
  if (from === to) return 1;
  
  try {
    const rates = await fetchExchangeRates(from);
    return rates.conversion_rates[to] || 0;
  } catch (error) {
    console.error('Error getting exchange rate:', error);
    throw error;
  }
};
