import { useEffect, useState } from 'react';
import { setRequestedUsers } from '../../redux/users/users.slice';
import Buttons from './Buttons/Buttons';
import FullPreview from './UserPreview/FullPreview/FullPreview';
import Preview from './UserPreview/Preview/Preview';
import TinderUserLoading from './UserLoading/Loading/Loading';
import TinderUserFailed from './UserLoading/Failed/Failed';
import styles from './Tinder.module.scss';
import Instructions from './Instructions/Instructions';
import { Button } from '../ui';
import {
  getSortedUserThunk,
  updateUserThunk,
} from '../../redux/users/users.thunks';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const Tinder: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const tinderUsers = useAppSelector((state) => state.usersPage.tinderUsers);
  const currentTinderUsersIndex = useAppSelector(
    (state) => state.usersPage.currentTinderUsersIndex
  );
  const requestedUsers = useAppSelector(
    (state) => state.usersPage.requestedUsers
  );
  const isFailed = useAppSelector((state) => state.usersPage.isFailed);

  const [isFullPreview, setIsFullPreview] = useState(false);

  useEffect(() => {
    if (!requestedUsers.length) {
      dispatch(getSortedUserThunk({ user: currentUser }));
    } else if (currentTinderUsersIndex + 1 > tinderUsers.length) {
      dispatch(getSortedUserThunk({ user: currentUser, requestedUsers }));
    } // eslint-disable-next-line
  }, [currentTinderUsersIndex]);

  useEffect(() => {
    if (tinderUsers.length) {
      const ids = [];
      for (const user of tinderUsers) {
        ids.push(user._id);
      }
      dispatch(setRequestedUsers([...currentUser.checkedUsers, ...ids]));
    }
  }, [tinderUsers, currentUser.checkedUsers, dispatch]);

  const resetHandler = () => {
    dispatch(
      updateUserThunk({
        inputName: 'checkedUsers',
        changedData: [],
      })
    );
  };

  if (isFailed) {
    return (
      <div className={styles.wrapper}>
        <Button onClick={() => resetHandler()} extraClassName={styles.reset}>
          reset
        </Button>
        <TinderUserFailed />
      </div>
    );
  }

  if (currentTinderUsersIndex === tinderUsers.length) {
    return (
      <div className={styles.wrapper}>
        <Button onClick={() => resetHandler()} extraClassName={styles.reset}>
          reset
        </Button>
        <TinderUserLoading />
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Button onClick={() => resetHandler()} extraClassName={styles.reset}>
          reset
        </Button>
        <div className={styles.users}>
          {isFullPreview ? (
            <>
              <FullPreview
                currentUser={tinderUsers[currentTinderUsersIndex]}
                setIsFullPreview={setIsFullPreview}
              />
              <Buttons
                currentTinderUsersIndex={currentTinderUsersIndex}
                isMinimum
              />
            </>
          ) : (
            <>
              <Preview
                currentUser={tinderUsers[currentTinderUsersIndex]}
                setIsFullPreview={setIsFullPreview}
              />
              <Buttons currentTinderUsersIndex={currentTinderUsersIndex} />
            </>
          )}
        </div>
      </div>
      <Instructions />
    </>
  );
};
