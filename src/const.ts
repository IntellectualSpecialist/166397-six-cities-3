export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ReviewLength = {
  Min: 50,
  Max: 300
} as const;

export const CityName = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const SortingOption = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;
