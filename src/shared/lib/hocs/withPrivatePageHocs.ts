import { WithCheckedFields } from '@features/user/lib';
import { WithAuthRedirect } from '@features/user/lib';
import { WithChatConnection } from '@features/chat/lib';
import { compose } from '@shared/helpers';
import { WithNewMessagesCount } from '@entities/chat/lib';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount
);
