import App from './App';
import {renderWithClient} from './tests/utils';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/react';

describe('App.tsx', () => {
  it('should display city test id after form submission', async () => {
    renderWithClient(<App />);
    const user = userEvent.setup();
    const input = await screen.getByTestId('city-input');
    await user.type(input, 'la');
    await user.click(screen.getByRole('button', {name: /get weather/i}));
    const cityName = await screen.findByTestId('city');
    expect(cityName).toBeInTheDocument();
  });

  it('should display country test id after form submission', async () => {
    renderWithClient(<App />);
    const user = userEvent.setup();
    const input = await screen.getByTestId('city-input');
    await user.type(input, 'la');
    await user.click(screen.getByRole('button', {name: /get weather/i}));
    const country = await screen.findByTestId('country');
    expect(country).toBeInTheDocument();
  });

  it('should display weather forecast after the day is selected', async () => {
    renderWithClient(<App />);
    const user = userEvent.setup();
    const input = await screen.getByTestId('city-input');
    await user.type(input, 'la');
    await user.click(screen.getByRole('button', {name: /get weather/i}));
    const forecastBtn = await screen.findAllByRole('button', {
      name: /tuesday/i,
    });
    await user.click(forecastBtn[0]);
    const [temp] = await screen.getAllByText('10°');
    expect(temp).toBeInTheDocument();
  });

  describe('', () => {});
});
