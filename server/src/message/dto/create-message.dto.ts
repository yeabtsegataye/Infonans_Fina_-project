import { Agent } from "src/agent/entities/agent.entity";
import { Customer } from "src/customers/entities/customer.entity";

export class CreateMessageDto {
    readonly id: number;
    readonly content: string;
    readonly customer: Customer;
    readonly agent: Agent;
    readonly createdAt: Date;
}
