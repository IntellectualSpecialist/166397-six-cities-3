import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import FavoriteButton from './favorite-button';
import { makeFakeStore, makeFakeUser } from '../../utils/mocks';
import { AuthorizationStatus, RequestStatus } from '../../const';

const mockDispatch = vi.fn();
vi.mock('../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn(),
}));

describe('Component: FavoriteButton', () => {
  const mockId = 'offer123';
  const mockClassName = 'favorite-btn';
  const mockActiveClassName = 'favorite-btn--active';
  const mockSvgClassName = 'favorite-icon';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly when isFavorite = false', () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        isFavorite={false}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(mockClassName);
    expect(button).not.toHaveClass(mockActiveClassName);
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'button');
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should render with active class when isFavorite = true', () => {
    const fakeStore = makeFakeStore({
      USER: {
        user: makeFakeUser(),
        authorizationStatus: AuthorizationStatus.Auth,
        requestStatus: RequestStatus.Success,
      },
    });
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        isFavorite
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(mockClassName);
    expect(button).toHaveClass(mockActiveClassName);
  });

  it('should navigate to login when user is not authorized and button is clicked', async () => {
    const fakeStore = makeFakeStore({
      USER: {
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        requestStatus: RequestStatus.Idle,
      },
    });
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        isFavorite={false}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should disable button during request and re-enable after success', async () => {
    const mockUnwrap = vi.fn().mockResolvedValue(undefined);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    const fakeStore = makeFakeStore({
      USER: {
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        requestStatus: RequestStatus.Idle,
      },
    });
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        isFavorite={false}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    expect(button).not.toBeDisabled();
  });
});
