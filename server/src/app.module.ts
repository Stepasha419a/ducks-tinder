import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(path.resolve(__dirname, '..', 'static')),
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    TokensModule,
    MailModule,
    ChatModule,
    DatabaseModule,
  ],
})
export class AppModule {}
