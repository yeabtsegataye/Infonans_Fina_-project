import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway()
export class WebSocketGateways implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Method to emit message to all agents
  emitToAgents(message: any) {
    this.server.emit('messageToAgents', message);
  }

  // Method to emit message to a specific agent
  emitToAgent(agentId: string, message: any) {
    this.server.to(agentId).emit('messageToAgent', message);
  }
}
