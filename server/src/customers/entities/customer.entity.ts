import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { Chat } from 'src/chat/entities/chat.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  service_name: string;

  @Column()
  name: string;
 
  @Column()
  isBlocked : boolean
  // Each customer can send multiple messages
  @OneToMany(() => Message, (message) => message.customer_id)
  customre_message: Message[];

  // Removed the import and relationship with the Chat entity
  @OneToMany(() => Chat, (chat) => chat.chat_sender)
  chat_Sender: Chat[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}