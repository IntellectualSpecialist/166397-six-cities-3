import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory } from '../../utils';
import Tab from './tab';
import { CityName } from '../../const';
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
    const expectedText = CityName[0];
    const preparedComponent = withHistory(<Tab name={CityName[0]} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('tab-link')).toBeInTheDocument();
  });

  it('should dispatch changeCity action when clicked', async () => {
    const cityName = CityName[0];
    const preparedComponent = withHistory(<Tab name={cityName} />);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId('tab-link'));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(changeCity(cityName));
  });
});
