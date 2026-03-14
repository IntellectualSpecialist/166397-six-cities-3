import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoute } from '../../const';

type PageWrapperProps = {
  isUserSignIn: boolean;
}

function PageWrapper({isUserSignIn}: PageWrapperProps): JSX.Element {
  const {pathname} = useLocation();
  let pageClassName = '';
  let mainClassName = '';
  let isFooter = false;
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
      isFooter = true;
      break;

    case AppRoute.Offer:
      mainClassName = 'page__main--offer';

      break;
  }

  return (
    <div className={`page ${pageClassName}`}>
      <Header isUserSignIn={isUserSignIn} shouldRenderUser={shouldRenderUser} />

      <main className={`page__main ${mainClassName}`}>
        <Outlet />
      </main>

      {isFooter && <Footer/>}
    </div>
  );
}

export default PageWrapper;
