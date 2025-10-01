# USD to INR Currency Converter

A modern, responsive currency converter application built with React, TypeScript, and Tailwind CSS. Convert between US Dollars (USD) and Indian Rupees (INR) with real-time exchange rates.

## Features

- Real-time currency conversion between USD and INR
- Clean, responsive UI built with Tailwind CSS
- Loading states and error handling
- Swap currencies with a single click
- Formatted currency display
- Fallback to mock rates if API is unavailable

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- ExchangeRate-API key (get one from [exchangerate-api.com](https://www.exchangerate-api.com/))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/usd-to-inr-converter.git
   cd usd-to-inr-converter
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Add your ExchangeRate-API key
   ```env
   VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/         # Reusable UI components
│   └── features/      # Feature-specific components
│       └── converter/ # Currency converter components
├── hooks/             # Custom React hooks
├── services/          # API services and utilities
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## Technologies Used

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [ExchangeRate-API](https://www.exchangerate-api.com/) - Currency exchange rates

## License

This project is open source and available under the [MIT License](LICENSE).
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
