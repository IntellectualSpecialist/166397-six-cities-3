import { getRatingPercentage } from '../../utils';

type ReviewProps = {
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
}

const Review = ({user, rating, comment, date}: ReviewProps): JSX.Element => {
  const {avatarUrl, name} = user;
  const starsWidth = getRatingPercentage(rating);
  const formattedDate = new Date(date);
  const finallyFormatedDate = formattedDate.toLocaleString('en-US', {month: 'long', year: 'numeric'});

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: starsWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>
          {finallyFormatedDate}
        </time>
      </div>
    </li>
  );
};

export default Review;
