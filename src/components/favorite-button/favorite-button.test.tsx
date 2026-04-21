import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import FavoriteButton from './favorite-button';
import { makeFakeStore, makeFakeUser } from '../../utils/mocks';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { changeFavoriteStatusAction } from '../../store/api-actions';

// Мокаем useNavigate

// Мокаем useAppDispatch и useAppSelector
const mockDispatch = vi.fn();
vi.mock('../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn(),
}));

import { useAppSelector } from '../../hooks';

describe('Component: FavoriteButton', () => {
  const mockId = 'offer123';
  const mockClassName = 'favorite-btn';
  const mockActiveClassName = 'favorite-btn--active';
  const mockSvgClassName = 'favorite-icon';

  beforeEach(() => {
    vi.clearAllMocks();
    // По умолчанию пользователь не авторизован
    (useAppSelector as jest.Mock).mockReturnValue(AuthorizationStatus.NoAuth);
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
    (useAppSelector as jest.Mock).mockReturnValue(AuthorizationStatus.Auth);
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
    (useAppSelector as jest.Mock).mockReturnValue(AuthorizationStatus.NoAuth);
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

  it('should dispatch changeFavoriteStatusAction when user is authorized and button is clicked', async () => {
    (useAppSelector as jest.Mock).mockReturnValue(AuthorizationStatus.Auth);
    const mockUnwrap = vi.fn().mockResolvedValue(undefined);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

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

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      changeFavoriteStatusAction({ id: mockId, status: 1 }) // status = 1, т.к. isFavorite = false
    );
    expect(mockUnwrap).toHaveBeenCalled();
  });

  it('should disable button during request and re-enable after success', async () => {
    (useAppSelector as jest.Mock).mockReturnValue(AuthorizationStatus.Auth);
    let resolvePromise: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    const mockUnwrap = vi.fn().mockReturnValue(promise);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

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
        isFavorite={false}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const button = screen.getByRole('button');
    const clickPromise = userEvent.click(button);

    // Сразу после клика кнопка disabled
    expect(button).toBeDisabled();

    // Разрешаем запрос
    resolvePromise!();
    await clickPromise;

    // После успеха кнопка снова enabled
    expect(button).not.toBeDisabled();
  });

  it('should toggle favorite status (class) after successful request', async () => {
    (useAppSelector as jest.Mock).mockReturnValue(AuthorizationStatus.Auth);
    const mockUnwrap = vi.fn().mockResolvedValue(undefined);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

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
        isFavorite={false}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass(mockActiveClassName);

    await userEvent.click(button);

    // После успешного ответа класс должен измениться
    await vi.waitFor(() => {
      expect(button).toHaveClass(mockActiveClassName);
    });
  });

  it('should handle error during request and re-enable button', async () => {
    (useAppSelector as jest.Mock).mockReturnValue(AuthorizationStatus.Auth);
    const mockError = new Error('API Error');
    const mockUnwrap = vi.fn().mockRejectedValue(mockError);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

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
        isFavorite={false}
        className={mockClassName}
        activeClassName={mockActiveClassName}
        svgClassName={mockSvgClassName}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const button = screen.getByRole('button');
    // Ожидаем, что ошибка выбросится (компонент кидает throw)
    await expect(userEvent.click(button)).rejects.toThrow('Ошибка сохранения/удаления избранного');

    // Кнопка должна быть разблокирована (finally)
    expect(button).not.toBeDisabled();
    // Класс не должен измениться
    expect(button).not.toHaveClass(mockActiveClassName);
  });
});
