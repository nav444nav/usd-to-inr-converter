// Global type declarations for the application

// Extend the global object type
declare global {
  // Declare global variables
  const global: NodeJS.Global & {
    fetch: typeof globalThis.fetch;
    import: {
      meta: {
        env: {
          VITE_EXCHANGE_RATE_API_KEY: string;
        };
      };
    };
  };

  // Polyfill for import.meta.env (Vite) in Jest tests
  interface ImportMeta {
    env: {
      VITE_EXCHANGE_RATE_API_KEY: string;
      [key: string]: string | undefined;
    };
  }

  // Extend the Window interface
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }

  // For Jest global polyfill
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface GlobalThis {
    import: any;
  }
}

// This is required for the file to be treated as a module
export {};
