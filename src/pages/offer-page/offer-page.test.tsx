import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory, MemoryHistory } from 'history';
import OfferPage from './offer-page';
import { makeFakeExtraOffer, makeFakeStore } from '../../utils/mocks';
import { AppRoute, RequestStatus } from '../../const';

describe('Component: OfferPage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, makeFakeStore());
    const state = mockStore.getState();
    const offerId = (state.OFFERS as { offers: { id: string }[] }).offers[0].id;

    mockHistory.push(AppRoute.Offer.replace(':id', offerId));

    render(withStoreComponent);

    expect(screen.getByTestId('nearby-title')).toBeInTheDocument();
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
