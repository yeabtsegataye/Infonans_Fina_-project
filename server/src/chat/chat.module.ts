import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
// import { WebsocketGateway } from 'src/socket/websocket.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService, ],
})
export class ChatModule {}
