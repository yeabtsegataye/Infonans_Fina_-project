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
  @Patch(':id/in-session')
  async setSessionToInSession(@Param('id') id: number): Promise<Chat> {
    return this.chatService.setSessionToInSession(id);
  }

  @Patch(':id/resolved')
  async setSessionToResolved(@Param('id') id: number): Promise<Chat> {
    return this.chatService.setSessionToResolved(id);
  }
  @Patch('update/:id')
  async updateChat(@Param('id') id: number) {
    return this.chatService.updateChat(id);
  }

  @Post('get')
  async getCustomers(@Body() createChatDto: CreateChatDto){
    console.log('here');
    
    return this.chatService.getCustomers(createChatDto)
  }

  @Get('getAll')
  async getAllCustomers(@Body() createChatDto: CreateChatDto){
    return this.chatService.getAllCustomers(createChatDto)}
}
