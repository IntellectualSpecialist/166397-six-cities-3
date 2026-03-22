import Tab from '../../ui/tab/tab';

type Cities = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

const TabsNames: Cities[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const currentTab = 'Amsterdam';

const Tabs = (): JSX.Element => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {TabsNames.map((name) => <Tab name={name} key={name} className={currentTab === name ? 'tabs__item--active' : ''} tag="li" />)}
      </ul>
    </section>
  </div>
);

export default Tabs;
