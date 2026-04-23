import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import ReviewForm from './review-form';
import { makeFakeStore } from '../../utils/mocks';
import { RequestStatus, ReviewLength } from '../../const';
import { vi } from 'vitest';
import { State } from '../../types/state-type';

vi.mock('../../store/api-actions', () => ({
  sendReviewAction: vi.fn(),
}));

const mockDispatch = vi.fn();
const mockUseAppSelector = vi.fn<[selector: (state: State) => unknown], unknown>();
vi.mock('../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: unknown) => unknown): unknown => mockUseAppSelector(selector) ,
}));

describe('Component: ReviewForm', () => {
  const mockOfferId = 'offer123';
  const validReviewText = 'This is a valid review text that is long enough. This is a valid review text that is long enough.';
  const shortReviewText = 'Short';
  const longReviewText = 'a'.repeat(ReviewLength.Max + 1);

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppSelector.mockReturnValue(RequestStatus.Idle);
  });

  it('should render form correctly', () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);

    render(withStoreComponent);

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();

    expect(screen.getByTitle(/perfect/i)).toBeInTheDocument();
    expect(screen.getByTitle(/good/i)).toBeInTheDocument();
    expect(screen.getByTitle(/not bad/i)).toBeInTheDocument();
    expect(screen.getByTitle(/badly/i)).toBeInTheDocument();
    expect(screen.getByTitle(/terribly/i)).toBeInTheDocument();

    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('should enable submit button only when rating is selected and review length is between Min and Max', async () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);

    render(withStoreComponent);

    const submitButton = screen.getByTestId('submit-button');
    const textarea = screen.getByTestId('review-textarea');
    const ratingLabel = screen.getByTestId(/perfect/i);

    expect(submitButton).toBeDisabled();

    await userEvent.type(textarea, validReviewText);
    expect(submitButton).toBeDisabled();

    await userEvent.click(ratingLabel);
    await waitFor(() => expect(submitButton).toBeEnabled());

    await userEvent.clear(textarea);
    await userEvent.type(textarea, shortReviewText);
    await waitFor(() => expect(submitButton).toBeDisabled());

    await userEvent.clear(textarea);
    await userEvent.type(textarea, validReviewText);
    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it('should enable submit button only when the review text is within the allowed length', async () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);

    render(withStoreComponent);

    const submitButton = screen.getByTestId('submit-button');
    const textarea = screen.getByTestId('review-textarea');

    expect(submitButton).toBeDisabled();

    await userEvent.type(textarea, longReviewText);
    expect(submitButton).toBeDisabled();
  });

  it('should update form data on user input', async () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const textarea = screen.getByTestId('review-textarea');
    const perfectRating = screen.getByTestId(/perfect/i);

    await userEvent.type(textarea, validReviewText);
    await userEvent.click(perfectRating);

    expect(textarea).toHaveValue(validReviewText);
    expect(perfectRating).toBeChecked();
  });

  it('should disable form during submission and re-enable after success', async () => {
    const mockUnwrap = vi.fn().mockResolvedValue(undefined);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const textarea = screen.getByTestId('review-textarea');
    const ratingInput = screen.getByTestId(/perfect/i);
    const submitButton = screen.getByTestId('submit-button');

    await userEvent.type(textarea, validReviewText);
    await userEvent.click(ratingInput);
    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);

    expect(textarea).toHaveValue('');
    expect(ratingInput).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });

  it('should reset form after successful submission', async () => {
    const mockUnwrap = vi.fn().mockResolvedValue(undefined);
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });

    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<ReviewForm id={mockOfferId} />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    const textarea = screen.getByTestId('review-textarea');
    const ratingInput = screen.getByTestId(/perfect/i);
    const submitButton = screen.getByTestId('submit-button');

    await userEvent.type(textarea, validReviewText);
    await userEvent.click(ratingInput);
    await userEvent.click(submitButton);

    expect(textarea).toHaveValue('');
    expect(ratingInput).not.toBeChecked();

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

    const textarea = screen.getByTestId('review-textarea');
    const ratingInput = screen.getByTestId(/perfect/i);
    const submitButton = screen.getByTestId('submit-button');

    await userEvent.type(textarea, validReviewText);
    await userEvent.click(ratingInput);

    expect(submitButton).toBeEnabled();

    expect(textarea).toHaveValue(validReviewText);
    expect(ratingInput).toBeChecked();
  });
});
