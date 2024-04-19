export class CreateAgentDto {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly created_at: Date;
}
