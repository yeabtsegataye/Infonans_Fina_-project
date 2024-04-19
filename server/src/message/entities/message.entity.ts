import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from "src/customers/entities/customer.entity";
import { Agent } from 'src/agent/entities/agent.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // Relationship with Customer as sender 
  @ManyToOne(() => Customer, (customer) => customer.customre_message)
  customer_id: Customer;

  // Relationship with Agent as sender
  @ManyToOne(() => Agent, (agent) => agent.agent)
  agent: Agent;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
