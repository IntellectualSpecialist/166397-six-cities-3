import { NameSpace, RequestStatus } from '../../const';
import { makeFakeExtraOffer, makeFakeOffer } from '../../utils';
import { selectNearby, selectOffer, selectOfferStatus } from './selectors';

describe('Offer selectors', () => {
  const mockExtraOffer = makeFakeExtraOffer();
  const mockOffer = makeFakeOffer();
  const state = {
    [NameSpace.Offer]: {
      offer: mockExtraOffer,
      nearby: [mockOffer],
      status: RequestStatus.Idle,
    }
  };

  it('should return offer from state', () => {
    const { offer } = state[NameSpace.Offer];
    const result = selectOffer(state);
    expect(result).toEqual(offer);
  });

  it('should return nearby offers from state', () => {
    const { nearby } = state[NameSpace.Offer];
    const result = selectNearby(state);
    expect(result).toEqual(nearby);
  });

  it('should return offer data loading status from state', () => {
    const { status } = state[NameSpace.Offer];
    const result = selectOfferStatus(state);
    expect(result).toEqual(status);
  });
});
