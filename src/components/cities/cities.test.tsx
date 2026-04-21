import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import Cities from './cities';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { CityName, RequestStatus, SortingOption } from '../../const';
import { filterOffersByCity } from '../../utils/common';
import { sortOffers } from '../../utils/sorting';
import { vi } from 'vitest';
import { Offer } from '../../types/offer-type';
import { SortingOptionType } from '../../types/sorting-option-type';

// Мокаем вспомогательные функции (если нужно контролировать сортировку/фильтрацию)
vi.mock('../../utils/common', () => ({
  filterOffersByCity: vi.fn(),
  sortOffers: vi.fn(),
}));

// Мокаем дочерние компоненты, чтобы упростить тестирование
vi.mock('../places/places', () => ({
  default: ({ offers, onActiveCardChange, children }: { offers: Offer[]; onActiveCardChange: (offer: Offer) => void; children: React.ReactNode }) => (
    <div data-testid="places">
      <button onClick={() => onActiveCardChange(offers[0])} data-testid="trigger-active-offer">
        Change active offer
      </button>
      {children}
    </div>
  ),
}));

vi.mock('../sorting/sorting', () => ({
  default: ({ currentOption, onSortingOptionClick }: { currentOption: SortingOptionType; onSortingOptionClick: (option: SortingOptionType) => void }) => (
    <div data-testid="sorting">
      <button onClick={() => onSortingOptionClick(SortingOption[1])} data-testid="change-sorting">
        Change Sorting
      </button>
      <span>Current: {currentOption}</span>
    </div>
  ),
}));

vi.mock('../map/map', () => ({
  default: ({ activeOffer, offers, city }: { activeOffer: Offer | null; offers: Offer[]; city: { name: string } }) => (
    <div data-testid="map">
      <span>Active offer: {activeOffer?.id || 'none'}</span>
      <span>Offers count: {offers.length}</span>
      <span>City: {city?.name}</span>
    </div>
  ),
}));

vi.mock('../cities-empty/cities-empty', () => ({
  default: ({ city }: { city: { name: string } }) => <div data-testid="cities-empty">Empty in {city.name}</div>,
}));

describe('Component: Cities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Places and Map when there are offers', () => {
    const mockCityName = CityName[0];
    const mockOffers = [
      makeFakeOffer()
    ];

    // Настраиваем моки для фильтрации и сортировки
    (filterOffersByCity as jest.Mock).mockReturnValue(mockOffers);
    (sortOffers as jest.Mock).mockImplementation((_, offers) => offers as Offer[]); // просто возвращаем без сортировки для теста

    const fakeStore = makeFakeStore({
      OFFERS: {
        offers: mockOffers,
        city: mockCityName,
        status: RequestStatus.Success,
      },
    });

    const withHistoryComponent = withHistory(<Cities />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    // Проверяем, что компонент Places отрендерен
    expect(screen.getByTestId('places')).toBeInTheDocument();
    // Проверяем, что Map отрендерен
    expect(screen.getByTestId('map')).toBeInTheDocument();
    // Проверяем, что CitiesEmpty не отрендерен
    expect(screen.queryByTestId('cities-empty')).not.toBeInTheDocument();

    // Проверяем текст с количеством мест (из children Places)
    expect(screen.getByText(/2 places to stay in Amsterdam/)).toBeInTheDocument(); // текст из компонента, но город "Amsterdam" захардкожен в компоненте? В оригинале там "Amsterdam" – это баг или фича. В компоненте написано "to stay in Amsterdam", хотя город динамический. Проверяем как есть.
  });

  it('should render CitiesEmpty when there are no offers', () => {
    const mockCityName = 'Paris';
    (filterOffersByCity as jest.Mock).mockReturnValue([]);

    const fakeStore = makeFakeStore({
      OFFERS: {
        offers: [],
        city: mockCityName,
        status: RequestStatus.Success,
      },
    });

    const withHistoryComponent = withHistory(<Cities />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    expect(screen.getByTestId('cities-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('places')).not.toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
  });

  it('should update activeOffer when onActiveCardChange is called from Places', async () => {
    const mockCityName = CityName[0];
    const mockOffers = [
      makeFakeOffer(),
    ];

    (filterOffersByCity as jest.Mock).mockReturnValue(mockOffers);
    (sortOffers as jest.Mock).mockImplementation((_, offers) => offers as Offer[]);

    const fakeStore = makeFakeStore({
      OFFERS: {
        offers: mockOffers,
        city: mockCityName,
        status: RequestStatus.Success,
      },
    });

    const withHistoryComponent = withHistory(<Cities />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    // Изначально активного оффера нет (в мапе "none")
    expect(screen.getByText('Active offer: none')).toBeInTheDocument();

    // Триггерим изменение активного оффера через кнопку в мокнутом Places
    await userEvent.click(screen.getByTestId('trigger-active-offer'));

    // После клика должен установиться активный оффер (первый из списка)
    expect(screen.getByText('Active offer: offer1')).toBeInTheDocument();
  });

  it('should change sorting option and call sortOffers with new option', async () => {
    const mockCityName = CityName[0];
    const mockOffers = [
      makeFakeOffer()
    ];

    (filterOffersByCity as jest.Mock).mockReturnValue(mockOffers);
    const sortOffersMock = vi.mocked(sortOffers);
    sortOffersMock.mockImplementation((option, offers) => {
      if (option === 'Price: low to high') {
        return [...offers].sort((a, b) => a.price - b.price);
      }
      return offers;
    });

    const fakeStore = makeFakeStore({
      OFFERS: {
        offers: mockOffers,
        city: mockCityName,
        status: RequestStatus.Success,
      },
    });

    const withHistoryComponent = withHistory(<Cities />);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);

    // Проверяем начальный вариант сортировки (по умолчанию SortingOption[0] = 'Popular')
    expect(screen.getByText('Current: Popular')).toBeInTheDocument();

    // Кликаем на кнопку смены сортировки (меняем на SortingOption[1] = 'Price: low to high')
    await userEvent.click(screen.getByTestId('change-sorting'));

    // Проверяем, что sortOffers был вызван с новым вариантом
    expect(sortOffersMock).toHaveBeenCalledWith('Price: low to high', mockOffers);
    // В реальном компоненте после смены сортировки Places получит пересортированный список,
    // но так как мы мокаем Places, можем проверить, что он рендерится.
    expect(screen.getByTestId('places')).toBeInTheDocument();
  });
});
