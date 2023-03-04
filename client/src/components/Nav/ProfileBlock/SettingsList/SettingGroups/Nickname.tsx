import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { useAppSelector } from '../../../../../hooks';
import {
  InnerObjectName,
  SettingInputName,
  Validation,
} from '../../../../../redux/settings/settings.interfaces';
import styles from '../SettingsList.module.scss';

interface NicknameProps {
  setInputHandler: (
    inputName: SettingInputName,
    validation?: Validation | null,
    innerObjectName?: InnerObjectName,
    formName?: string
  ) => void;
}

export const Nickname: FC<NicknameProps> = ({ setInputHandler }) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);

  const SetNicknameHandler = () => {
    setInputHandler('nickname', { min: 6, max: 16 });
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>Internet account</div>
      <div className={styles.items}>
        <div
          onClick={SetNicknameHandler}
          className={`${styles.item} ${styles.pointer}`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Nickname</div>
            <div className={styles.setting}>
              {currentUser.nickname || 'unknown'}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groupDescr}>
        Create a username, share it and start searching for couples on Tinder
        around the world.
      </div>
    </div>
  );
};
