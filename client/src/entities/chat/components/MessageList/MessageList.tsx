import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/hooks';
import { selectMessages } from '@entities/chat/model';
import { useMessagesProps, useMessagesScroll } from '@entities/chat/lib';
import { getIsNextDayMessage } from '@entities/chat/lib/helpers';
import { Message, Timestamp } from './components';
import { MessagesLazy } from './MessageList.lazy';
import classNames from 'classnames';
import styles from './MessageList.module.scss';

interface MessagesProps {
  setEditingValue: Dispatch<SetStateAction<string>>;
  select: ReactElement;
  edit: ReactElement;
}

export const MessageList: FC<MessagesProps> = ({
  select,
  edit,
  setEditingValue,
}) => {
  const {
    messagesLength,
    isMessagesInitialLoading,
    maxMessagesCount,
    messages,
    currentMessage,
    isMessageEditing,
    repliedMessage,
  } = useAppSelector(selectMessages);

  const {
    handleSelectMessage,
    getAvatarProps,
    getSelectProps,
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
  } = useMessagesProps(setEditingValue);

  const { messagesRef, topScrollRef } = useMessagesScroll();

  if (isMessagesInitialLoading) {
    return <MessagesLazy />;
  }

  const cn = classNames(styles.messages, repliedMessage && styles.replying);

  return (
    <div className={cn} ref={messagesRef}>
      <div className={styles.loadMessages} ref={topScrollRef}></div>
      {maxMessagesCount > messagesLength && <MessagesLazy count={4} />}
      {messages.map((message: MessageInterface, i) => {
        const isSelectOpen = currentMessage?.id === message.id;
        const isNextDayMessage =
          messages[i + 1] && getIsNextDayMessage(message, messages[i + 1]);

        return (
          <>
            <Message key={message.id}>
              <Message.Avatar {...getAvatarProps(message)} />
              <Message.Body {...getBodyProps(message)}>
                <Message.Username {...getUsernameProps(message)} />
                {isSelectOpen && isMessageEditing ? (
                  edit
                ) : (
                  <Message.Content>
                    <Message.Reply {...getReplyProps(message)} />
                    <Message.Text {...getTextProps(message)} />
                  </Message.Content>
                )}
              </Message.Body>
              {isSelectOpen ? (
                select
              ) : (
                <Message.Select
                  handleSelectMessage={() => handleSelectMessage(message)}
                  {...getSelectProps(message)}
                />
              )}
            </Message>
            {isNextDayMessage && (
              <Timestamp createdAt={messages[i + 1].createdAt} />
            )}
          </>
        );
      })}
    </div>
  );
};
