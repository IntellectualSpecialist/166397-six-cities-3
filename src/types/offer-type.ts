import { CityName } from '../const';

type location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type Housing = 'apartment' | 'room' | 'house' | 'hotel'

export type CityNameType = typeof CityName[number];

export type City = {
    name: CityNameType;
    location: location;
  };

export type Offer = {
  id: string;
  title: string;
  type: Housing;
  price: number;
  city: City;
  location: location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}
