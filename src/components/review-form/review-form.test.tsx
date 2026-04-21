import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import ReviewForm from './review-form';
import { makeFakeStore } from '../../utils/mocks';
import { ReviewLength } from '../../const';
import { sendReviewAction } from '../../store/api-actions';
import { vi } from 'vitest';

vi.mock('../../store/api-actions', () => ({
  sendReviewAction: vi.fn(),
}));

// Мокаем useAppDispatch
const mockDispatch = vi.fn();
vi.mock('../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('Component: ReviewForm', () => {
  const mockOfferId = 'offer123';
  const validReviewText = 'This is a valid review text that is long enough.';
  const shortReviewText = 'Short';
  const longReviewText = 'a'.repeat(ReviewLength.Max + 1);

  beforeEach(() => {
    vi.clearAllMocks();
    // По умолчанию sendReviewAction возвращает thunk, который мы мокаем
    (sendReviewAction as unknown as jest.Mock).mockReturnValue({ type: 'sendReviewAction', payload: {} });
  });

  it('should render form correctly', () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    // Проверяем наличие полей
    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument(); // textarea
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();

    // Проверяем наличие радиокнопок
    expect(screen.getByLabelText(/perfect/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/good/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/not bad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/badly/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terribly/i)).toBeInTheDocument();

    // Кнопка отправки изначально disabled (нет рейтинга и отзыва)
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button only when rating is selected and review length is between Min and Max', async () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    const textarea = screen.getByRole('textbox');
    const ratingInput = screen.getByLabelText(/perfect/i); // рейтинг 5

    // Изначально disabled
    expect(submitButton).toBeDisabled();

    // Вводим валидный текст, но рейтинг не выбран -> кнопка disabled
    await userEvent.type(textarea, validReviewText);
    expect(submitButton).toBeDisabled();

    // Выбираем рейтинг (текст уже есть) -> кнопка должна стать enabled
    await userEvent.click(ratingInput);
    expect(submitButton).toBeEnabled();

    // Делаем текст слишком коротким -> кнопка disabled
    await userEvent.clear(textarea);
    await userEvent.type(textarea, shortReviewText);
    expect(submitButton).toBeDisabled();

    // Делаем текст слишком длинным -> кнопка disabled
    await userEvent.clear(textarea);
    await userEvent.type(textarea, longReviewText);
    expect(submitButton).toBeDisabled();

    // Возвращаем валидный текст -> кнопка enabled
    await userEvent.clear(textarea);
    await userEvent.type(textarea, validReviewText);
    expect(submitButton).toBeEnabled();
  });

  it('should update form data on user input', async () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const textarea = screen.getByRole('textbox');
    const perfectRating = screen.getByLabelText(/perfect/i);

    await userEvent.type(textarea, validReviewText);
    await userEvent.click(perfectRating);

    expect(textarea).toHaveValue(validReviewText);
    expect(perfectRating).toBeChecked();
  });

  it('should disable form during submission and re-enable after success', async () => {
    let resolvePromise: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    const mockUnwrap = vi.fn().mockReturnValue(promise);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const textarea = screen.getByRole('textbox');
    const ratingInput = screen.getByLabelText(/perfect/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(textarea, validReviewText);
    await userEvent.click(ratingInput);

    const submitPromise = userEvent.click(submitButton);

    // Сразу после клика кнопка должна быть disabled
    expect(submitButton).toBeDisabled();
    // Также форма не должна реагировать на изменения (isDisabled = true, но setFormData не блокируется? В компоненте isDisabled используется только для кнопки и блокировки повторной отправки, но поля не disabled, только кнопка. Поэтому поля активны, но кнопка disabled)
    // Проверим, что textarea не disabled (она не имеет disabled атрибута)
    expect(textarea).not.toBeDisabled();

    // Разрешаем промис
    resolvePromise!();
    await submitPromise;

    // После завершения кнопка должна стать enabled (но только если форма снова валидна)
    // После успешной отправки форма сбрасывается (rating:0, review:''), значит кнопка снова disabled
    expect(submitButton).toBeDisabled();
    // Проверяем, что поля сбросились
    expect(textarea).toHaveValue('');
    expect(ratingInput).not.toBeChecked();
  });

  it('should reset form after successful submission', async () => {
    const mockUnwrap = vi.fn().mockResolvedValue(undefined);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const textarea = screen.getByRole('textbox');
    const ratingInput = screen.getByLabelText(/perfect/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(textarea, validReviewText);
    await userEvent.click(ratingInput);
    await userEvent.click(submitButton);

    // После успешной отправки форма должна быть очищена
    expect(textarea).toHaveValue('');
    expect(ratingInput).not.toBeChecked();
    // Кнопка должна стать disabled
    expect(submitButton).toBeDisabled();
  });

  it('should throw error on submission failure and re-enable button', async () => {
    const mockError = new Error('API error');
    const mockUnwrap = vi.fn().mockRejectedValue(mockError);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const textarea = screen.getByRole('textbox');
    const ratingInput = screen.getByLabelText(/perfect/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(textarea, validReviewText);
    await userEvent.click(ratingInput);

    // Ожидаем, что ошибка выбросится
    await expect(userEvent.click(submitButton)).rejects.toThrow('Ошибка отправки отзыва');

    // После ошибки кнопка должна быть разблокирована (isDisabled сбрасывается в isButtonDisabled)
    // isButtonDisabled после ошибки вычисляется заново: рейтинг и текст остались валидными, значит кнопка enabled
    expect(submitButton).toBeEnabled();

    // Форма не должна сброситься
    expect(textarea).toHaveValue(validReviewText);
    expect(ratingInput).toBeChecked();
  });
});
