import { LinkSettingThumbnail } from '@/entities/setting/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const SocialNetworksActivitySettingThumbnail = () => {
  const socialNetworksActivity = useAppSelector(
    (state) => state.user.currentUser.socialNetworksActivity
  );

  const url = `${ROUTES.profile}/edit/lifestyle`;
  const value = socialNetworksActivity ? socialNetworksActivity.name : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Social media"
      value={value}
      isPointer
    />
  );
};
