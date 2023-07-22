import type { Socket } from 'socket.io-client';
import { instance } from '@shared/api';
import type {
  Chat,
  ChatSocketQueryData,
  ShortChat,
} from '@shared/api/interfaces';
import { chatSocket } from './chat.socket';

export const chatService = {
  async getChats() {
    return instance.get<ShortChat[]>('chats');
  },
  async getChat(chatId: string) {
    return instance.get<Chat>(`chats/${chatId}`);
  },
  connect(): Socket {
    return chatSocket.connect();
  },
  connectChat(chatData: ChatSocketQueryData, currentUserId: string): Socket {
    return chatSocket.connectChat(chatData, currentUserId);
  },
  getMessages(haveCount: number): void {
    chatSocket.getMessages(haveCount);
  },
  sendMessage(text: string, repliedId: string | null = null): void {
    chatSocket.sendMessage(text, repliedId);
  },
  deleteMessage(messageId: string): void {
    chatSocket.deleteMessage(messageId);
  },
  editMessage(messageId: string, text: string): void {
    chatSocket.editMessage(messageId, text);
  },
  blockChat(): void {
    chatSocket.blockChat();
  },
  unblockChat(): void {
    chatSocket.unblockChat();
  },
  deleteChat(): void {
    chatSocket.deleteChat();
  },
  disconnectChat(): void {
    chatSocket.disconnectChat();
  },
};
