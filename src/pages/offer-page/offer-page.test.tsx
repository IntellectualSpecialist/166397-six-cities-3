import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory, MemoryHistory } from 'history';
import OfferPage from './offer-page';
import { makeFakeStore } from '../../utils/mocks';
import { AppRoute } from '../../const';

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

    mockHistory.push(`${AppRoute.Offer}/${offerId}`);
    const expectedText = 'Other places in the neighbourhood';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
