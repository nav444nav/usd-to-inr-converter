// Mock environment variables
process.env.VITE_EXCHANGE_RATE_API_KEY = 'test-api-key';

// Mock the import.meta object for tests
if (typeof import.meta === 'undefined') {
  globalThis.import = { meta: { env: { VITE_EXCHANGE_RATE_API_KEY: 'test-api-key' } } };
}
