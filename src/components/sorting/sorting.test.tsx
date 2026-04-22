import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sorting from './sorting';
import { SortingOption } from '../../const';

describe('Component: Sorting', () => {
  const mockCurrentOption = SortingOption[0];
  const mockOnSortingOptionClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with current option', () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );
    const optionsList = screen.getByRole('list');

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId(mockCurrentOption)).toBeInTheDocument();

    expect(optionsList).not.toHaveClass('places__options--opened');

    SortingOption.forEach((option) => {
      expect(screen.getByTestId(option)).toBeInTheDocument();
    });
  });

  it('should open options list when sorting type is clicked', async () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const sortingType = screen.getByTestId('sorting-type');
    const optionsList = screen.getByTestId('list');

    expect(optionsList).not.toHaveClass('places__options--opened');

    await userEvent.click(sortingType);

    expect(optionsList).toHaveClass('places__options--opened');
  });

  it('should close options list when an option is selected', async () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const sortingType = screen.getByTestId('sorting-type');
    await userEvent.click(sortingType);

    const optionsList = screen.getByTestId('list');
    expect(optionsList).toHaveClass('places__options--opened');

    const secondOption = SortingOption[1];
    const optionElement = screen.getByTestId(secondOption);
    await userEvent.click(optionElement);

    expect(optionsList).not.toHaveClass('places__options--opened');
    expect(mockOnSortingOptionClick).toHaveBeenCalledTimes(1);
    expect(mockOnSortingOptionClick).toHaveBeenCalledWith(secondOption);
  });

  it('should call onSortingOptionClick with selected option', async () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const sortingType = screen.getByTestId('sorting-type');
    await userEvent.click(sortingType);

    const targetOption = SortingOption[2];
    const optionElement = screen.getByTestId(targetOption);
    await userEvent.click(optionElement);

    expect(mockOnSortingOptionClick).toHaveBeenCalledTimes(1);
    expect(mockOnSortingOptionClick).toHaveBeenCalledWith(targetOption);
  });

  it('should highlight active option with "places__option--active" class', () => {
    const activeOption = SortingOption[1];
    render(
      <Sorting
        currentOption={activeOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const activeElement = screen.getByTestId(activeOption);
    expect(activeElement).toHaveClass('places__option--active');

    SortingOption.forEach((option) => {
      if (option !== activeOption) {
        expect(screen.getByTestId(option)).not.toHaveClass('places__option--active');
      }
    });
  });

  it('should close options list when Escape key is pressed', async () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const sortingType = screen.getByTestId('sorting-type');
    await userEvent.click(sortingType);

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    await userEvent.keyboard('{Escape}');

    expect(optionsList).not.toHaveClass('places__options--opened');
  });
});
