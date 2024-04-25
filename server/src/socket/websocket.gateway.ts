import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface SocketMetaPayload extends JwtPayload {
  socketId: string;
}

interface GroupedMessage extends JwtPayload {
  socketId: string;
}

@Injectable()
@WebSocketGateway({ cors: '*' })
export class WebSocketGateways implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;
  socketMap = new Map<string, SocketMetaPayload>();
  socketMapGroup = new Map<string, GroupedMessage[]>(); // Changed to an array for multiple sockets per role

  constructor(private readonly jwt: JwtService) {}

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Socket connected: ${client.id}`);
    const token = client.handshake.headers.authorization?.split(' ')[1];
    if (!token) {
      client.disconnect(true);
      console.log('Returned');
      return;
    }

    try {
      const payload = this.jwt.verify(token);
      this.socketMap.set(payload.id, {
        ...payload,
        socketId: client.id,
      });

      if (!this.socketMapGroup.has(payload.role)) {
        this.socketMapGroup.set(payload.role, []);
      }

      const group = this.socketMapGroup.get(payload.role);
      group.push({
        ...payload,
        socketId: client.id,
      });

      this.socketMapGroup.set(payload.role, group);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log('Token expired');
      } else {
        console.error('Error verifying token:', error);
      }
      return;
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.socketMap.forEach((value, key) => {
      if (value.socketId === client.id) {
        this.socketMap.delete(key);
      }
    });

    this.socketMapGroup.forEach((group, key) => {
      const updatedGroup = group.filter(socket => socket.socketId !== client.id);
      this.socketMapGroup.set(key, updatedGroup);
    });
  }

  async emitNotificationToGroups(notification: any, role: string) {
    const sockets = this.socketMapGroup.get(role) || [];

    sockets.forEach(socketMeta => {
      this.server.to(socketMeta.socketId).emit('resquest', notification);
    });

    if (sockets.length === 0) {
      console.log(`No ${role} users online at the moment!`);
    }
  }
  async emitStateToGroup(state: any, role: string) {
    const sockets = this.socketMapGroup.get(role) || [];

    sockets.forEach(socketMeta => {
      this.server.to(socketMeta.socketId).emit('session', state);
    });

    if (sockets.length === 0) {
      console.log(`No ${role} users online at the moment!`);
    }
  }
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, data: any) {
    this.server.to(data.room).emit('connection', data.message);
  }

  @SubscribeMessage('currentUsers')
  async currentUsers(client: Socket) {
    client.emit('currentUsers', Array.from(this.socketMap.values()));
  }
}
