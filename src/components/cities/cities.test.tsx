import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils';
import Cities from './cities';
import { makeFakeOffer, makeFakeStore } from '../../utils';
import { CityName, RequestStatus, SortingOption } from '../../const';
import { filterOffersByCity } from '../../utils';
import { sortOffers } from '../../utils';
import { vi } from 'vitest';
import { Offer } from '../../types';
import { SortingOptionType } from '../../types';
import * as hooks from '../../hooks';
import { selectCity, selectOffers } from '../../store/offers/selectors';

vi.mock('../../utils/common', () => ({
  filterOffersByCity: vi.fn(),
}));

vi.mock('../../utils/sorting', () => ({
  sortOffers: vi.fn(),
}));

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
    vi.mocked(filterOffersByCity).mockReturnValue([makeFakeOffer()]);
    const withHistoryComponent = withHistory(<Cities />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByTestId('places')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.queryByTestId('cities-empty')).not.toBeInTheDocument();
    expect(screen.getByText(/to stay in/i)).toBeInTheDocument();
  });

  it('should render CitiesEmpty when there are no offers', () => {
    const mockCityName = 'Paris';
    vi.mocked(filterOffersByCity).mockReturnValue([]);

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

  it('should change sorting option and call sortOffers with new option', async () => {
    const mockCityName = CityName[0];
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    mockOffers[0].city.name = mockCityName;
    mockOffers[1].city.name = mockCityName;

    const useAppSelectorMock = vi.spyOn(hooks, 'useAppSelector');

    useAppSelectorMock.mockImplementation((selector) => {
      if (selector === selectCity) {
        return mockCityName;
      }
      if (selector === selectOffers) {
        return mockOffers;
      }

      return undefined;
    });

    vi.mocked(filterOffersByCity).mockReturnValue(mockOffers);
    const sortOffersMock = vi.mocked(sortOffers);
    sortOffersMock.mockImplementation((_, offers) => offers);


    const withHistoryComponent = withHistory(<Cities />);

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    render(withStoreComponent);

    sortOffersMock.mockClear();

    expect(screen.getByText('Current: Popular')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('change-sorting'));

    expect(sortOffersMock).toHaveBeenCalledTimes(1);
    expect(sortOffersMock).toHaveBeenCalledWith('Price: low to high', mockOffers);
  });
});
