import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { WebSocketGateways } from 'src/socket/websocket.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService, WebSocketGateways],
})
export class ChatModule {}
