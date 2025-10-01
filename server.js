import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the project root
dotenv.config({ path: resolve(__dirname, '.env') });

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Hardcoded exchange rates as fallback
const FALLBACK_RATES = {
  USD: 1,
  INR: 83.5, // Example rate, will be updated by the API
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.25
};

// Last updated timestamp
let lastUpdated = new Date();

// Proxy endpoint for exchange rates with fallback
app.get('/api/exchange-rates/:baseCurrency', async (req, res) => {
  try {
    const { baseCurrency } = req.params;
    
    // Try to fetch from a free API
    try {
      const apiUrl = 'https://open.er-api.com/v6/latest/USD';
      console.log('Fetching rates from:', apiUrl);
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.result === 'success') {
        // Update our fallback rates with fresh data
        Object.assign(FALLBACK_RATES, data.rates);
        lastUpdated = new Date();
        
        // Format the response to match what the frontend expects
        const formattedResponse = {
          result: 'success',
          base_code: 'USD',
          conversion_rates: FALLBACK_RATES,
          time_last_update_unix: Math.floor(lastUpdated.getTime() / 1000),
          time_last_update_utc: lastUpdated.toUTCString(),
          time_next_update_unix: Math.floor(lastUpdated.getTime() / 1000) + 3600, // 1 hour later
          time_next_update_utc: new Date(Date.now() + 3600000).toUTCString()
        };
        
        return res.json(formattedResponse);
      }
    } catch (apiError) {
      console.warn('API fetch failed, using fallback rates:', apiError.message);
    }
    
    // If we get here, use the fallback rates
    console.log('Using fallback exchange rates');
    const formattedResponse = {
      result: 'success',
      base_code: 'USD',
      conversion_rates: FALLBACK_RATES,
      time_last_update_unix: Math.floor(lastUpdated.getTime() / 1000),
      time_last_update_utc: lastUpdated.toUTCString(),
      time_next_update_unix: Math.floor(lastUpdated.getTime() / 1000) + 3600,
      time_next_update_utc: new Date(Date.now() + 3600000).toUTCString()
    };
    
    res.json(formattedResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: error.message,
      result: 'error',
      'error-type': 'api-error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
