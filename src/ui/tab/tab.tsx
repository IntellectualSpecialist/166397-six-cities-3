type TabProp = {
  name: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf' ;
  className?: string;
  isLi?: boolean;
}

function Tab({name, className, isLi = true}: TabProp): JSX.Element {

  return isLi ? (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${className || ''}`} href="#">
        <span>{name}</span>
      </a>
    </li>
  ) : (
    <div className="locations__item">
      <a className={`locations__item-link tabs__item ${className || ''}`} href="#">
        <span>{name}</span>
      </a>
    </div>
  );
}

export default Tab;
