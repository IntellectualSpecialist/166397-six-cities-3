import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../services/api';
import { AppThunkDispatch, extractActionsTypes, makeFakeExtraOffer, makeFakeOffer, makeFakeReview, makeFakeUser } from '../utils/mocks';
import { State } from '../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../const';
import { changeFavoriteStatusAction, checkAuthAction, fetchFavoritesAction, fetchNearbyAction, fetchOfferAction, fetchOffersAction, fetchReviewsAction, loginAction, logoutAction, sendReviewAction } from './api-actions';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(
      {
        OFFERS: {
          offers: [],
        },
        OFFER: {
          offer: null,
          nearby: []
        },
        REVIEWS: {
          reviews: []
        },
        FAVORITE: {
          favorites: []
        },
        USER: {
          user: null,
          authorizationStatus: AuthorizationStatus.Unknown
        }
      });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchOffersAction.pending.type, fetchOffersAction.fulfilled.type]);
      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeExtraOffer();
      mockAxiosAdapter.onGet(`APIRoute.Offers/${mockOffer.id}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchOfferAction.pending.type, fetchOfferAction.fulfilled.type]);
      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeExtraOffer();
      mockAxiosAdapter.onGet(`APIRoute.Offers/${mockOffer.id}`).reply(400, []);

      await store.dispatch(fetchOfferAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyAction', () => {

    it('should dispatch "fetchNearbyAction.pending" and "fetchNearbyAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      const mockNearbyOffers = [mockOffer];
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}${APIRoute.Nearby}`).reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearbyAction(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchNearbyAction.pending.type, fetchNearbyAction.fulfilled.type]);
      expect(fetchNearbyActionFulfilled.payload).toEqual(mockNearbyOffers);
    });

    it('should dispatch "fetchNearbyAction.pending", "fetchNearbyAction.rejected" when server response 400', async () => {
      const mockOffer = makeFakeExtraOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}${APIRoute.Nearby}`).reply(400, []);

      await store.dispatch(fetchNearbyAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyAction.pending.type,
        fetchNearbyAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending" and "fetchReviewsAction.fulfilled" when server response 200', async () => {
      const mockReview = makeFakeReview();
      const mockReviews = [mockReview];
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockReview.id}`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(mockReview.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchReviewsAction.pending.type, fetchReviewsAction.fulfilled.type]);
      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockReview.id}`).reply(400, []);

      await store.dispatch(fetchReviewsAction(mockReview.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });

  });

  describe('sendReviewAction', () => {
    it('should dispatch "sendReviewAction.pending" and "sendReviewAction.fulfilled" when server response 200', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockReview.id}`).reply(200, mockReview);

      await store.dispatch(sendReviewAction({ id: mockReview.id, formData: { review: mockReview.comment, rating: mockReview.rating } }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof sendReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([sendReviewAction.pending.type, sendReviewAction.fulfilled.type]);
      expect(sendReviewActionFulfilled.payload).toEqual(mockReview);
    });

    it('should dispatch "sendReviewAction.pending", "sendReviewAction.rejected" when server response 400', async () => {
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockReview.id}`).reply(400, []);

      await store.dispatch(sendReviewAction({ id: mockReview.id, formData: { review: mockReview.comment, rating: mockReview.rating } }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendReviewAction.pending.type,
        sendReviewAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchFavoritesAction.pending.type, fetchFavoritesAction.fulfilled.type]);
      expect(fetchFavoritesActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch "changeFavoriteStatusAction.pending" and "changeFavoriteStatusAction.fulfilled" when server response 200', async () => {
      const mockFavoriteOffer = makeFakeOffer();
      const expectedFavoriteOffer = { ...mockFavoriteOffer, isFavorite: !mockFavoriteOffer.isFavorite };
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockFavoriteOffer.id}/${Number(!mockFavoriteOffer.isFavorite)}`).reply(200, expectedFavoriteOffer);

      await store.dispatch(changeFavoriteStatusAction({ id: mockFavoriteOffer.id, status: Number(!mockFavoriteOffer.isFavorite) }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const changeFavoriteStatusActionFulfilled = emittedActions.at(1) as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([changeFavoriteStatusAction.pending.type, changeFavoriteStatusAction.fulfilled.type]);
      expect(changeFavoriteStatusActionFulfilled.payload).toEqual(expectedFavoriteOffer);
    });

    it('should dispatch "changeFavoriteStatusAction.pending", "changeFavoriteStatusAction.rejected" when server response 400', async () => {
      const mockFavoriteOffer = makeFakeOffer();
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockFavoriteOffer.id}/${Number(!mockFavoriteOffer.isFavorite)}`).reply(400, []);

      await store.dispatch(changeFavoriteStatusAction({ id: mockFavoriteOffer.id, status: Number(!mockFavoriteOffer.isFavorite) }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.rejected.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 200', async () => {
      const fakeUser = makeFakeUser();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, fakeUser);

      await store.dispatch(checkAuthAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const checkAuthActionFulfilled = emittedActions.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([checkAuthAction.pending.type, checkAuthAction.fulfilled.type]);
      expect(checkAuthActionFulfilled.payload).toEqual(fakeUser);
    });

    it('should dispatch "checkAuthAction.pending", "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400, []);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser = makeFakeUser();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeUser);

      await store.dispatch(loginAction({ login: fakeUser.email, password: 'password' }));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const loginActionFulfilled = emittedActions.at(1) as ReturnType<typeof loginAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([loginAction.pending.type, loginAction.fulfilled.type]);
      expect(loginActionFulfilled.payload).toEqual(fakeUser);
    });

    it('should dispatch "loginAction.pending", "loginAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400, []);

      await store.dispatch(loginAction({ login: 'test@example.com', password: 'password' }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Login).reply(200);

      await store.dispatch(logoutAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([logoutAction.pending.type, logoutAction.fulfilled.type]);
    });

    it('should dispatch "logoutAction.pending", "logoutAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Login).reply(400);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type,
      ]);
    });
  });
});
