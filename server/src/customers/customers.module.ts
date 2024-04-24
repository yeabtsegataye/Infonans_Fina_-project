import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { WebSocketGateways } from 'src/socket/websocket.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService, WebSocketGateways],
})
export class CustomersModule {}
