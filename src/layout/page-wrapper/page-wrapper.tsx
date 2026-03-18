import { Outlet, useLocation } from 'react-router-dom';
import { getAuthorizationStatus } from '../../authorizationStatus';
import { AuthorizationStatus } from '../../const';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoute } from '../../const';

const authorizationStatus: AuthorizationStatus = getAuthorizationStatus();

function PageWrapper(): JSX.Element {
  const {pathname} = useLocation();
  let pageClassName = '';
  let mainClassName = '';
  let hasFooter = false;
  let shouldRenderUser = true;

  switch (pathname as AppRoute) {
    case AppRoute.Root:
      pageClassName = 'page--gray page--main';
      mainClassName = 'page__main--index';

      break;

    case AppRoute.Login:
      pageClassName = 'page--gray page--login';
      mainClassName = 'page__main--login';
      shouldRenderUser = false;

      break;

    case AppRoute.Favorites:
      mainClassName = 'page__main--favorites';
      hasFooter = true;
      break;

    case AppRoute.Offer:
      mainClassName = 'page__main--offer';

      break;
  }

  return (
    <div className={`page ${pageClassName}`}>
      <Header isUserSignIn={authorizationStatus === AuthorizationStatus.Auth} shouldRenderUser={shouldRenderUser} />

      <main className={`page__main ${mainClassName}`}>
        <Outlet />
      </main>

      {hasFooter && <Footer/>}
    </div>
  );
}

export default PageWrapper;
