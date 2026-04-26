import { ElementType } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { CityNameType } from '../../types';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/offers/offers';

type TabProp = {
  name: CityNameType ;
  className?: string;
  tag?: ElementType;
}

const Tab = ({name, className, tag}: TabProp): JSX.Element => {
  const Tag = tag || 'div';

  const dispatch = useAppDispatch();

  const handleTabClick = (): void => {
    dispatch(changeCity(name));
  };

  return (
    <Tag className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${className || ''}`}
        to={AppRoute.Root}
        onClick={handleTabClick}
        data-testid="tab-link"
      >
        <span>{name}</span>
      </Link>
    </Tag>
  );
};

export default Tab;
