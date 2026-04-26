import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedTextAltText = '6 cities logo';
    const preparedComponent = withHistory(<Logo />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedTextAltText)).toBeInTheDocument();
  });
});
