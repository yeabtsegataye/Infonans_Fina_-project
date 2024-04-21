import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import * as bcrypt from 'bcrypt';

/// this api is for admin to controll the agent 

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}
//////////////////////
  async create(agentData: Partial<Agent>): Promise<Agent> {
    // Check for required fields
    if (!agentData.name || !agentData.email || !agentData.phone || !agentData.password) {
      throw new BadRequestException('Name, email, phone, and password are required');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(agentData.password, 10);

    // Create and save the agent
    const agent = this.agentRepository.create({
      ...agentData,
      password: hashedPassword,
    });
    return this.agentRepository.save(agent);
  }
//////////////////////
  async delete(id: number) {
    const result = await this.agentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }else{
      return {msg: "agent deleted"};
    }
  }
//////////////////////
  async update(id: number, agentData: Partial<Agent>): Promise<Agent> {
    // Check if agent exists
    const agent = await this.agentRepository.findOne({where:{id}});
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
    // Update fields
    if (agentData.name) agent.name = agentData.name;
    if (agentData.email) agent.email = agentData.email;
    if (agentData.phone) agent.phone = agentData.phone;
    if (agentData.password) {
      agent.password = await bcrypt.hash(agentData.password, 10);
    }

    // Save and return updated agent
    return this.agentRepository.save(agent);
  }
//////////////////////
  async findById(id: number): Promise<Agent> {
    const agent = await this.agentRepository.findOne({where:{id}});
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
    return agent;
  }
//////////////////////
  async findAll(): Promise<Agent[]> {
    return this.agentRepository.find();
  }
}
