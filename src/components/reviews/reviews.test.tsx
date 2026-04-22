import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { makeFakeReview } from '../../utils/mocks';
import Reviews from './reviews';

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const preparedComponent = withHistory(<Reviews reviews={[mockReview]} />);

    render(preparedComponent);

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });
});
