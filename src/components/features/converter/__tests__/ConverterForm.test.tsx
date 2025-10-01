import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ConverterForm from '../ConverterForm';

// Mock the exchange rate service
jest.mock('../../../../services/exchangeRateService', () => ({
  __esModule: true,
  getExchangeRate: jest.fn().mockResolvedValue(83.25),
  fetchExchangeRates: jest.fn().mockResolvedValue({
    result: 'success',
    documentation: '',
    terms_of_use: '',
    time_last_update_unix: 0,
    time_last_update_utc: '',
    time_next_update_unix: 0,
    time_next_update_utc: '',
    base_code: 'USD',
    conversion_rates: { USD: 1, INR: 83.25 }
  })
}));

// Import the mocked module after setting up the mock
import * as exchangeRateService from '../../../../services/exchangeRateService';

// Setup default mock implementations
beforeEach(() => {
  jest.clearAllMocks();
  (exchangeRateService.getExchangeRate as jest.Mock).mockResolvedValue(83.25);
  (exchangeRateService.fetchExchangeRates as jest.Mock).mockResolvedValue({
    result: 'success',
    documentation: '',
    terms_of_use: '',
    time_last_update_unix: 0,
    time_last_update_utc: '',
    time_next_update_unix: 0,
    time_next_update_utc: '',
    base_code: 'USD',
    conversion_rates: { USD: 1, INR: 83.25 }
  });
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ConverterForm />
    </QueryClientProvider>
  );
};

describe('ConverterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (exchangeRateService.getExchangeRate as jest.Mock).mockResolvedValue(83.25);
  });

  it('renders the form with default values', async () => {
    await act(async () => {
      renderComponent();
    });
    
    expect(screen.getByLabelText(/amount/i)).toHaveValue(1);
    const [fromSelect, toSelect] = screen.getAllByRole('combobox');
    expect(fromSelect).toHaveValue('USD');
    expect(toSelect).toHaveValue('INR');
  });

  it('updates the amount when input changes', async () => {
    await act(async () => {
      renderComponent();
    });
    
    const amountInput = screen.getByLabelText(/amount/i);
    await act(async () => {
      fireEvent.change(amountInput, { target: { value: '100' } });
    });
    
    expect(amountInput).toHaveValue(100);
  });

  it('swaps currencies when swap button is clicked', async () => {
    await act(async () => {
      renderComponent();
    });
    
    const swapButton = screen.getByRole('button', { name: /swap/i });
    await act(async () => {
      fireEvent.click(swapButton);
    });
    
    await waitFor(() => {
      const [fromSelect, toSelect] = screen.getAllByRole('combobox');
      expect(fromSelect).toHaveValue('INR');
      expect(toSelect).toHaveValue('USD');
    });
  });

  it('shows loading state when converting', async () => {
    // Delay the mock response to test loading state
    let resolvePromise: (value: number | PromiseLike<number>) => void;
    (exchangeRateService.getExchangeRate as jest.Mock).mockImplementation(
      () => new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    await act(async () => {
      renderComponent();
    });
    
    // If the form auto-converts, skip clicking a convert button
    expect(screen.getByText(/loading latest rates/i)).toBeInTheDocument();
    
    await act(async () => {
      resolvePromise(83.25);
    });
    
    expect(screen.queryByText(/loading latest rates/i)).not.toBeInTheDocument();
  });

  it('displays error message when conversion fails', async () => {
    (exchangeRateService.getExchangeRate as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    await act(async () => {
      renderComponent();
    });
    
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch latest exchange rates/i)).toBeInTheDocument();
    });
  });

  it('displays the converted amount after successful conversion', async () => {
    await act(async () => {
      renderComponent();
    });
    
    const amountInput = screen.getByLabelText(/amount/i);
    await act(async () => {
      fireEvent.change(amountInput, { target: { value: '10' } });
    });
    
    await waitFor(() => {
      // Find the input by its value
      expect(screen.getByDisplayValue('₹832.50')).toBeInTheDocument();
    });
  });
});
