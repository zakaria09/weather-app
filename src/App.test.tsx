import App from './App';
import {renderWithClient} from './tests/utils';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/react';
import {setupServer} from 'msw/node';
import {HttpResponse, http} from 'msw';

const server = setupServer(
  ...[
    http.get('http://api.openweathermap.org/geo/1.0/*', () => {
      return HttpResponse.json({
        name: 'Leeds',
        lat: 53,
        lon: -1,
        country: 'GB',
        state: 'England',
      });
    }),
  ]
);

describe('Form functionality', () => {
  beforeEach(() => {
    server.listen();
  });
  it('should pass', async () => {
    renderWithClient(<App />);
    const user = userEvent.setup();
    const input = await screen.getByTestId('city-input');
    await user.type(input, 'la');
    await user.click(screen.getByRole('button', {name: /get weather/i}));
    const cityName = await screen.findByTestId('city');
    expect(cityName).toBeInTheDocument();
  });
});
