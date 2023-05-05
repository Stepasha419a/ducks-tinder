import type { PicturesVariants, Range, User } from '@shared/api/interfaces';

export interface ImageInterface {
  id: number;
  image: string;
  setting: PicturesVariants;
}

export interface PairSorts {
  distance: number;
  age: Range;
  photos: number;
  interests: string[];
  account: string[];
}

export type PairSortsKey = keyof PairSorts;

export interface UserInitialState {
  currentUser: User;
  currentPair: User | null;
  pairs: User[];
  pairSorts: PairSorts;
  profileSetting: {
    pictureVariant: PicturesVariants | null;
    imageURL: string | null;
    isImageCropOpen: boolean;
    isDialogUploadOpen: boolean;
  };
}
