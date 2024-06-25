import classNames from 'classnames';
import { useAnimationControls } from 'framer-motion';
import type { FC } from 'react';
import { useState } from 'react';
import { RateButtons, SwipeUser, useSwipe } from '@features/user';
import { Explore } from '@entities/user';
import { useAppSelector, useAdaptiveMediaQuery } from '@shared/lib/hooks';
import styles from './TinderUser.module.scss';
import { Failed } from './ui';

interface TinderUserProps {
  explore?: boolean;
}

export const TinderUser: FC<TinderUserProps> = ({ explore }) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const isFailed = useAppSelector((state: RootState) => state.tinder.isFailed);

  const [isFullPreview, setIsFullPreview] = useState(false);

  const controls = useAnimationControls();

  const { x, y, sliderRef, isDragRef, motionProps } = useSwipe(
    controls,
    isFullPreview,
    setIsFullPreview
  );

  const cn = classNames(
    styles.wrapper,
    isMobile && styles.mobile,
    explore && styles.explore
  );
  if (isFailed) {
    return (
      <div className={cn}>
        <div className={styles.users}>
          <Failed />
        </div>
      </div>
    );
  }

  const handleSubmitAction = () => {
    setIsFullPreview(false);
  };

  return (
    <div className={cn}>
      {explore && <Explore />}
      <div className={styles.users}>
        <SwipeUser
          isFullPreview={isFullPreview}
          setIsFullPreview={setIsFullPreview}
          x={x}
          y={y}
          sliderRef={sliderRef}
          isDragRef={isDragRef}
          motionProps={motionProps}
        >
          <RateButtons
            isFullPreview={isFullPreview}
            handleSubmitAction={handleSubmitAction}
            controls={controls}
            x={x}
            y={y}
          />
        </SwipeUser>
      </div>
    </div>
  );
};
