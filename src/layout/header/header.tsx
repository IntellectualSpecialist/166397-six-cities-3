import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../../ui/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { selectUser } from '../../store/user-process/selectors';
import { selectFavorites } from '../../store/favorite/selectors';

type HeaderProps = {
  shouldRenderUser?: boolean;
  isUserSignIn: boolean;
}

const Header = ({isUserSignIn, shouldRenderUser = true}: HeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectUser)?.email;
  const favoriteCount = useAppSelector(selectFavorites).length;

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
                          {email}
                        </span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </>
                    ) : <span className="header__login">Sign In</span>}
                  </Link>
                </li>
                {isUserSignIn &&
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#" onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(logoutAction());
                  }}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
};

export default Header;
