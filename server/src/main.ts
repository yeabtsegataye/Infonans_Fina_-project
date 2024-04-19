import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply CORS middleware
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  // Apply logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Request ${req.method} ${req.path}`);
    next();
  });

  await app.listen(8000);
}

bootstrap();