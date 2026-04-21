import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import PlaceCard from './place-card';
import { makeFakeOffer } from '../../utils/mocks';

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const expectedAltText = 'Place image';
    const expectedText = 'Raiting';

    const mockOffer = makeFakeOffer();
    const preparedComponent = withHistory(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />
    );

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
