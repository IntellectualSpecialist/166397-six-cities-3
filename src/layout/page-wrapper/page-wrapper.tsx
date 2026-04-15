import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoute } from '../../const';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { useAppSelector } from '../../hooks';
import { selectOffers } from '../../store/offers/selectors';
import { selectFavorites } from '../../store/favorite/selectors';
import { isAuth } from '../../utils/common';

const PageWrapper = (): JSX.Element => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const offers = useAppSelector(selectOffers);
  const favorites = useAppSelector(selectFavorites);

  const {pathname} = useLocation();
  let pageClassName = '';
  let mainClassName = '';
  let hasFooter = false;
  let shouldRenderUser = true;

  switch (pathname as AppRoute) {
    case AppRoute.Root:
      pageClassName = 'page--gray page--main';
      mainClassName = `page__main--index ${offers?.length ? '' : 'page__main--index-empty'}`;

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

    case AppRoute.Offer:
      mainClassName = 'page__main--offer';

      break;
  }

  return (
    <div className={`page ${pageClassName}`}>
      <Header isUserSignIn={isAuth(authorizationStatus)} shouldRenderUser={shouldRenderUser} />

      <main className={`page__main ${mainClassName}`}>
        <Outlet />
      </main>

      {hasFooter && <Footer/>}
    </div>
  );
};

export default PageWrapper;
