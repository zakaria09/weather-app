import {render} from '@testing-library/react';
import App from './App';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

it('should pass', () => {
  render(
    <QueryClientProvider client={queryclient}>
      <App />
    </QueryClientProvider>
  );
  expect(true).toBe(true);
});
