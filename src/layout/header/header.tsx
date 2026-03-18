import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../../ui/logo/logo';


type HeaderProps = {
  shouldRenderUser?: boolean;
  isUserSignIn: boolean;
}

function Header({isUserSignIn, shouldRenderUser = true}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo className="header__logo-link header__logo-link--active" imgClassName="header__logo" />
          </div>
          {shouldRenderUser &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    {isUserSignIn ? (
                      <>
                        <span className="header__user-name user__name">
                          Oliver.conner@gmail.com
                        </span>
                        <span className="header__favorite-count">3</span>
                      </>
                    ) : <span className="header__login">Sign In</span>}
                  </Link>
                </li>
                {isUserSignIn &&
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

export default Header;
