import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import { useAppDispatch, useMediaQuery } from '@shared/lib/hooks';
import { nullInput } from '@entities/user/model/setting';
import { Map } from '@entities/user/components';
import { PlacesGeolocation } from '@features/user/PlacesGeolocation/PlacesGeolocation';
import styles from './PlaceSetting.module.scss';

export const PlaceSetting = () => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width: 900px)');

  const handleSubmit = () => {
    dispatch(nullInput());
  };

  const url = isMobile ? ROUTES.settings : ROUTES.profile;

  return (
    <div className={styles.setting}>
      <div className={styles.head}>
        <div className={styles.title}>Place</div>
        <Link to={url} onClick={handleSubmit} className={styles.submit}>
          Submit
        </Link>
      </div>
      <Map />
      <PlacesGeolocation />
    </div>
  );
};
