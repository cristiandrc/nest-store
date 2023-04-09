import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //filter data in the payload
      forbidNonWhitelisted: true, //throw error if send extra data,
    }),
  );
  await app.listen(3000);
}
bootstrap();
