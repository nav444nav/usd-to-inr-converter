# USD to INR Converter - Product Requirements Document (PRD)

## Overview
A modern, responsive web application that allows users to convert between US Dollars (USD) and Indian Rupees (INR) with real-time exchange rates. The application provides a clean, intuitive interface with additional features for a better user experience.

## Core Features

### 1. Currency Conversion
- Convert USD to INR and vice versa
- Real-time exchange rate updates
- Support for amount input with proper formatting
- Swap currencies with a single click

### 2. User Interface
- Clean, modern design with responsive layout
- Input validation and error handling
- Loading states during API calls
- Dark/light mode toggle
- Animated transitions for better UX

### 3. Exchange Rate Information
- Display current exchange rate
- Show last updated timestamp
- Option to refresh rates manually
- Rate change indicator (up/down)

### 4. Historical Data (Phase 2)
- 7-day exchange rate chart
- Ability to view historical rates
- Date range selector

### 5. Additional Features (Phase 2)
- Favorite conversions
- Copy result to clipboard
- Share conversion result
- Offline support with PWA

## Technical Requirements
- Built with React 18+ and TypeScript
- Styled with Tailwind CSS
- State management using React Context or Zustand
- API integration for real-time exchange rates (e.g., ExchangeRate-API, Open Exchange Rates)
- Responsive design (mobile-first approach)
- Unit tests with Jest and React Testing Library
- E2E tests with Cypress
- CI/CD pipeline setup

## Success Metrics
- Page load time under 2 seconds
- 100% mobile responsiveness
- 95%+ test coverage
- Lighthouse score above 90
- API response time under 500ms

## Future Enhancements
- Support for more currency pairs
- Currency conversion history
- Customizable decimal places
- Browser notifications for rate alerts
- Browser extension version
