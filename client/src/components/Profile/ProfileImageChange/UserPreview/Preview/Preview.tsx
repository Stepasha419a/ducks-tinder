import {
  faCircleInfo,
  faHouse,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../../../../models/User';
import { ImageSlider } from '../../../../ImagesSlider/ImageSlider';
import { Button } from '../../../../ui';
import styles from './Preview.module.scss';

interface ProfilePreviewPropsInterface {
  currentUser: User;
  setIsFullPreviewPageSetting: (setting: boolean) => void;
}

const ProfilePreview: React.FC<ProfilePreviewPropsInterface> = ({
  currentUser,
  setIsFullPreviewPageSetting,
}) => {
  return (
    <div className={styles.preview}>
      <div className={styles.inner}>
        <ImageSlider
          images={[
            currentUser.pictures.avatar,
            ...currentUser.pictures.gallery,
          ]}
          userId={currentUser._id}
          extraClassName={styles.slider}
        />
        <div className={styles.info}>
          <div className={styles.descr}>
            <div className={styles.person}>
              {currentUser.name}{' '}
              <span className={styles.years}>{currentUser.age}</span>
            </div>
            <div className={styles.place}>
              <FontAwesomeIcon icon={faHouse} className={styles.icon} />
              <div>Lives in {currentUser.partnerSettings.place}</div>
            </div>
            <div className={styles.distance}>
              <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
              {currentUser.partnerSettings.distance}
              <span className={styles.text}>km from you</span>
            </div>
          </div>
        </div>
        <Button
          variant="mark"
          onClick={() => setIsFullPreviewPageSetting(true)}
          extraClassName={styles.openFullPreview}
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreview;
