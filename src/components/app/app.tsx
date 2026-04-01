import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../authorizationStatus';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import PageWrapper from '../../layout/page-wrapper/page-wrapper';

const authorizationStatus: AuthorizationStatus = getAuthorizationStatus();

const App = (): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<PageWrapper />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={
            <PrivateRoute isAvailable={authorizationStatus === AuthorizationStatus.NoAuth} route={AppRoute.Root}>
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
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
