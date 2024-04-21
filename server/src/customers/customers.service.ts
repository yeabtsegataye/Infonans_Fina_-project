import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { error } from 'console';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  //////////////////////
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const data =await this.customerRepository.findOne({
        where: {
          email: createCustomerDto.email,
        },
      });
     
      if (data) {
        return { msg: 'customer already exists' };
      }
      // Check if required fields are present
      if (
        !createCustomerDto.email ||
        !createCustomerDto.phone ||
        !createCustomerDto.name
      ) {
        throw new BadRequestException('Email, phone, and name are required');
      }
      const customer = this.customerRepository.create(createCustomerDto);
      return this.customerRepository.save(customer);
    } catch (error) {
      return error;
    }
  }
  ////////////////////
  async findAll() {
    try {
      return this.customerRepository.find();
    } catch (error) {
      console.log(error);
      return { msg: 'error on finding the customers' };
    }
  }
  ////////////////////
  async findOne(id: number) {
    try {
      if(!id){
        throw new Error('invalid parametr')
      }
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      return customer;
    } catch (error) {
      return { msg: error.message };
    }
  }
  ///////////////////
  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findOne(id);
    const updatedCustomer = Object.assign(customer, updateCustomerDto);
    return this.customerRepository.save(updatedCustomer);
  }
  /////////////////
  async remove(id: number) {
    try {
      const result = await this.customerRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      return { msg: 'customer is deleted' };
    } catch (error) {
      return { msg: error };
    }
  }
  ////////////////
  async blockCustomer(id: number) {
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        return { msg: 'customer not found ' };
      }
      customer.isBlocked = true;
      await this.customerRepository.save(customer);
      return customer
    } catch (error) {
      return { msg: 'error on blocking customer ' };
    }
  }
  //////////////
  async UnblockCustomer(id: number) {
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        return { msg: 'customer not found ' };
      }
      customer.isBlocked = false;
      await this.customerRepository.save(customer);
      return customer
    } catch (error) {
      return { msg: 'error on blocking customer ' };
    }
  }
}
