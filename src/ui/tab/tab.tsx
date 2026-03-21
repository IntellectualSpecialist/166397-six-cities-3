import { ElementType } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type TabProp = {
  name: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf' ;
  className?: string;
  tag?: ElementType;
}

function Tab({name, className, tag}: TabProp): JSX.Element {

  const Tag = tag || 'div';

  return (
    <Tag className="locations__item">
      <Link className={`locations__item-link tabs__item ${className || ''}`} to={AppRoute.Root}>
        <span>{name}</span>
      </Link>
    </Tag>
  );
}

export default Tab;
