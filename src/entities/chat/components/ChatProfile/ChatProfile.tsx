import { useEffect, type FC } from 'react';
import { Avatar } from '@shared/ui';
import {
  useAppDispatch,
  useAppSelector,
  useMediaQuery,
} from '@shared/lib/hooks';
import { getChatThunk } from '../../model';
import styles from './ChatProfile.module.scss';
import { ChatProfileMobile } from './mobile/ChatProfile.mobile';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

interface ChatProfileProps {
  handleOpen: () => void;
}

export const ChatProfile: FC<ChatProfileProps> = ({ handleOpen }) => {
  const dispatch = useAppDispatch();

  const { chatId } = useParams<{ chatId: string }>();

  const chat = useAppSelector((state) => state.chat.chat);
  const isChatLoading = useAppSelector((state) => state.chat.isChatLoading);
  const isMobile = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    if (chatId) {
      dispatch(getChatThunk(chatId));
    }
  }, [chatId, dispatch]);

  if (isMobile) {
    return <ChatProfileMobile handleOpen={handleOpen} />;
  }

  if (isChatLoading || !chat) {
    return (
      <div className={styles.profile}>
        <div className={styles.user}>
          <Skeleton circle height={40} width={40} />
          <Skeleton className={styles.name} height={22} width={80} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div onClick={handleOpen} className={styles.user}>
        <Avatar size="m" fullUrl={chat.avatar} extraClassName={styles.avatar} />
        <div className={styles.name}>{chat.name}</div>
      </div>
    </div>
  );
};
