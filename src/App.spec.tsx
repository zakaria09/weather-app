import App from './App';
import {renderWithClient} from './tests/utils';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/react';
import {server} from './tests/setupTest';
import {HttpResponse, http} from 'msw';

describe('App.tsx', () => {
  const setup = async () => {
    const user = userEvent.setup();
    const input = await screen.findByRole('textbox', {name: /city/i});
    await user.type(input, 'la');
    const submitBtn = screen.getByRole('button', {name: /get weather/i});
    await user.click(submitBtn);
  };

  it('should display city name after form submission', async () => {
    renderWithClient(<App />);
    setup();
    const cityName = await screen.findByText(/Los Angeles/i);
    expect(cityName).toBeInTheDocument();
  });

  it('should display country test id after form submission', async () => {
    renderWithClient(<App />);
    setup();
    const country = await screen.findByText(/US/i);
    expect(country).toBeInTheDocument();
  });

  it('should display weather forecast after the day is selected', async () => {
    renderWithClient(<App />);
    const user = userEvent.setup();
    setup();
    const forecastBtn = await screen.findAllByRole('button', {
      name: /tuesday/i,
    });
    await user.click(forecastBtn[0]);
    const [temp] = await screen.getAllByText('10°');
    expect(temp).toBeInTheDocument();
  });

  describe('Error handling', () => {
    beforeEach(() => {
      const handler = [
        http.get('https://api.openweathermap.org/data/2.5/forecast', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Error',
          });
        }),
      ];
      server.use(...handler);
    });
    it('should display an error message if server responds with an error code', async () => {
      renderWithClient(<App />);
      setup();
      const errorMsg = await screen.findAllByText('Oops somethin went wrong!');
      expect(errorMsg[0]).toBeInTheDocument();
    });
  });
});
