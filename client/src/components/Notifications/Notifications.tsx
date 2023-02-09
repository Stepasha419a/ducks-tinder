import { deleteNotification } from '../../redux/notificationsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxStore';
import Notification from '../ui/Notification/Notification/Notification';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  const closeNotification = (id: number) => {
    dispatch(deleteNotification(id));
  };

  if (!notifications.length) {
    return null;
  }

  return (
    <div className={styles.notifications}>
      {notifications.map((item) => (
        <Notification item={item} closeNotification={closeNotification} />
      ))}
    </div>
  );
};
