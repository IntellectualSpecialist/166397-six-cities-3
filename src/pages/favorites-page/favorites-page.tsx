import { Helmet } from 'react-helmet-async';
import Header from '../../layout/header/header';
import Footer from '../../layout/footer/footer';
import Tab from '../../ui/tab/tab';
import { offers } from '../../mocks/offers';
import PlaceCard from '../../ui/place-card/place-card';

function FavoritesPage(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Избранное</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <Tab name="Amsterdam" />
                </div>
                <div className="favorites__places">
                  {offers.slice(0, 2).map(({id, isPremium, previewImage, price, isFavorite, rating, title, type}) => <PlaceCard key={id} isPremium={isPremium} previewImage={previewImage} price={price} isFavorite={isFavorite} rating={rating} title={title} type={type} className="favorites__card" imgClassName="favorites__image-wrapper" width={150} height={110} />)}
                </div>
              </li>
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <Tab name="Cologne" />
                </div>
                <div className="favorites__places">
                  {offers.slice(0, 1).map(({id, isPremium, previewImage, price, isFavorite, rating, title, type}) => <PlaceCard key={id} isPremium={isPremium} previewImage={previewImage} price={price} isFavorite={isFavorite} rating={rating} title={title} type={type} className="favorites__card" imgClassName="favorites__image-wrapper" width={150} height={110} />)}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
