import { render, screen } from '@testing-library/react';
import { renderWithHistory } from '../../test-utils';
import { makeFakeReview } from '../../test-utils';
import Reviews from './reviews';

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const preparedComponent = renderWithHistory(<Reviews reviews={[mockReview]} />);

    render(preparedComponent);

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });
});
