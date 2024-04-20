import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }
  @Patch(':id/in-session')
  async setSessionToInSession(@Param('id') id: number): Promise<Chat> {
    return this.chatService.setSessionToInSession(id);
  }

  @Patch(':id/resolved')
  async setSessionToResolved(@Param('id') id: number): Promise<Chat> {
    return this.chatService.setSessionToResolved(id);
  }
}
