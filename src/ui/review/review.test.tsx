import { render, screen } from '@testing-library/react';
import Review from './review';
import { makeFakeReview } from '../../utils/mocks';

describe('Review component', () => {
  it('should render correct', () => {
    const mockReview = makeFakeReview();
    const formettedDate = new Date(mockReview.date).toLocaleString('en-US', {month: 'long', year: 'numeric'});

    render(<Review {...mockReview} />);

    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute('src', mockReview.user.avatarUrl);
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(formettedDate)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
