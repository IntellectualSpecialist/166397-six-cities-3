import { MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../../utils/common';
import { toast } from 'react-toastify';
import { selectFavorites } from '../../store/favorite/selectors';

const Icon = {
  Width: 31,
  Heigh: 33,
} as const;

type FavoriteButtonProps = {
  id: string;
  className: string;
  activeClassName: string;
  svgClassName: string;
  imgWidth?: number;
  imgHeight?: number;
  testid?: string;
  isFavorite: boolean;
}

const FavoriteButton = ({id, className, activeClassName, svgClassName, imgWidth, imgHeight, isFavorite, testid }: FavoriteButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [shouldUseStoreFavorite, setShouldUseStoreFavorite] = useState(false);
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const favorites = useAppSelector(selectFavorites);
  const favoriteFromStore = favorites.some((favorite) => favorite.id === id) && isAuth(authorizationStatus);
  const isActualFavorite = shouldUseStoreFavorite ? favoriteFromStore : (isFavorite && isAuth(authorizationStatus));

  const status = Number(!isActualFavorite);

  const handleButtonClick = async (evt: MouseEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault();

    if (!isAuth(authorizationStatus)) {
      navigate(AppRoute.Login);
      return;
    }

    try {
      setIsDisabled(true);
      await dispatch(changeFavoriteStatusAction({ id, status })).unwrap();
      setShouldUseStoreFavorite(true);
    } catch (error) {
      toast.error('Ошибка сохранения/удаления избранного');
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <button
      onClick={(evt) => {
        handleButtonClick(evt);
      }}
      className={`${className} ${isActualFavorite ? activeClassName : ''} button`}
      type="button"
      disabled={isDisabled}
      data-testid={testid}
    >
      <svg className={svgClassName} width={imgWidth || Icon.Width} height={imgHeight || Icon.Heigh}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default FavoriteButton;
