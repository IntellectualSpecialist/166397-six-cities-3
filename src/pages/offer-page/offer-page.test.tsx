import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory, MemoryHistory } from 'history';
import OfferPage from './offer-page';
import { makeFakeExtraOffer, makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { State } from '../../types/state-type';
import { ExtraOffer } from '../../types/extra-offer';
import { capitalizeValue, getRatingPercentage } from '../../utils/common';
import { ReviewType } from '../../types/review-type';
import { Offer } from '../../types/offer-type';

describe('Component: OfferPage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { mockStore } = withStore(withHistoryComponent, makeFakeStore());
    const state = mockStore.getState() as State;

    const offer = { ...(state.OFFER.offer as ExtraOffer), isFavorite: true };
    const reviews = state.REVIEWS.reviews;
    const nearby = state.OFFER.nearby;
    const offerId = offer.id;
    const withFavoriteStateComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent: withFavoriteStoreComponent } = withStore(withFavoriteStateComponent, makeFakeStore({
      OFFER: {
        ...state.OFFER,
        offer,
      },
      REVIEWS: state.REVIEWS,
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        requestStatus: RequestStatus.Idle,
      },
      FAVORITE: {
        favorites: [{ ...makeFakeOffer(), id: offerId }],
        favoritesStatus: RequestStatus.Idle,
      },
    }));

    mockHistory.push(AppRoute.Offer.replace(':id', offerId));

    render(withFavoriteStoreComponent);

    expect(screen.getByTestId('nearby-title')).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByTestId('offer-type')).toHaveTextContent(capitalizeValue(offer.type));
    expect(screen.getByTestId('offer-description')).toHaveTextContent(offer.description);
    offer.goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
    expect(screen.getByText(offer.rating)).toBeInTheDocument();
    expect(screen.getByText(`${offer.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${offer.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(offer.host.name)).toBeInTheDocument();
    expect(screen.getByTestId('rating-stars-main')).toHaveStyle(`width: ${getRatingPercentage(offer.rating)}`);
    offer.images.forEach((image) => {
      expect(screen.getByTestId(image)).toHaveAttribute('src', image);
    });
    expect(screen.getByTestId('favorite-button')).toHaveClass('offer__bookmark-button--active');
    reviews.forEach((review: ReviewType) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
      expect(screen.getByText(review.rating)).toBeInTheDocument();
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
    });
    nearby.forEach((nearbyOffer: Offer) => {
      expect(screen.getByText(nearbyOffer.title)).toBeInTheDocument();
    });
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText(reviews.length)).toBeInTheDocument();
  });

  it('should render isPro when host is Pro', () => {
    const offer = makeFakeExtraOffer();
    offer.host.isPro = true;
    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFER: {
        offer: offer,
        status: RequestStatus.Success,
        nearby: [],
      },
    }));

    mockHistory.push(AppRoute.Offer.replace(':id', offer.id));

    render(withStoreComponent);

    expect(screen.getByTestId('host-status')).toBeInTheDocument();
  });

  it('should not render isPro when host is not Pro', () => {
    const offer = makeFakeExtraOffer();
    offer.host.isPro = false;
    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFER: {
        offer: offer,
        status: RequestStatus.Success,
        nearby: [],
      },
    }));

    mockHistory.push(AppRoute.Offer.replace(':id', offer.id));

    render(withStoreComponent);

    expect(screen.queryByTestId('host-status')).not.toBeInTheDocument();
  });

  it('should render Form when user is logged in', () => {
    const offer = makeFakeExtraOffer();
    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFER: {
        offer: offer,
        status: RequestStatus.Success,
        nearby: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
        requestStatus: RequestStatus.Idle,
      },
    }));

    mockHistory.push(AppRoute.Offer.replace(':id', offer.id));

    render(withStoreComponent);

    expect(screen.getByText(/your review/i)).toBeInTheDocument();
  });

  it('should not render Form when user is not logged in', () => {
    const offer = makeFakeExtraOffer();
    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFER: {
        offer: offer,
        status: RequestStatus.Success,
        nearby: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
        requestStatus: RequestStatus.Idle,
      },
    }));

    mockHistory.push(AppRoute.Offer.replace(':id', offer.id));

    render(withStoreComponent);

    expect(screen.queryByText(/your review/i)).not.toBeInTheDocument();
  });

  it('should render NotFoundPage when offer is not found', () => {
    const offer = makeFakeExtraOffer();
    mockHistory.push(AppRoute.Offer.replace(':id', 'non-existent-id'));

    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFER: {
        offer: offer,
        status: RequestStatus.Failed,
        nearby: [],
      },
    }));

    render(withStoreComponent);

    expect(mockHistory.location.pathname).toBe('/404');
  });

  it('should render Loading message when offer is loading', () => {
    const offer = makeFakeExtraOffer();
    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFER: {
        offer: offer,
        status: RequestStatus.Loading,
        nearby: [],
      },
    }));

    mockHistory.push(AppRoute.Offer.replace(':id', offer.id));

    render(withStoreComponent);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
