import type { Range } from '@shared/interfaces';

export interface ImageInterface {
  id: number;
  image: string;
  setting: PicturesVariants;
}

export interface PartnerSettings {
  place: string;
  distance: number;
  usersOnlyInDistance: boolean;
  preferSex: 'male' | 'female';
  age: Range;
}

export interface PicturesInterface {
  avatar: string;
  gallery: string[];
}

// don't know why it's wrong
// eslint-disable-next-line no-shadow
export enum PicturesEnum {
  avatar = 'avatar',
  gallery = 'gallery',
}

export type PicturesVariants = keyof PicturesInterface;

export interface User {
  _id: string;
  email: string;
  name: string;
  description: string;
  nickname: string;
  age: number;
  sex: 'male' | 'female';
  isActivated: boolean;
  interests: string[];
  partnerSettings: PartnerSettings;
  pictures: PicturesInterface;
  chats: string[];
  pairs: string[];
  checkedUsers: string[];
}

export interface UserUnrequired {
  email?: string;
  name?: string;
  description?: string;
  nickname?: string;
  age?: number;
  sex?: 'male' | 'female';
  isActivated?: boolean;
  interests?: string[];
  pictures?: {
    avatar?: string;
    gallery?: string[];
  };
  partnerSettings?: {
    place?: string;
    distance?: number;
    usersOnlyInDistance?: boolean;
    preferSex?: 'male' | 'female';
    age?: {
      from?: number;
      to?: number;
    };
  };
  chats?: string[];
  checkedUsers?: string[];
}

export interface PairSorts {
  distance: number;
  age: Range;
  photos: number;
  interests: string[];
  account: string[];
}

export type PairSortsKey = keyof PairSorts;

export interface QuerySorts {
  distance: number;
  onlyNear: boolean;
  age: number;
  preferAge: Range;
  sex: 'male' | 'female';
  preferSex: 'male' | 'female';
  userIds?: string[];
}

export interface InterestItem {
  name: string;
  id: string;
}

export type ChangedData = string | number | boolean | string[] | Range;

export type InnerObjectName = 'partnerSettings' | null;
export type SettingInputName = keyof User | keyof PartnerSettings | null;
