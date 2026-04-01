import { CityName } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';
import { CityNameType } from '../../types/offer-type';

import Tab from '../../ui/tab/tab';

const Tabs = (): JSX.Element => {
  const currentTab = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const handleTabClick = (name: CityNameType): void => {
    dispatch(changeCity(name));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CityName.map((name) => <Tab name={name} key={name} className={currentTab === name ? 'tabs__item--active' : ''} onTabClick={handleTabClick} tag="li" />)}
        </ul>
      </section>
    </div>
  );
};

export default Tabs;
