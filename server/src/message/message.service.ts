import { Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  /////////////////////////////////
  async create(createMessageDto: CreateMessageDto) {
    try {
      const { content, customer_id, agentId } = createMessageDto;
      if(!content && !customer_id && !agentId){ throw new Error(`some filed is empty`);}
      // Create a new message entity
      const newMessage = this.messageRepository.create(
        createMessageDto
      );
     
      // Save the new message entity
      return this.messageRepository.save(newMessage);
    } catch (error) {
      // Handle any errors (e.g., database errors)
      throw new Error(`Failed to create message: ${error.message}`);
    }
  }

  ///////////////////////////////////////////
  async findAll_for_sender(createMessageDto: CreateMessageDto) {
    try {
      return this.messageRepository.find({
        where: { agent: createMessageDto.agentId },
      });
    } catch (error) {
      // Handle any errors (e.g., database errors)
      throw new Error(`Failed to retrieve messages: ${error.message}`);
    }
  }

  //////////////////////////////////////////
  async findAll_for_customer(createMessageDto: CreateMessageDto) {
    try {
      return this.messageRepository.find({
        where: { customer_id: createMessageDto.customer_id },
      });
    } catch (error) {
      // Handle any errors (e.g., database errors)
      throw new Error(`Failed to retrieve messages: ${error.message}`);
    }
  }
}
