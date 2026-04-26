import { CityName, NameSpace, RequestStatus } from '../../const';
import { makeFakeOffer } from '../../utils';
import { selectCity, selectOffers, selectOffersStatus } from './selectors';

describe('Offer selectors', () => {
  const mockOffer = makeFakeOffer();
  const state = {
    [NameSpace.Offers]: {
      offers: [mockOffer],
      city: CityName[0],
      status: RequestStatus.Idle,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = selectOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return city from state', () => {
    const { city } = state[NameSpace.Offers];
    const result = selectCity(state);
    expect(result).toEqual(city);
  });

  it('should return offer data loading status from state', () => {
    const { status } = state[NameSpace.Offers];
    const result = selectOffersStatus(state);
    expect(result).toEqual(status);
  });
});
