import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
//////////////////////
async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
  // Check if required fields are present
  if (!createCustomerDto.email || !createCustomerDto.phone || !createCustomerDto.name) {
    throw new BadRequestException('Email, phone, and name are required');
  }
  const customer = this.customerRepository.create(createCustomerDto);
  return this.customerRepository.save(customer);
}
////////////////////
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
////////////////////
  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({where:{id}});
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }
///////////////////
  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    const updatedCustomer = Object.assign(customer, updateCustomerDto);
    return this.customerRepository.save(updatedCustomer);
  }
/////////////////
  async remove(id: number): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }
////////////////
  async blockCustomer(id: number): Promise<void> {
    const customer = await this.findOne(id);
    customer.isBlocked = true;
    await this.customerRepository.save(customer);
  }
}
