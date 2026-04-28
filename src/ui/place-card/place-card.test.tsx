import { render, screen } from '@testing-library/react';
import { renderWithHistory, renderWithStore } from '../../test-utils';
import PlaceCard from './place-card';
import { makeFakeOffer, makeFakeStore } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { capitalizeValue, getRatingPercentage } from '../../utils';
import { AuthorizationStatus, RequestStatus } from '../../const';

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const expectedAltText = 'Place image';
    const expectedText = 'Rating';

    const mockOffer = makeFakeOffer({ isFavorite: true });
    const fakeStore = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        requestStatus: RequestStatus.Idle,
      },
      FAVORITE: {
        favorites: [{ ...mockOffer }],
        favoritesStatus: RequestStatus.Idle,
      },
    });
    const { withStoreComponent } = renderWithStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, fakeStore
    );
    const preparedComponent = renderWithHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(capitalizeValue(mockOffer.type))).toBeInTheDocument();
    expect(screen.getByTestId('rating-stars')).toHaveStyle(`width: ${getRatingPercentage(mockOffer.rating)}`);
    expect(screen.getByTestId('image')).toHaveAttribute('src', mockOffer.previewImage);
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
  });

  it('should call handleActiveCardChange when hovered', async () => {
    const mockHandleActiveCardChange = vi.fn();
    const mockOffer = makeFakeOffer();
    const { withStoreComponent } = renderWithStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
        onActiveCardChange={mockHandleActiveCardChange}
      />, makeFakeStore()
    );
    const preparedComponent = renderWithHistory(
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
    const { withStoreComponent } = renderWithStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
        onActiveCardChange={mockHandleActiveCardChange}
      />, makeFakeStore()
    );
    const preparedComponent = renderWithHistory(
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
    const { withStoreComponent } = renderWithStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, makeFakeStore()
    );
    const preparedComponent = renderWithHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render Premium badge when offer is false', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isPremium = false;
    const { withStoreComponent } = renderWithStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, makeFakeStore()
    );
    const preparedComponent = renderWithHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render bookmark button with active class when offer is favorite', () => {
    const mockOffer = makeFakeOffer({ isFavorite: true });
    const fakeStore = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        requestStatus: RequestStatus.Idle,
      },
      FAVORITE: {
        favorites: [{ ...mockOffer }],
        favoritesStatus: RequestStatus.Idle,
      },
    });
    const { withStoreComponent } = renderWithStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, fakeStore
    );
    const preparedComponent = renderWithHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button--active');
  });

  it('should render bookmark button without active class when offer is not favorite', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.isFavorite = false;
    const { withStoreComponent } = renderWithStore(
      <PlaceCard
        offer={mockOffer}
        className="test-class"
        imgClassName="test-img-class"
      />, makeFakeStore()
    );
    const preparedComponent = renderWithHistory(
      withStoreComponent
    );

    render(preparedComponent);

    expect(screen.getByRole('button')).not.toHaveClass('place-card__bookmark-button--active');
  });
});
