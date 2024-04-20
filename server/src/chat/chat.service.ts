import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat, SessionStatus } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    try {
      // Check if a chat already exists with the same sender and unresolved session
      const existingChat = await this.chatRepository.findOne({
        where: {
          chat_sender: createChatDto.chat_sender,
          session: SessionStatus.OPEN, // Check for unresolved session
        },
      });

      if (existingChat) {
        return existingChat;
      }

      // If no existing chat found, create a new one
      if (!createChatDto.chat_sender || !createChatDto.Title) {
        throw new BadRequestException('Sender and text are required');
      }
      const newChat = this.chatRepository.create(createChatDto);
      return this.chatRepository.save(newChat);
    } catch (error) {
      // Handle any errors (e.g., database errors)
      throw new Error(`Failed to create chat: ${error.message}`);
    }
  }
/////////////////////
  async setSessionToInSession(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({where:{id}});
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.session = SessionStatus.IN_SESSION;
    return this.chatRepository.save(chat);
  }
///////////////////////
  async setSessionToResolved(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({where:{id}});
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.session = SessionStatus.RESOLVED;
    return this.chatRepository.save(chat);
  }
}
