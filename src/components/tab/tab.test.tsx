import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithHistory } from '../../test-utils';
import Tab from './tab';
import { CityNames } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/offers/offers';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
}));

describe('Component: Tab', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should render correctly', () => {
    const expectedText = CityNames[0];
    const preparedComponent = renderWithHistory(<Tab name={CityNames[0]} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('tab-link')).toBeInTheDocument();
  });

  it('should dispatch changeCity action when clicked', async () => {
    const cityName = CityNames[0];
    const preparedComponent = renderWithHistory(<Tab name={cityName} />);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId('tab-link'));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(changeCity(cityName));
  });
});
