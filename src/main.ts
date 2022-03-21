import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      exceptionFactory: (validationErrors) =>
        new BadRequestException({
          message:
            'Required fields are missing or invalid. Please refer errors for more details.',
          errors: validationErrors.map((error) => ({
            field: error.property,
            message: Object.values(error.constraints).join(', '),
          })),
        }),
    }),
  );
  await app.listen(3000);
}
bootstrap();
