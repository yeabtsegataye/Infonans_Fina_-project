import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { Agent } from 'src/agent/entities/agent.entity';
import { WebSocketGateways } from 'src/socket/websocket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Agent]),
  JwtModule.register({
    global: true,// to make it globaly available
    secret: jwtConstants.Access_secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, WebSocketGateways,
    // { // remove this to make manual guard
    //   provide: APP_GUARD, // to make the guard for all routh
    //   useClass: AuthGuard,
    // }
  ],
})
export class AuthModule {}