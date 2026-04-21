import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import Header from './header';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';

describe('Component: Header', () => {
  it('should render correctly when user is not signed in', () => {
    const fakeStore = makeFakeStore({
      USER: {
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        requestStatus: RequestStatus.Idle,
      },
      FAVORITE: {
        favorites: [],
        favoritesStatus: RequestStatus.Idle,
        favoriteStatus: RequestStatus.Idle,
      },
    });

    const withHistoryComponent = withHistory(<Header isUserSignIn={false} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', AppRoute.Favorites);
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  it('should render user info when user is signed in', () => {
    const mockEmail = 'test@example.com';
    const mockFavoriteCount = 5;

    const fakeStore = makeFakeStore({
      USER: {
        user: {
          email: mockEmail,
          name: 'Test User',
          avatarUrl: 'test.jpg',
          isPro: false,
          token: 'token123',
        },
        authorizationStatus: AuthorizationStatus.Auth,
        requestStatus: RequestStatus.Success,
      },
      FAVORITE: {
        favorites: Array.from({ length: mockFavoriteCount }, () => makeFakeOffer()),
        favoritesStatus: RequestStatus.Success,
        favoriteStatus: RequestStatus.Idle,
      },
    });

    const withHistoryComponent = withHistory(<Header isUserSignIn />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    expect(screen.getByText(mockEmail)).toBeInTheDocument();
    expect(screen.getByText(mockFavoriteCount.toString())).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();

    const profileLink = screen.getByRole('link', { name: new RegExp(mockEmail) }).closest('a');
    expect(profileLink).toHaveAttribute('href', AppRoute.Favorites);
  });

  it('should not render user navigation when shouldRenderUser is false', () => {
    const fakeStore = makeFakeStore();

    const withHistoryComponent = withHistory(
      <Header isUserSignIn shouldRenderUser={false} />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  it('should dispatch logoutAction when "Sign out" is clicked', async () => {
    const fakeStore = makeFakeStore({
      USER: {
        user: {
          email: 'test@example.com',
          name: 'Test User',
          avatarUrl: 'test.jpg',
          isPro: false,
          token: 'token123',
        },
        authorizationStatus: AuthorizationStatus.Auth,
        requestStatus: RequestStatus.Success,
      },
    });

    const withHistoryComponent = withHistory(<Header isUserSignIn />);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
    const signOutLink = screen.getByText('Sign out');
    await userEvent.click(signOutLink);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.mock.calls[0][0]).toBe(logoutAction());
  });
});
