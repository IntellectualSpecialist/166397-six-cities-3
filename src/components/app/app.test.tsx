import { createMemoryHistory, MemoryHistory } from 'history';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { render, screen } from '@testing-library/react';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByTestId('cities')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigates to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);
    const expectedText = '404. Page not found';
    const expectedLinkText = 'Вернуться на главную';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user is not authorized', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        USER:
        {
          authorizationStatus: AuthorizationStatus.NoAuth,
          user: null,
          requestStatus: RequestStatus.Idle
        }
      }));
    mockHistory.push(AppRoute.Login);
    const expectedText = 'Sign in';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user is authorized', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
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
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, makeFakeStore());
    const state = mockStore.getState();
    const offerId = (state.OFFERS as { offers: { id: string }[] }).offers[0].id;

    mockHistory.push(`${AppRoute.Offer}/${offerId}`);
    const expectedText = 'Other places in the neighbourhood';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
