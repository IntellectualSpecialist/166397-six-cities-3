import { Offer } from '../types/offer-type';

export const offers: Offer[] = [
  {
    'id': '0',
    'title': 'Beautiful & luxurious apartment at great location',
    'type': 'apartment',
    'price': 120,
    'previewImage': 'img/apartment-01.jpg',
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
    'isFavorite': false,
    'isPremium': true,
    'rating': 4
  },
  {
    'id': '1',
    'title': 'Wood and stone place',
    'type': 'room',
    'price': 80,
    'previewImage': 'img/room.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4
  },
  {
    'id': '2',
    'title': 'Canal View Prinsengracht',
    'type': 'apartment',
    'price': 132,
    'previewImage': 'img/apartment-02.jpg',
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
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 3.6
  },
  {
    'id': '3',
    'title': 'Nice, cozy, warm big bed apartment',
    'type': 'apartment',
    'price': 180,
    'previewImage': 'img/apartment-03.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.9
  },
];
