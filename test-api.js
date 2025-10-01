const API_KEY = '55830cabf19e5d04990fff83';
const API_BASE_URL = 'https://v6.exchangerate-api.com/v6';

async function testApi() {
  try {
    console.log('Testing API key:', API_KEY);
    const response = await fetch(`${API_BASE_URL}/${API_KEY}/latest/USD`);
    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify([...response.headers]));
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testApi();
