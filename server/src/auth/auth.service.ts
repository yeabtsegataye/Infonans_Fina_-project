import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Agent } from 'src/agent/entities/agent.entity';

// this auth api is for agents to log in based on the created account for them by the admin

@Injectable()
export class AuthService {
  /////////////////
  constructor(
    @InjectRepository(Agent)
    private CustomerRepository: Repository<Agent>,
    private jwtService: JwtService,
  ) {}
  ///////////////////////
  async Signup(AutDTO: CreateAuthDto) {
    const existingUser = await this.CustomerRepository.findOne({
      where: { email: AutDTO.email },
    });

    if (existingUser) {
      return 'User already exists';
    } else {
      try {
        const hash = await bcrypt.hash(AutDTO.Password, 10);
        const newUser = this.CustomerRepository.create({
          email: AutDTO.email,
          password: hash,
          phone: AutDTO.phone,
        });
        const data = await this.CustomerRepository.save(newUser);
        console.log(data, 'the datas');
        return data;
      } catch (error) {
        console.error('Error hashing password:', error);
        return 'Error creating user';
      }
    }
  }
  ////////////////////////
  async Login(AutDTO: CreateAuthDto) {
    const data = await this.CustomerRepository.findOne({
      where: { email: AutDTO.email },
    });
    if (!data) {
      return 'no user found ';
    }
    const isMatch = await bcrypt.compare(AutDTO.Password, data.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { id: data.id, email: data.email };
    const access_token =  await this.jwtService.signAsync(payload)
    return { access_token , payload};
  }
}
