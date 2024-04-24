import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat, SessionStatus } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { WebsocketGateway } from 'src/socket/websocket.gateway';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private socket : WebsocketGateway
  ) {}

    async create(createChatDto: CreateChatDto) {
      try {
        if (
          !createChatDto.Title ||
          !createChatDto.chat_sender
        ) {
          throw new BadRequestException(' some fields are required');
        }
        //Check if a chat already exists with the same sender and unresolved session
        const existingChat = await this.chatRepository.query(`
            SELECT * FROM chat
            WHERE chatSenderId = ?
            AND session IN (?, ?)
          `, [createChatDto.chat_sender, SessionStatus.OPEN, SessionStatus.IN_SESSION]);

        if (existingChat.length > 0) {
          console.log('existed ', createChatDto.chat_sender),
          console.log("existed", createChatDto.session)

          return existingChat;
        }

        // const senderNotExist = await this.chatRepository.query(`
        //     SELECT * FROM chat
        //     WHERE chatSender
        // `)
        // If no existing chat found, create a new one
        if (!createChatDto.chat_sender || !createChatDto.Title) {
          throw new BadRequestException('Sender and text are required');
        }
        const newChat = await this.chatRepository
          .createQueryBuilder()
          .insert()
          .into(Chat)
          .values({
            chat_sender: createChatDto.chat_sender,
            Title: createChatDto.Title,
          })
          .execute();
          console.log(newChat);
          

        return newChat;
      } catch (error) {
        // Handle any errors (e.g., database errors)
        return `Failed to create chat: ${error.message}`;
      }
    }
  /////////////////////
  async setSessionToInSession(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.session = SessionStatus.IN_SESSION;
    return this.chatRepository.save(chat);
  }
  ///////////////////////
  async setSessionToResolved(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.session = SessionStatus.RESOLVED;
    return this.chatRepository.save(chat);
  }
  async updateChat(id : number){
    const chat = await this.chatRepository.findOne({ where: { id } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    /// code left
  }
}
