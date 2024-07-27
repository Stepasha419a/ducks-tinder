import {
  faHeart,
  faMagnifyingGlassMinus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Dispatch, FC, SetStateAction } from 'react';
import { getUserPairsThunk } from '@entities/user';
import type { ShortUser } from '@shared/api';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from '@shared/lib';
import { InfinityScroll } from '@shared/ui';
import { Pair } from './components';
import { PairsListLazy } from './PairsList.lazy';
import styles from './PairsList.module.scss';

interface PairsListProps {
  setCurrentPair: Dispatch<SetStateAction<ShortUser | null>>;
}

export const PairsList: FC<PairsListProps> = ({ setCurrentPair }) => {
  const dispatch = useAppDispatch();

  const pairs = useAppSelector((state) => state.pair.pairs);
  const pairsInfoCount = useAppSelector((state) => state.pair.pairsInfo?.count);
  const isPairsInfoLoading = useAppSelector(
    (state) => state.pair.isPairsInfoLoading
  );
  const isPairsLoading = useAppSelector((state) => state.pair.isPairsLoading);
  const isPairsEnded = useAppSelector((state) => state.pair.isPairsEnded);

  const delayedGetUserPairs = useDebouncedCallback(() => {
    dispatch(getUserPairsThunk({ isInitial: false }));
  });

  if (!pairsInfoCount && !isPairsInfoLoading) {
    return (
      <div className={styles.noPairs}>
        <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        <div>You don't have likes. Like someone to have a like too</div>
      </div>
    );
  }

  if (!pairs.length && isPairsEnded) {
    return (
      <div className={styles.noPairs}>
        <FontAwesomeIcon
          icon={faMagnifyingGlassMinus}
          className={styles.icon}
        />
        <div>There is no any suitable pair. Try to change settings</div>
      </div>
    );
  }

  return (
    <InfinityScroll
      handleLoadMore={delayedGetUserPairs}
      isLoading={isPairsLoading}
      isMore={true}
      loader={<PairsListLazy />}
      className={styles.pairs}
      loaderClassName={styles.loader}
    >
      {pairs.map((user: ShortUser) => {
        return (
          <Pair
            key={user.id}
            user={user}
            setCurrentPair={() => setCurrentPair(user)}
          />
        );
      })}
    </InfinityScroll>
  );
};
