import { Customer } from "src/customers/entities/customer.entity";
import { Agent } from "src/agent/entities/agent.entity";

export enum SessionStatus {
    OPEN = 'open',
    IN_SESSION = 'in_session',
    RESOLVED = 'resolved',
  }
export class CreateChatDto {
    Title: string;
    chat_sender: Customer;
    chat_receiver: Agent;
    session : SessionStatus;
    chatId: number
  }
  