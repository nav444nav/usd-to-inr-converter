# CORS Issue and Solution in USD to INR Converter

## The Problem

We encountered a Cross-Origin Resource Sharing (CORS) error when trying to fetch exchange rate data directly from the ExchangeRate-API in our React frontend application. The error message was:

```
Access to fetch at 'https://v6.exchangerate-api.com/v6/...' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Why It Happened

1. **Browser Security**: Browsers enforce the same-origin policy, which restricts web pages from making requests to a different domain than the one that served the web page.

2. **Missing CORS Headers**: The ExchangeRate-API doesn't include the necessary CORS headers (`Access-Control-Allow-Origin`) in its responses, which would allow browsers to make cross-origin requests.

## The Solution

We implemented a server-side proxy to handle the API requests. Here's how it works:

1. **Proxy Server**: Created a simple Express.js server that acts as a middleman between our frontend and the ExchangeRate-API.

2. **Endpoints**: Set up a proxy endpoint (`/api/exchange-rates/:baseCurrency`) that forwards requests to the ExchangeRate-API.

3. **Environment Variables**: Properly configured environment variables to securely store and access the API key.

4. **CORS Middleware**: Added CORS middleware to the proxy server to allow requests from our frontend domain.

## Implementation Details

### 1. Proxy Server (`server.js`)
- Handles API requests from the frontend
- Forwards requests to ExchangeRate-API
- Adds proper CORS headers
- Handles errors and responses

### 2. Environment Configuration (`.env`)
```
EXCHANGE_RATE_API_KEY=your_api_key_here
VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
```

### 3. Frontend Service (`exchangeRateService.ts`)
- Updated to make requests to our proxy server instead of directly to ExchangeRate-API
- Handles responses and errors appropriately

## How to Run

1. Start the proxy server and frontend together:
   ```bash
   npm run dev:all
   ```

2. Access the application at: http://localhost:5175

## Lessons Learned

1. **CORS is a Browser Security Feature**: It's not an error with the API itself, but a security feature enforced by browsers.

2. **Proxy Servers are Useful**: They can help bypass CORS issues during development.

3. **Environment Variables**: Always keep sensitive information like API keys in environment variables, not in the source code.

4. **Error Handling**: Implement proper error handling and logging to diagnose issues quickly.

## Future Improvements

1. **Production Deployment**: For production, consider using a cloud function or API gateway as a proxy.

2. **Rate Limiting**: Implement rate limiting on the proxy server to prevent abuse.

3. **Caching**: Add caching for exchange rates to reduce API calls.

4. **HTTPS**: Ensure the proxy server uses HTTPS in production.

## References

- [MDN Web Docs on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Express.js Documentation](https://expressjs.com/)
- [ExchangeRate-API Documentation](https://www.exchangerate-api.com/docs)
