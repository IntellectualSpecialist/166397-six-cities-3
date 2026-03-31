type FavoriteButtonProps = {
  isFavorite: boolean;
  className: string;
  activeClassName: string;
  svgClassName: string;
  imgWidth?: number;
  imgHeight?: number;
}

const FavoriteButton = ({isFavorite, className, activeClassName, svgClassName, imgWidth, imgHeight}: FavoriteButtonProps): JSX.Element => (
  <button className={`${className} ${isFavorite && activeClassName} button`} type="button">
    <svg className={svgClassName} width={imgWidth || 31} height={imgHeight || 33}>
      <use xlinkHref="#icon-bookmark" />
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>
);

export default FavoriteButton;
