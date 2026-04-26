import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedTextAltText = '6 cities logo';
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedTextAltText)).toBeInTheDocument();
  });
});
