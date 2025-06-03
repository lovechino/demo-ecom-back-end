/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // app.useGlobalPipes(new ValidationPipe());

  // Cho phép CORS (nếu dùng frontend)
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
   console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
