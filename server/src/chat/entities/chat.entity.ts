import { Agent } from 'src/agent/entities/agent.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SessionStatus {
  OPEN = 'open',
  IN_SESSION = 'in_session',
  RESOLVED = 'resolved',
}

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Title: string;

  @ManyToOne(() => Customer, (customer) => customer.chat_Sender)
  chat_sender: Customer;

  @ManyToOne(() => Agent, (Agent) => Agent.chat_receiver)
  chat_receiver: Agent;

  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.OPEN })
  session: SessionStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
