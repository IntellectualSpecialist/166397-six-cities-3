import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory } from '../../utils';
import FavoriteButton from './favorite-button';
import { makeFakeOffer, makeFakeUser } from '../../utils';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { createMemoryHistory } from 'history';
import type { State } from '../../types';

const mockDispatch = vi.fn();
const mockUseAppSelector = vi.fn<[selector: (state: State) => unknown], unknown>();

vi.mock('../../hooks', async () => {
  const actual = await vi.importActual<typeof import('../../hooks')>('../../hooks');
  return {
    ...actual,
    useAppSelector: (selector: (state: State) => unknown): unknown => mockUseAppSelector(selector),
    useAppDispatch: () => mockDispatch,
  };
});

const buildMockState = (isAuthorized = true, favoriteIds: string[] = []) => ({
  USER: {
    user: isAuthorized ? makeFakeUser() : null,
    authorizationStatus: isAuthorized ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth,
    requestStatus: RequestStatus.Idle,
  },
  FAVORITE: {
    favorites: favoriteIds.map((id) => ({ ...makeFakeOffer(), id })),
    favoritesStatus: RequestStatus.Idle,
  },
});

describe('Component: FavoriteButton', () => {
  const mockId = 'offer123';
  const mockClassName = 'favorite-btn';
  const mockActiveClassName = 'favorite-btn--active';
  const mockSvgClassName = 'favorite-icon';

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppSelector.mockImplementation((selector: (state: State) => unknown) => selector(buildMockState(true) as State));
  });

  it('should render correctly when item is not favorite', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Root);
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
        isFavorite={false}
      />,
      history
    );
    render(withHistoryComponent);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(mockClassName);
    expect(button).not.toHaveClass(mockActiveClassName);
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'button');
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should render with active class when isFavorite prop is true', () => {
    mockUseAppSelector.mockImplementation((selector: (state: State) => unknown) => selector(buildMockState(true, [mockId]) as State));
    const history = createMemoryHistory();
    history.push(AppRoute.Root);
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
        isFavorite
      />,
      history
    );
    render(withHistoryComponent);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(mockClassName);
    expect(button).toHaveClass(mockActiveClassName);
  });

  it('should use isFavorite prop before switching to store value', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Root);
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
        isFavorite
      />,
      history
    );
    render(withHistoryComponent);

    expect(screen.getByRole('button')).toHaveClass(mockActiveClassName);
  });

  it('should navigate to login when user is not authorized and button is clicked', async () => {
    mockUseAppSelector.mockImplementation((selector: (state: State) => unknown) => selector(buildMockState(false) as State));
    const history = createMemoryHistory();
    history.push(AppRoute.Root);
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
        isFavorite={false}
      />,
      history
    );
    render(withHistoryComponent);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(history.location.pathname).toBe(AppRoute.Login);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should disable button during request and re-enable after success', async () => {
    const mockUnwrap = vi.fn().mockResolvedValue(undefined);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });
    const history = createMemoryHistory();
    history.push(AppRoute.Root);
    const withHistoryComponent = withHistory(
      <FavoriteButton
        id={mockId}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
        isFavorite={false}
      />,
      history
    );
    render(withHistoryComponent);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    expect(button).not.toBeDisabled();
    expect(mockDispatch).toHaveBeenCalled();
  });
});
