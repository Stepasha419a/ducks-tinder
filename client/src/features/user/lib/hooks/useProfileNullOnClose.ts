import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib/hooks';
import { nullProfileSetting } from '@/entities/user/model';

export function useProfileNullOnClose() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(nullProfileSetting());
    };
  }, [dispatch]);
}
