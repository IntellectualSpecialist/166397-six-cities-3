import { Link } from 'react-router-dom';
import { Offer } from '../../types';
import { capitalizeValue, getRatingPercentage } from '../../utils';
import { AppRoute } from '../../const';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import { OfferAndFavorite } from '../../types';

type PlaceCardProps = {
  offer: OfferAndFavorite;
  className: string;
  imgClassName: string;
  imgWidth?: number;
  imgHeight?: number;
  onActiveCardChange?: (offer?: Offer) => void;
}

const PlaceCard = ({offer, className, imgClassName, imgWidth = 260, imgHeight = 200, onActiveCardChange}: PlaceCardProps): JSX.Element => {
  const {id, isPremium, isFavorite, previewImage, price, rating, title, type} = offer;
  const starsWidth = getRatingPercentage(rating);
  const capitalizedType = capitalizeValue(type);
  const linkRoute = AppRoute.Offer.replace(':id', id);

  const handleCardMouseOver = () => {
    onActiveCardChange?.(offer);
  };

  const handleCardMouseOut = () => {
    onActiveCardChange?.();
  };

  return (
    <article className={`${className} place-card`} onMouseOver={handleCardMouseOver} onMouseOut={handleCardMouseOut}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${imgClassName} place-card__image-wrapper`}>
        <Link to={linkRoute}>
          <img className="place-card__image" src={previewImage} width={imgWidth} height={imgHeight} alt="Place image" data-testid="image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            id={id}
            className='place-card__bookmark-button'
            activeClassName='place-card__bookmark-button--active'
            svgClassName='place-card__bookmark-icon'
            imgWidth={18}
            imgHeight={19}
            isFavorite={isFavorite}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: starsWidth}} data-testid="rating-stars"></span>
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
