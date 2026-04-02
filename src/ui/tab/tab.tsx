import { ElementType, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { CityNameType } from '../../types/offer-type';

type TabProp = {
  name: CityNameType ;
  className?: string;
  onTabClick?: (name: CityNameType) => void;
  tag?: ElementType;
}

const Tab = ({name, className, onTabClick, tag}: TabProp): JSX.Element => {
  const Tag = tag || 'div';

  const handleTabClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();

    if (onTabClick) {
      onTabClick(name);
    }
  };

  return (
    <Tag className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${className || ''}`}
        to={AppRoute.Root}
        onClick={onTabClick ? (evt) => handleTabClick(evt) : undefined}
      >
        <span>{name}</span>
      </Link>
    </Tag>
  );
};

export default Tab;
