import { createMemoryHistory, MemoryHistory } from 'history';
import App from './app';
import { renderWithHistory, renderWithStore } from '../../test-utils';
import { makeFakeStore } from '../../test-utils';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { render, screen } from '@testing-library/react';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigates to "/"', () => {
    const withHistoryComponent = renderWithHistory(<App />, mockHistory);
    const { withStoreComponent } = renderWithStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByTestId('cities')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigates to non-existent route', () => {
    const withHistoryComponent = renderWithHistory(<App />, mockHistory);
    const { withStoreComponent } = renderWithStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);
    const expectedText = '404. Page not found';
    const expectedLinkText = 'Вернуться на главную';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user is not authorized', () => {
    const withHistoryComponent = renderWithHistory(<App />, mockHistory);
    const { withStoreComponent } = renderWithStore(withHistoryComponent, makeFakeStore(
      {
        USER:
        {
          authorizationStatus: AuthorizationStatus.NoAuth,
          user: null,
          requestStatus: RequestStatus.Idle
        }
      }));
    mockHistory.push(AppRoute.Login);
    const expectedText = 'sign-in';

    render(withStoreComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user is authorized', () => {
    const withHistoryComponent = renderWithHistory(<App />, mockHistory);
    const { withStoreComponent } = renderWithStore(withHistoryComponent, makeFakeStore(
      {
        USER:
        {
          authorizationStatus: AuthorizationStatus.Auth,
          user: null,
          requestStatus: RequestStatus.Idle
        }
      }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigates to "/offer/:id"', () => {
    const withHistoryComponent = renderWithHistory(<App />, mockHistory);
    const { withStoreComponent, mockStore } = renderWithStore(withHistoryComponent, makeFakeStore());
    const state = mockStore.getState();
    const offerId = (state.OFFERS as { offers: { id: string }[] }).offers[0].id;

    mockHistory.push(AppRoute.Offer.replace(':id', offerId));
    const expectedText = 'Other places in the neighbourhood';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
