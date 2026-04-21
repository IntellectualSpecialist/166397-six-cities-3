import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sorting from './sorting';
import { SortingOption } from '../../const';

describe('Component: Sorting', () => {
  const mockCurrentOption = SortingOption[0]; // 'Popular'
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

    // Проверяем заголовок и текущий вариант сортировки
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText(mockCurrentOption)).toBeInTheDocument();

    // Список опций изначально скрыт (класс без 'opened')
    const optionsList = screen.getByRole('list');
    expect(optionsList).not.toHaveClass('places__options--opened');
    // Опции не должны быть видны (но они есть в DOM, скрыты CSS? В тесте мы не проверяем видимость, только класс)
    // Проверим, что все опции из SortingOption присутствуют
    SortingOption.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('should open options list when sorting type is clicked', async () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const sortingType = screen.getByText(mockCurrentOption);
    const optionsList = screen.getByRole('list');

    // Изначально список закрыт
    expect(optionsList).not.toHaveClass('places__options--opened');

    // Кликаем по типу сортировки
    await userEvent.click(sortingType);

    // Список должен открыться
    expect(optionsList).toHaveClass('places__options--opened');
  });

  it('should close options list when an option is selected', async () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const sortingType = screen.getByText(mockCurrentOption);
    await userEvent.click(sortingType); // открываем

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    // Выбираем другой вариант (например, второй)
    const secondOption = SortingOption[1];
    const optionElement = screen.getByText(secondOption);
    await userEvent.click(optionElement);

    // Список должен закрыться
    expect(optionsList).not.toHaveClass('places__options--opened');
    // Должен быть вызван колбэк с выбранным вариантом
    expect(mockOnSortingOptionClick).toHaveBeenCalledWith(secondOption);
  });

  it('should call onSortingOptionClick with selected option', async () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const sortingType = screen.getByText(mockCurrentOption);
    await userEvent.click(sortingType); // открываем

    const targetOption = SortingOption[2]; // например, 'Price: low to high'
    const optionElement = screen.getByText(targetOption);
    await userEvent.click(optionElement);

    expect(mockOnSortingOptionClick).toHaveBeenCalledTimes(1);
    expect(mockOnSortingOptionClick).toHaveBeenCalledWith(targetOption);
  });

  it('should highlight active option with "places__option--active" class', () => {
    const activeOption = SortingOption[1]; // не первый
    render(
      <Sorting
        currentOption={activeOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    // Активный элемент должен иметь класс active
    const activeElement = screen.getByText(activeOption);
    expect(activeElement).toHaveClass('places__option--active');

    // Другие опции не должны иметь активный класс
    SortingOption.forEach((option) => {
      if (option !== activeOption) {
        expect(screen.getByText(option)).not.toHaveClass('places__option--active');
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

    const sortingType = screen.getByText(mockCurrentOption);
    await userEvent.click(sortingType); // открываем

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    // Эмулируем нажатие Escape
    await userEvent.keyboard('{Escape}');

    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should not close options list when other keys are pressed', async () => {
    render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    const sortingType = screen.getByText(mockCurrentOption);
    await userEvent.click(sortingType); // открываем

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    // Нажимаем Enter, Tab, любую другую клавишу
    await userEvent.keyboard('{Enter}');
    expect(optionsList).toHaveClass('places__options--opened');

    await userEvent.keyboard('{Tab}');
    expect(optionsList).toHaveClass('places__options--opened');

    await userEvent.keyboard('a');
    expect(optionsList).toHaveClass('places__options--opened');
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(
      <Sorting
        currentOption={mockCurrentOption}
        onSortingOptionClick={mockOnSortingOptionClick}
      />
    );

    // Открываем список, чтобы добавить слушатель
    const sortingType = screen.getByText(mockCurrentOption);
    userEvent.click(sortingType); // не ждём, но слушатель добавится

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should not call onSortingOptionClick if not provided', async () => {
    render(<Sorting currentOption={mockCurrentOption} />);

    const sortingType = screen.getByText(mockCurrentOption);
    await userEvent.click(sortingType); // открываем
    const optionElement = screen.getByText(SortingOption[1]);
    await userEvent.click(optionElement);

    // Ничего не произошло, но и ошибки нет
    // Просто проверяем, что рендер без колбэка не падает
    expect(screen.getByText(mockCurrentOption)).toBeInTheDocument();
  });
});
