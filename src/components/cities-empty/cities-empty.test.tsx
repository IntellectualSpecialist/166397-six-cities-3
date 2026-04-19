import { render, screen } from '@testing-library/react';
import CitiesEmpty from './cities-empty';

describe('CitiesEmpty component', () => {
  it('should render correctly with the given city', () => {
    const city = 'Paris';

    render(<CitiesEmpty city={city} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
  });
});
