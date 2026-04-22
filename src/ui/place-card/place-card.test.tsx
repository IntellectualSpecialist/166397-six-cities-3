import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import PlaceCard from './place-card';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const expectedAltText = 'Place image';
    const expectedText = 'Rating';

    const mockOffer = makeFakeOffer();
    const { withStoreComponent } = withStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, makeFakeStore()
    );
    const preparedComponent = withHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should call handleActiveCardChange when hovered', async () => {
    const mockHandleActiveCardChange = vi.fn();
    const mockOffer = makeFakeOffer();
    const { withStoreComponent } = withStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
        handleActiveCardChange={mockHandleActiveCardChange}
      />, makeFakeStore()
    );
    const preparedComponent = withHistory(
      withStoreComponent
    );

    render(preparedComponent);

    const placeCardElement = screen.getByRole('article');

    await userEvent.hover(placeCardElement);

    expect(mockHandleActiveCardChange).toBeCalledTimes(1);
  });

  it('should call handleActiveCardChange with undefined when unhovered', async () => {
    const mockHandleActiveCardChange = vi.fn();
    const mockOffer = makeFakeOffer();
    const { withStoreComponent } = withStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
        handleActiveCardChange={mockHandleActiveCardChange}
      />, makeFakeStore()
    );
    const preparedComponent = withHistory(
      withStoreComponent
    );

    render(preparedComponent);

    const placeCardElement = screen.getByRole('article');

    await userEvent.unhover(placeCardElement);

    expect(mockHandleActiveCardChange).toBeCalledTimes(1);
  });

  it('should render Premium badge when offer is premium', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isPremium = true;
    const { withStoreComponent } = withStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, makeFakeStore()
    );
    const preparedComponent = withHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render Premium badge when offer is false', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isPremium = false;
    const { withStoreComponent } = withStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, makeFakeStore()
    );
    const preparedComponent = withHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render bookmark button with active class when offer is favorite', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isFavorite = true;
    const { withStoreComponent } = withStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, makeFakeStore()
    );
    const preparedComponent = withHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
  });

  it('should render bookmark button without active class when offer is not favorite', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isFavorite = false;
    const { withStoreComponent } = withStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, makeFakeStore()
    );
    const preparedComponent = withHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.getByRole('button')).not.toHaveClass('place-card__bookmark-button--active');
  });
});
