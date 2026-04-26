import { matchPath, Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoute } from '../../const';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { useAppSelector } from '../../hooks';
import { selectCity, selectOffers } from '../../store/offers/selectors';
import { selectFavorites } from '../../store/favorite/selectors';
import { filterOffersByCity, isAuth } from '../../utils';
import { useMemo } from 'react';

const PageWrapper = (): JSX.Element => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const offers = useAppSelector(selectOffers);
  const favorites = useAppSelector(selectFavorites);
  const currentCityName = useAppSelector(selectCity);

  const currentOffers = useMemo(() => filterOffersByCity(offers, currentCityName), [offers, currentCityName]);

  const {pathname} = useLocation();
  const isOfferPage = Boolean(matchPath(AppRoute.Offer, pathname));
  let pageClassName = '';
  let mainClassName = '';
  let hasFooter = false;
  let shouldRenderUser = true;

  if (isOfferPage) {
    mainClassName = 'page__main--offer';
  } else {
    switch (pathname as AppRoute) {
      case AppRoute.Root:
        pageClassName = 'page--gray page--main';
        mainClassName = `page__main--index ${currentOffers?.length ? '' : 'page__main--index-empty'}`;

        break;

      case AppRoute.Login:
        pageClassName = 'page--gray page--login';
        mainClassName = 'page__main--login';
        shouldRenderUser = false;

        break;

      case AppRoute.Favorites:
        mainClassName = `page__main--favorites ${favorites?.length ? '' : 'page__main--favorites-empty'}`;
        pageClassName = `${favorites?.length ? '' : 'page--favorites-empty'}`;
        hasFooter = true;
        break;
    }
  }

  return (
    <div className={`page ${pageClassName}`}>
      <Header isUserSignIn={isAuth(authorizationStatus)} shouldRenderUser={shouldRenderUser} />

      <main className={`page__main ${mainClassName}`} data-testid="main">
        <Outlet />
      </main>

      {hasFooter && <Footer/>}
    </div>
  );
};

export default PageWrapper;
