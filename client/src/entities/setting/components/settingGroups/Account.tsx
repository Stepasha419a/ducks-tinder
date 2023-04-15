import type { FC } from 'react';
import { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAppSelector } from '@hooks';
import type {
  ChangedData,
  InnerObjectName,
  SettingInputName,
} from '@shared/api/interfaces';
import type { Validation } from '@shared/interfaces';
import { RangeInput, SettingGroup } from '@shared/ui';
import styles from './SettingsGroup.module.scss';

interface AccountProps {
  setInputHandler: (
    inputName: SettingInputName,
    validation?: Validation | null,
    innerObjectName?: InnerObjectName,
    formName?: string
  ) => void;
  updateInputHandler: (
    inputName: SettingInputName,
    changedData: ChangedData,
    innerObjectName?: InnerObjectName
  ) => void;
}

export const Account: FC<AccountProps> = ({
  setInputHandler,
  updateInputHandler,
}) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const [ageSetting, setAgeSetting] = useState(currentUser.age);

  const ageSubmitHandler = (): void => {
    updateInputHandler('age', ageSetting);
  };

  const setEmailHandler = (): void => {
    setInputHandler('email', { min: 0, max: 40, email: true });
  };
  const setNameHandler = (): void => {
    setInputHandler('name', { min: 2, max: 14 });
  };
  const setDescriptionHandler = (): void => {
    setInputHandler('description', { min: 50, max: 400 });
  };
  const setSexHandler = (): void => {
    setInputHandler('sex');
  };

  return (
    <SettingGroup
      title="Account Settings"
      descr="Verified email address helps to protect your account"
    >
      <div
        onClick={setEmailHandler}
        className={`${styles.item} ${styles.pointer}`}
      >
        <div className={styles.descr}>
          <div className={styles.title}>Email</div>
          <div className={styles.setting}>
            {currentUser.email}
            <FontAwesomeIcon icon={faAngleRight} className={styles.openIcon} />
          </div>
        </div>
      </div>
      <div
        onClick={setNameHandler}
        className={`${styles.item} ${styles.pointer}`}
      >
        <div className={styles.descr}>
          <div className={styles.title}>Name</div>
          <div className={styles.setting}>
            {currentUser.name}
            <FontAwesomeIcon icon={faAngleRight} className={styles.openIcon} />
          </div>
        </div>
      </div>
      <div
        onClick={setDescriptionHandler}
        className={classNames(
          styles.item,
          styles.pointer,
          errorFields.includes('description') && styles.error
        )}
      >
        <div className={styles.descr}>
          <div className={styles.title}>Description</div>
          <div className={`${styles.setting} ${styles.textOverflow}`}>
            {currentUser.description || 'Empty description'}
            <FontAwesomeIcon
              icon={faAngleRight}
              className={`${styles.openIcon} ${styles.absolute}`}
            />
          </div>
        </div>
      </div>
      <div
        onClick={setSexHandler}
        className={`${styles.item} ${styles.pointer}`}
      >
        <div className={styles.descr}>
          <div className={styles.title}>Sex</div>
          <div className={styles.setting}>
            {currentUser.sex}
            <FontAwesomeIcon icon={faAngleRight} className={styles.openIcon} />
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.descr}>
          <div className={styles.title}>Age</div>
          <div className={styles.setting}>{ageSetting} years old</div>
        </div>
        <div className={styles.setting}>
          <div className={styles.slider}>
            <RangeInput
              value={{ value: ageSetting }}
              setValue={(value) => setAgeSetting(value.value!)}
              completeValue={ageSubmitHandler}
              min={18}
              max={100}
            />
          </div>
        </div>
      </div>
    </SettingGroup>
  );
};
