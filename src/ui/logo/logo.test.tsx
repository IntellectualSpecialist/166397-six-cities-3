import { render, screen } from '@testing-library/react';
import { renderWithHistory } from '../../test-utils';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedTextAltText = '6 cities logo';
    const preparedComponent = renderWithHistory(<Logo />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedTextAltText)).toBeInTheDocument();
  });
});
