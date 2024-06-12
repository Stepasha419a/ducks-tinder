import type { FC, PropsWithChildren } from 'react';
import { Button } from '@shared/ui';
import { getProfileSettingWrapperData } from '@features/user/lib';
import styles from './SettingWrapper.module.scss';
import type { ProfileSettingNameEnum } from '@entities/user/lib/constants';

interface SettingWrapperProps {
  settingName: ProfileSettingNameEnum | null;
  handleSubmit: () => void;
}

export const SettingWrapper: FC<PropsWithChildren<SettingWrapperProps>> = ({
  settingName,
  handleSubmit,
  children,
}) => {
  const data = getProfileSettingWrapperData(settingName);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.head}>
        <div className={styles.title}>{data.title}</div>
        <Button type="submit" className={styles.submit}>
          Submit
        </Button>
      </div>
      <div className={styles.setting}>
        <div className={styles.descr}>{data.description}</div>
        {children}
      </div>
    </form>
  );
};
