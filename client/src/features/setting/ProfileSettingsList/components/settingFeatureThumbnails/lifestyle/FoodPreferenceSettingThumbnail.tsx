import { LinkSettingThumbnail } from '@/entities/setting/components';
import { ROUTES } from '@/shared/lib/constants';
import { useAppSelector } from '@/shared/lib/hooks';

export const FoodPreferenceSettingThumbnail = () => {
  const foodPreference = useAppSelector(
    (state) => state.user.currentUser.foodPreference
  );

  const url = `${ROUTES.profile}/edit/lifestyle`;
  const value = foodPreference ? foodPreference.name : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Food preference"
      value={value}
      isPointer
    />
  );
};
