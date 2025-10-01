import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock the global fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock the window.matchMedia function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Polyfill Vite env for Jest (Jest doesn't support import.meta)
if (!globalThis.import || !globalThis.import.meta) {
  // @ts-ignore
  globalThis.import = { meta: { env: { VITE_EXCHANGE_RATE_API_KEY: 'test-api-key' } } };
}
