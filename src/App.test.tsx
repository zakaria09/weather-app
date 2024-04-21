import App from './App';
import {renderWithClient} from './tests/utils';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/react';

describe('App.tsx', () => {
  it('should ', async () => {
    renderWithClient(<App />);
    const user = userEvent.setup();
    const input = await screen.getByTestId('city-input');
    await user.type(input, 'la');
    await user.click(screen.getByRole('button', {name: /get weather/i}));
    const cityName = await screen.findByTestId('city');
    expect(cityName).toBeInTheDocument();
  });
});
