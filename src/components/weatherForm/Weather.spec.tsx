import {render} from '@testing-library/react';
import WeatherForm from './WeatherForm';
import {vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/react';

describe('WeatherForm.tsx', () => {
  it('should call the onCity with input', async () => {
    const cityMock = vi.fn();
    const locationMock = vi.fn();
    render(<WeatherForm onCity={cityMock} onLocation={locationMock} />);

    const user = userEvent.setup();
    const input = await screen.findByRole('textbox', {name: /city/i});
    await user.type(input, 'la');
    const submitBtn = screen.getByRole('button', {name: /get weather/i});
    await user.click(submitBtn);

    expect(cityMock).toHaveBeenCalledWith('la');
  });
});
