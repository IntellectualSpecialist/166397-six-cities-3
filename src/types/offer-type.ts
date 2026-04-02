import { CityName } from '../const';

type location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityNameType = typeof CityName[number];

export type City = {
    name: CityNameType;
    location: location;
  };

export type Offer = {
  id: string;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  city: City;
  location: location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}
