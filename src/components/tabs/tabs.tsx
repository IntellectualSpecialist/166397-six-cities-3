import { useCallback } from 'react';
import { CityName } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/offers/offers';
import { selectCity } from '../../store/offers/selectors';
import { CityNameType } from '../../types/offer-type';

import Tab from '../../ui/tab/tab';

const Tabs = (): JSX.Element => {
  const currentTab = useAppSelector(selectCity);
  const dispatch = useAppDispatch();

  const handleTabClick = useCallback((name: CityNameType): void => {
    dispatch(changeCity(name));
  }, [dispatch]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list" data-testid="tabs-list">
          {CityName.map((name) => <Tab name={name} key={name} className={currentTab === name ? 'tabs__item--active' : ''} onTabClick={handleTabClick} tag="li" />)}
        </ul>
      </section>
    </div>
  );
};

export default Tabs;
