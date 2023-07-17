import type { Message, ShortChat } from '@shared/api/interfaces';

export interface ChatInitialState {
  chats: ShortChat[];
  isConnected: boolean;
  isLoading: boolean;
  isNotFound: boolean;
  isMessagesInitialLoading: boolean;
  isMessagesLoading: boolean;
  maxMessagesCount: number;
  isMessagesEnded: boolean;
  currentChatId: string;
  repliedMessage: Message | null;
  isChatUserPopup: boolean;
}

export interface GetMessagesResponse {
  chatId: string;
  messages: Message[];
}
