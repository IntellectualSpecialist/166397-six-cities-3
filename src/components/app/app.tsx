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
import LoadingPage from '../../pages/loading-page/loading-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction, fetchFavoritesAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { isAuth } from '../../utils/common';

const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth(authorizationStatus)) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<PageWrapper />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={
            <PrivateRoute isAvailable={!isAuth(authorizationStatus)} route={AppRoute.Root}>
              <LoginPage />
            </PrivateRoute>
          }
          />

          <Route path={AppRoute.Offer} element={
            <OfferPage />
          }
          />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute isAvailable={isAuth(authorizationStatus)} route={AppRoute.Login}>
              <FavoritesPage />
            </PrivateRoute>
          }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
};

export default App;
