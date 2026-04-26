import Review from '../../ui/review/review';
import { ReviewType } from '../../types';

type ReviewsProps = {
  reviews: ReviewType[];
}

const Reviews = ({reviews}: ReviewsProps): JSX.Element => (
  <ul className="reviews__list" data-testid="reviews-list">
    {reviews.map(({id, user, rating, comment, date}) => <Review key={id} user={user} rating={rating} comment={comment} date={date} />)}
  </ul>
);

export default Reviews;
