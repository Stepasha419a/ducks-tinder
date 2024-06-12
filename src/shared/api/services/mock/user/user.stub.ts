import {
  AttentionSign,
  ChildrenAttitude,
  Education,
  FoodPreference,
  Interest,
  type ShortUser,
  type User,
} from '@shared/api/interfaces';
import type { PairsInfo } from '../../user/user-service.interface';

export const shortUserStub: ShortUser = {
  age: 18,
  alcoholAttitude: null,
  attentionSign: null,
  childrenAttitude: null,
  chronotype: null,
  communicationStyle: null,
  description: null,
  distance: 100,
  education: null,
  foodPreference: null,
  id: 'id',
  name: 'John',
  interests: [],
  isActivated: false,
  personalityType: null,
  pet: null,
  pictures: [],
  place: null,
  smokingAttitude: null,
  socialNetworksActivity: null,
  trainingAttitude: null,
  zodiacSign: null,
};

export const userStub: User = {
  email: 'email@gmail.com',
  age: 18,
  alcoholAttitude: null,
  attentionSign: null,
  childrenAttitude: null,
  chronotype: null,
  communicationStyle: null,
  description: null,
  distance: 100,
  education: null,
  foodPreference: null,
  id: 'id',
  name: 'John',
  interests: [],
  isActivated: false,
  nickname: null,
  personalityType: null,
  pet: null,
  pictures: [],
  place: { address: 'add', latitude: 1, longitude: 1, name: 'name' },
  preferAgeFrom: 18,
  preferAgeTo: 40,
  preferSex: 'female',
  sex: 'male',
  smokingAttitude: null,
  socialNetworksActivity: null,
  trainingAttitude: null,
  usersOnlyInDistance: false,
  zodiacSign: null,
};

export const pairsInfoStub: PairsInfo = {
  count: 3,
  picture: null,
};

export const matchingUserStubs: ShortUser[] = [
  {
    ...shortUserStub,
    id: 'jane',
    age: 21,
    name: 'Jane',
    description:
      'Looking for a strong boyfriend to spare time together walking around the ocean coast...',
    childrenAttitude: ChildrenAttitude.IDoNotWantChildren,
    attentionSign: AttentionSign.Compliments,
    education: Education.DoctorOfSciences,
    foodPreference: FoodPreference.Other,
    distance: 50,
    interests: [
      Interest.Animals,
      Interest.Books,
      Interest.Ballet,
      Interest.Camping,
    ],
  },
  {
    ...shortUserStub,
    id: 'natalie',
    age: 19,
    name: 'Natalie',
    description: "Don't match me if you don't have enough money to amuse me)",
    childrenAttitude: ChildrenAttitude.DoNotKnowYet,
    attentionSign: AttentionSign.Gifts,
    education: Education.MiddleSchool,
    foodPreference: FoodPreference.Omnivore,
    distance: 70,
    interests: [
      Interest.Blogging,
      Interest.Bowling,
      Interest.Dancing,
      Interest.Cinema,
      Interest.Food,
    ],
  },
  {
    ...shortUserStub,
    id: 'emilie',
    age: 19,
    name: 'Emilie',
    description: "Just looking for a friend, don't suggest any relations",
    childrenAttitude: ChildrenAttitude.DoNotKnowYet,
    attentionSign: AttentionSign.TimeTogether,
    education: Education.College,
    foodPreference: FoodPreference.Halal,
    distance: 21,
    interests: [
      Interest.Bicycle,
      Interest.Billiard,
      Interest.Yoga,
      Interest.Tennis,
      Interest.TableGames,
      Interest.Books,
    ],
  },
];
