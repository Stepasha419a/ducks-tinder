import type { Dispatch, FC, SetStateAction } from 'react';
import type { Picture } from '@shared/api/interfaces';
import { useAppSelector, useMediaQuery } from '@shared/lib/hooks';
import {
  CropImage,
  DialogUpload,
  PicturesDND,
  ProfileSubmit,
} from '@features/user';
import { ProfileSettingsList } from '@features/setting';
import styles from './ProfileSettingBlock.module.scss';

interface ProfileSettingProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
}

export const ProfileSettingBlock: FC<ProfileSettingProps> = ({
  pictures,
  setPictures,
}) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const isDialogUploadOpen = useAppSelector(
    (state) => state.user.profileSetting.isDialogUploadOpen
  );
  const isImageCropOpen = useAppSelector(
    (state) => state.user.profileSetting.isImageCropOpen
  );

  return (
    <div className={styles.change}>
      <PicturesDND pictures={pictures} setPictures={setPictures} />
      <div className={styles.descr}>
        Add more photos to fill out your profile
        <br />
        by another 4% and get more likes.
      </div>
      <ProfileSettingsList />
      {!isMobile && <ProfileSubmit pictures={pictures} />}
      {isDialogUploadOpen && <DialogUpload />}
      {isImageCropOpen && <CropImage />}
    </div>
  );
};
