import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }
  @Patch('in-session')
  async setSessionToInSession(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.setSessionToInSession(createChatDto);
  }

  @Get('getAll')
  async getAllCustomers() {
    return this.chatService.getAllCustomers();
  }

  @Post('get')
  async getCustomers(@Body() createChatDto: CreateChatDto) {
    return this.chatService.getCustomers(createChatDto);
  }

  @Patch('resolved')
  async setSessionToResolved(@Param('id') id: number) {
    return this.chatService.setSessionToResolved(id);
  }
  @Patch('update/:id')
  async updateChat(@Param('id') id: number) {
    return this.chatService.updateChat(id);
  }
}
