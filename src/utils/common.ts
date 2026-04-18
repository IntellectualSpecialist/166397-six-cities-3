import { AuthorizationStatus } from '../const';
import { CityNameType, Offer } from '../types/offer-type';

const getRaitingPercentage = (raiting: number): string => `${Math.round(raiting) / 5 * 100}%`;

const capitalizeValue = (value: string): string => value[0].toUpperCase() + value.slice(1, value.length);

const isEscKey = (evt: KeyboardEvent) => evt.key === 'Escape' || evt.key === 'Esc';

const isAuth = (authStatus: AuthorizationStatus): boolean => authStatus === AuthorizationStatus.Auth;

const filterOffersByCity = (offers: Offer[], currentCityName: CityNameType): Offer[] => offers.filter((offer) => offer.city.name === currentCityName);

export {getRaitingPercentage, capitalizeValue, isEscKey, isAuth, filterOffersByCity};
