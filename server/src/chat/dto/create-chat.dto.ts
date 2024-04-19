import { Customer } from "src/customers/entities/customer.entity";
import { Chat } from "../entities/chat.entity";

export class CreateChatDto {
    readonly id: number;
    readonly title: string;
    readonly chat_sender: Customer;
    readonly chat_receiver: Chat; // Assuming ChatDTO for self-referencing chat relationship
    readonly session: string; // Enum is converted to string for DTO
    readonly createdAt: Date;
}
