import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent]), // Register Agent entity
  ],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
