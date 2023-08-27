import { LinkSettingThumbnail } from '@/entities/setting/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const EducationSettingThumbnail = () => {
  const education = useAppSelector((state) => state.user.currentUser.education);

  const url = `${ROUTES.profile}/edit/more-about-me`;
  const value = education ? education.name : 'Add';

  return (
    <LinkSettingThumbnail url={url} title="Education" value={value} isPointer />
  );
};
