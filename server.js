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

// Verify API key is loaded
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
if (!API_KEY) {
  console.error('ERROR: EXCHANGE_RATE_API_KEY is not set in .env file');
  process.exit(1);
}

console.log('Using ExchangeRate-API key:', `${API_KEY.substring(0, 5)}...`);

// Middleware
app.use(cors());
app.use(express.json());

// Proxy endpoint for exchange rates
app.get('/api/exchange-rates/:baseCurrency', async (req, res) => {
  try {
    const { baseCurrency } = req.params;
    const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;
    console.log('Proxying request to:', apiUrl);
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data['error-type'] || 'Failed to fetch exchange rates');
    }
    
    res.json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
