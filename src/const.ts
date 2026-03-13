export const Settings = {
  PlacesCount: 312,
} as const;


export enum AppRoute {
  Root = '/',
  Login = '/logon',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
