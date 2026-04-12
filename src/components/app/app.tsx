import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import PageWrapper from '../../layout/page-wrapper/page-wrapper';
import { useSelector } from 'react-redux';
import LoadingPage from '../../pages/loading-page/loading-page';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { useAppDispatch } from '../../hooks';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { selectIsOffersLoading } from '../../store/offers/selectors';

const App = (): JSX.Element => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const isOffersDataLoading = useSelector(selectIsOffersLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<PageWrapper />}>
            <Route index element={<MainPage />} />
            <Route path={AppRoute.Login} element={
              <PrivateRoute isAvailable={authorizationStatus !== AuthorizationStatus.Auth} route={AppRoute.Root}>
                <LoginPage />
              </PrivateRoute>
            }
            />

            <Route path={AppRoute.Offer} element={
              <OfferPage />
            }
            />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute isAvailable={authorizationStatus === AuthorizationStatus.Auth} route={AppRoute.Login}>
                <FavoritesPage />
              </PrivateRoute>
            }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
};

export default App;
