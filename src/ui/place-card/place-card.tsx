import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer-type';
import { getRaitingPercentage, capitalizeValue } from '../../utils/common';
import { AppRoute } from '../../const';
import FavoriteButton from '../favorite-button/favorite-button';

type PlaceCardProps = {
  offer: Offer;
  className: string;
  imgClassName: string;
  imgWidth?: number;
  imgHeight?: number;
  handleActiveCardChange?: (offer?: Offer) => void;
}

const PlaceCard = ({offer, className, imgClassName, imgWidth = 260, imgHeight = 200, handleActiveCardChange}: PlaceCardProps): JSX.Element => {
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = offer;
  const starsWidth = getRaitingPercentage(rating);
  const capitalizedType = capitalizeValue(type);
  const linkRoute = AppRoute.Offer.replace(':id', id);

  const handleCardMouseOver = () => {
    if (handleActiveCardChange) {
      handleActiveCardChange(offer);
    }
  };

  const handleCardMouseOut = () => {
    if (handleActiveCardChange) {
      handleActiveCardChange();
    }
  };

  return (
    <article className={`${className} place-card`} onMouseOver={handleCardMouseOver} onMouseOut={handleCardMouseOut}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${imgClassName} place-card__image-wrapper`}>
        <Link to={linkRoute}>
          <img className="place-card__image" src={previewImage} width={imgWidth} height={imgHeight} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={isFavorite} className='place-card__bookmark-button' activeClassName='place-card__bookmark-button--active' svgClassName='place-card__bookmark-icon' imgWidth={18} imgHeight={19} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: starsWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkRoute}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizedType}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
