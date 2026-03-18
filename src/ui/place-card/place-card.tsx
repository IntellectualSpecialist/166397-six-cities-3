import { getRaitingPercentage, capitalizeValue } from '../../utils/common';

type PlaceCardProps = {
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  rating: number;
  isFavorite: boolean;
  price: number;
  previewImage: string;
  isPremium: boolean;
  className: string;
  imgClassName: string;
  imgWidth?: number;
  imgHeight?: number;
  onMouseOver?: () => void;
}

function PlaceCard({isPremium, previewImage, price, isFavorite, rating, title, type, className, imgClassName, imgWidth: width = 260, imgHeight: height = 200, onMouseOver}: PlaceCardProps): JSX.Element {
  const starsWidth = getRaitingPercentage(rating);
  const capitalizedType = capitalizeValue(type);

  return (
    <article className={`${className} place-card`} onMouseOver={onMouseOver}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${imgClassName} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={width} height={height} alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: starsWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{capitalizedType}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
