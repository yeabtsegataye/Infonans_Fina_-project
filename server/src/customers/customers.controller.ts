import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('create')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  } 

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Patch('block/:id')
  blockCustomer(@Param('id') id: string ) {
    return this.customersService.blockCustomer(+id, );
  }

  @Patch('Unblock/:id')
  UnblockCustomer(@Param('id') id: string ) {
    return this.customersService.UnblockCustomer(+id, );
  }
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
