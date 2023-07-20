import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Server } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  WsException,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserSocket } from 'common/types/user-socket';
import {
  BlockChatCommand,
  DeleteChatCommand,
  DeleteMessageCommand,
  EditMessageCommand,
  SaveLastSeenCommand,
  SendMessageCommand,
  UnblockChatCommand,
} from './commands';
import { GetMessagesQuery, ValidateChatMemberQuery } from './queries';
import { UseGuards } from '@nestjs/common';
import { WsAccessTokenGuard, WsRefreshTokenGuard } from 'common/guards';
import {
  DeleteMessageDto,
  EditMessageDto,
  GetMessagesDto,
  SendMessageDto,
} from './dto';
import { NOT_FOUND } from 'common/constants/error';
import { ChatId, User } from 'common/decorators';
import { GetMessagesQueryReturn } from './queries/get-messages/get-messages.query';

@WebSocketGateway({
  namespace: '/chat/socket',
  cors: { origin: true },
  cookie: true,
})
export class ChatsGateway {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @WebSocketServer()
  wss: Server;

  @UseGuards(WsAccessTokenGuard)
  @SubscribeMessage('connect-chat')
  async handleConnectChat(
    @ConnectedSocket() client: UserSocket,
    @ChatId() chatId,
    @User({ isSocket: true }) user,
  ) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }
    await this.queryBus.execute(new ValidateChatMemberQuery(user, chatId));

    client.join(chatId);

    client.emit('connect-chat', chatId);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('disconnect-chat')
  async handleDisconnectChat(
    @ConnectedSocket() client: UserSocket,
    @ChatId() chatId,
    @User({ isSocket: true }) user,
  ) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    await this.commandBus.execute(new SaveLastSeenCommand(user, chatId));

    client.leave(chatId);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('send-message')
  async sendMessage(
    @ChatId() chatId,
    @User({ isSocket: true }) user,
    @MessageBody() dto: SendMessageDto,
  ) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new SendMessageCommand(user, chatId, dto),
    );

    this.wss.to(chatId).emit('send-message', message);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('get-messages')
  async getMessages(
    @ChatId() chatId,
    @User({ isSocket: true }) user,
    @MessageBody() dto: GetMessagesDto,
  ) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }
    const data: GetMessagesQueryReturn = await this.queryBus.execute(
      new GetMessagesQuery(user, chatId, dto),
    );

    this.wss.to(chatId).emit('get-messages', data);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('delete-message')
  async deleteMessage(
    @ChatId() chatId,
    @User({ isSocket: true }) user,
    @MessageBody() dto: DeleteMessageDto,
  ) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new DeleteMessageCommand(user, chatId, dto),
    );

    this.wss.to(chatId).emit('delete-message', message);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('edit-message')
  async editMessage(
    @ChatId() chatId,
    @User({ isSocket: true }) user,
    @MessageBody() dto: EditMessageDto,
  ) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const message = await this.commandBus.execute(
      new EditMessageCommand(user, chatId, dto),
    );

    this.wss.to(chatId).emit('edit-message', message);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('block-chat')
  async blockChat(@ChatId() chatId, @User({ isSocket: true }) user) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const chat = await this.commandBus.execute(
      new BlockChatCommand(user, chatId),
    );

    this.wss.to(chatId).emit('block-chat', chat);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('unblock-chat')
  async unblockChat(@ChatId() chatId, @User({ isSocket: true }) user) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const chat = await this.commandBus.execute(
      new UnblockChatCommand(user, chatId),
    );

    this.wss.to(chatId).emit('unblock-chat', chat);
  }

  @UseGuards(WsRefreshTokenGuard)
  @SubscribeMessage('delete-chat')
  async deleteChat(@ChatId() chatId, @User({ isSocket: true }) user) {
    if (!chatId) {
      throw new WsException(NOT_FOUND);
    }

    const chat = await this.commandBus.execute(
      new DeleteChatCommand(user, chatId),
    );

    this.wss.to(chatId).emit('delete-chat', chat);
  }
}
