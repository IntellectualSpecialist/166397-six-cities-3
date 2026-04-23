import { CityName, RequestStatus } from '../../const';
import { makeFakeFavoriteOffer, makeFakeOffer } from '../../utils/mocks';
import { changeFavoriteStatusAction, fetchOffersAction } from '../api-actions';
import { changeCity, offers } from './offers';

describe('Offers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      status: RequestStatus.Idle,
      city: CityName[0],
    };

    const result = offers.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      status: RequestStatus.Idle,
      city: CityName[0],
    };

    const result = offers.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city', () => {
    const initialState = {
      offers: [],
      status: RequestStatus.Idle,
      city: CityName[0],
    };
    const expectedCity = CityName[1];

    const result = offers.reducer(initialState, changeCity(CityName[1]));

    expect(result.city).toBe(expectedCity);
  });

  it('should set "offers" to array with offers, set "status" to "Success" when "fetchOffersAction.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const expectedState = {
      offers: [mockOffer],
      status: RequestStatus.Success,
      city: CityName[0],
    };

    const result = offers.reducer(undefined, fetchOffersAction.fulfilled([mockOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Loading" when "fetchOffersAction.pending"', () => {
    const expectedState = {
      offers: [],
      status: RequestStatus.Loading,
      city: CityName[0],
    };

    const result = offers.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Failed" when "fetchOffersAction.rejected"', () => {
    const expectedState = {
      offers: [],
      status: RequestStatus.Failed,
      city: CityName[0],
    };

    const result = offers.reducer(undefined, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should change isFavorite when "changeFavoriteStatusAction.fulfiled"', () => {
    const offer = makeFakeOffer({ id: 'offer-1', isFavorite: false });
    const mockOffer = { ...makeFakeFavoriteOffer(), id: 'offer-1', isFavorite: true };
    const initialState = {
      offers: [offer],
      status: RequestStatus.Failed,
      city: CityName[0],
    };

    const expectedState = {
      offers: [{ ...offer, isFavorite: true }],
      status: RequestStatus.Failed,
      city: CityName[0],
    };

    const result = offers.reducer(initialState, changeFavoriteStatusAction.fulfilled(mockOffer, '', {id: mockOffer.id, status: 0}));

    expect(result).toEqual(expectedState);
  });
});
