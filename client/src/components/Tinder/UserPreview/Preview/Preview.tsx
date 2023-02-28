import {
  faCircleInfo,
  faHouse,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../../../models/User';
import { ImageSlider } from '../../../ImagesSlider/ImageSlider';
import { Button } from '../../../ui';
import styles from './Preview.module.scss';

interface PreviewProps {
  currentUser: User;
  setIsFullPreview: (setting: boolean) => void;
}

const Preview: React.FC<PreviewProps> = ({ currentUser, setIsFullPreview }) => {
  return (
    <div className={styles.user}>
      <div className={styles.slider}>
        <ImageSlider
          images={[
            currentUser.pictures.avatar,
            ...currentUser.pictures.gallery,
          ]}
          userId={currentUser._id}
          extraClassName={styles.image}
          extraWrapperClassName={styles.wrapper}
          arrowsExtraClassName={styles.arrows}
        />
      </div>
      <div onClick={() => setIsFullPreview(true)} className={styles.descr}>
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
          <span className={styles.icon}>km from you</span>
        </div>
        <Button variant="mark" extraClassName={styles.openFullPreview}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </Button>
      </div>
    </div>
  );
};

export default Preview;
