import { Agent } from "src/agent/entities/agent.entity";
import { Customer } from "src/customers/entities/customer.entity";

export class CreateMessageDto {
     id: number;
     content: string;
     customer_id: Customer;
     agentId: Agent;
     createdAt: Date;
}
