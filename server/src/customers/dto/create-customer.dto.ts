export class CreateCustomerDto {
    readonly id: number;
    readonly email: string;
    readonly phone: string;
    readonly service_name: string;
    readonly name: string;
    readonly created_at: Date;
}
