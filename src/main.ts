import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(env.API_PREFIX);
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (_, converted) => {
      delete converted._id;
      delete converted.__v;
    },
  });
  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('Just some basic api for NodeJS course')
    .setVersion(env.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(env.API_PREFIX, app, document);
  await app.listen(3000);
}
bootstrap();
