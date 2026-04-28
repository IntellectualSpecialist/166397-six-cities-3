import { CityNames } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectCity } from '../../store/offers/selectors';

import Tab from '../tab/tab';

const Tabs = (): JSX.Element => {
  const currentTab = useAppSelector(selectCity);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list" data-testid="tabs-list">
          {CityNames.map((name) =>
            (
              <Tab
                name={name}
                key={name}
                className={currentTab === name ? 'tabs__item--active' : ''}
                tag="li"
              />
            ))}
        </ul>
      </section>
    </div>
  );
};

export default Tabs;
