import { useLocation, Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
}

function Logo({ width = 81, height = 41, className, imgClassName }: LogoProps): JSX.Element {
  const { pathname } = useLocation();

  return pathname as AppRoute === AppRoute.Root ? (
    <a className={`${className}`}>
      <img
        className={imgClassName}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </a>) : (
    <Link className={`${className}`} to={AppRoute.Root}>
      <img
        className={imgClassName}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  );
}

export default Logo;
