import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './message/entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from './agent/agent.module';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';
import { Agent } from './agent/entities/agent.entity';
import { AuthModule } from './auth/auth.module';
import { WebsocketGateway } from './socket/websocket.gateway';
//
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'beti',
      password: 'beti',
      database: 'Customer_support',
      entities: [Chat, Message,Customer,Agent],
      synchronize: false,// for production set it true
    }),
    MessageModule, 
    ChatModule,
    AgentModule,
    CustomersModule,
  //AuthModule
  ],
  controllers: [],
  providers: [WebsocketGateway],
  exports: [],
})
export class AppModule {}