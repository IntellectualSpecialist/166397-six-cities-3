import { ExtraOffer } from '../types/extra-offer';

export const offer: ExtraOffer = {
  'id': '0',
  'title': 'Beautiful & luxurious apartment at great location',
  'description': 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  'type': 'apartment',
  'price': 120,
  'images': [
    'img/room.jpg',
    'img/apartment-01.jpg',
    'img/apartment-02.jpg',
    'img/apartment-03.jpg',
    'img/studio-01.jpg',
    'img/apartment-01.jpg'
  ],
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.37454,
      'longitude': 4.897976,
      'zoom': 13
    }
  },
  'location': {
    'latitude': 52.3909553943508,
    'longitude': 4.85309666406198,
    'zoom': 16
  },
  'goods': [
    'Wi-Fi',
    'Washing machine',
    'Towels',
    'Heating',
    'Coffee machine',
    'Baby seat',
    'Kitchen',
    'Dishwasher',
    'Cabel TV',
    'Fridge',
  ],
  'host': {
    'isPro': true,
    'name': 'Angelina',
    'avatarUrl': 'img/avatar-angelina.jpg'
  },
  'isPremium': true,
  'isFavorite': false,
  'rating': 4.8,
  'bedrooms': 3,
  'maxAdults': 4
};
