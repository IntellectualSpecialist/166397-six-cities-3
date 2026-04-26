import { RequestStatus } from '../../const';
import { makeFakeExtraOffer, makeFakeOffer } from '../../utils';
import { fetchNearbyAction, fetchOfferAction } from '../api-actions';
import { offer } from './offer';

describe('Offer Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle
    };
    const expectedState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle
    };

    const result = offer.reducer(initialState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle
    };

    const result = offer.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to offer data, "status" to "Success" when fetchOfferAction.fulfilled', () => {
    const mockOffer = makeFakeExtraOffer();
    const initialState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle
    };

    const expectedState = {
      offer: mockOffer,
      nearby: [],
      status: RequestStatus.Success
    };

    const result = offer.reducer(initialState, fetchOfferAction.fulfilled(mockOffer, '', mockOffer.id));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Failed" when fetchOfferAction.rejected', () => {
    const initialState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle
    };

    const expectedState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Failed
    };

    const result = offer.reducer(initialState, fetchOfferAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Loading" when fetchOfferAction.pending', () => {
    const initialState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle
    };

    const expectedState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Loading
    };

    const result = offer.reducer(initialState, fetchOfferAction.pending);

    expect(result).toEqual(expectedState);
  });
  it('should set "nearby" to nearby data when fetchNearbyAction.fulfilled', () => {
    const mockNearby = makeFakeOffer();
    const initialState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle
    };

    const expectedState = {
      offer: null,
      nearby: [mockNearby],
      status: RequestStatus.Idle
    };

    const result = offer.reducer(initialState, fetchNearbyAction.fulfilled([mockNearby], '', mockNearby.id));

    expect(result).toEqual(expectedState);
  });
});
