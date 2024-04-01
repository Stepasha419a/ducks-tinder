import { Fragment, type FC, type ReactElement } from 'react';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from '@shared/lib/hooks';
import { getMessagesThunk, selectMessages } from '@entities/chat/model';
import { useMessagesProps, useMessagesScroll } from '@entities/chat/lib';
import { getIsNextDayMessage } from '@entities/chat/lib';
import { Message, MessageSelect, Timestamp } from './components';
import { MessagesLazy } from './MessageList.lazy';
import classNames from 'classnames';
import styles from './MessageList.module.scss';
import { InfinityScroll } from '@/shared/ui';

interface MessagesProps {
  select: ReactElement;
  repliedMessage: MessageInterface | null;
  isMessageEditing: boolean;
  selectedMessage: MessageInterface | null;
  handleSelectMessage: (message: MessageInterface) => void;
}

export const MessageList: FC<MessagesProps> = ({
  select,
  repliedMessage,
  isMessageEditing,
  selectedMessage,
  handleSelectMessage,
}) => {
  const dispatch = useAppDispatch();

  const { isMessagesLoading, isMessagesEnded, messages } =
    useAppSelector(selectMessages);

  const {
    getSelectProps,
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
  } = useMessagesProps(selectedMessage);

  const { messagesRef, messagesBottomRef } = useMessagesScroll();

  const delayedGetMessages = useDebouncedCallback(() => {
    dispatch(getMessagesThunk());
  });

  const cn = classNames(
    styles.messages,
    repliedMessage && styles.replying,
    isMessageEditing && styles.messageEditing
  );

  return (
    <div className={cn} ref={messagesRef}>
      {!isMessagesEnded && <MessagesLazy count={4} />}
      <InfinityScroll
        handleLoadMore={delayedGetMessages}
        isLoading={isMessagesLoading}
        isMore={!isMessagesEnded}
        listRef={messagesRef}
        isReversed
      >
        {messages.map((message: MessageInterface, i) => {
          const isSelectOpen = selectedMessage?.id === message.id;
          const isNextDayMessage =
            messages[i + 1] && getIsNextDayMessage(message, messages[i + 1]);

          return (
            <Fragment key={message.id}>
              <Message handleSelectMessage={() => handleSelectMessage(message)}>
                <Message.Avatar
                  userId={message.userId}
                  avatar={message.avatar}
                />
                <Message.Body {...getBodyProps(message)}>
                  <Message.Username {...getUsernameProps(message)} />
                  <Message.Content>
                    <Message.Reply {...getReplyProps(message)} />
                    <Message.Text {...getTextProps(message)} />
                  </Message.Content>
                </Message.Body>
                <MessageSelect
                  getSelectProps={() => getSelectProps(message)}
                  handleSelectMessage={() => handleSelectMessage(message)}
                  isSelectOpen={isSelectOpen}
                  isMessageEditing={isMessageEditing}
                  select={select}
                />
              </Message>
              {isNextDayMessage && (
                <Timestamp createdAt={messages[i + 1].createdAt} />
              )}
            </Fragment>
          );
        })}
      </InfinityScroll>
      <div ref={messagesBottomRef}></div>
    </div>
  );
};
