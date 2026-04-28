import { render, screen } from '@testing-library/react';
import { renderWithHistory } from '../../test-utils';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedTextAltText = '6 cities logo';
    const preparedComponent = renderWithHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedTextAltText)).toBeInTheDocument();
  });
});
