import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (_, converted) => {
      delete converted._id;
      delete converted.__v;
    },
  });
  await app.listen(3000);
}
bootstrap();
