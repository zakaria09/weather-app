import {render} from '@testing-library/react';
import {HttpResponse, http} from 'msw';
import * as React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {responseForecast} from '../mockData/mockForecast';

export const handlers = [
  http.get('http://api.openweathermap.org/geo/1.0/*', () => {
    return HttpResponse.json([
      {
        name: 'Los Angeles"',
        lat: 53,
        lon: -1,
        country: "US",
        state: "California",
      },
    ]);
  }),
  http.get('https://api.openweathermap.org/data/2.5/forecast', () => {
    return HttpResponse.json({
      city: {
        name: "Los Angeles",
        country: "US"
      },
      cod: "200",
      message: 0,
      cnt: 40,
      list: responseForecast,
    });
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const {rerender, ...result} = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
