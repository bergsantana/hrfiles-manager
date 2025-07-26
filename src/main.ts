import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger('HR FILES MANAGER', {}),
  });
  app.setGlobalPrefix(`hr-files-manager/api`);
  app.enableCors({ origin: '*' });
  app.use(json({ limit: '200mb' }));

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('HR Files Manager')
    .setDescription('API documentation for a employees documents')
    .setVersion('1.0')
    .addBearerAuth() // if using JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('hr-files-manager/api/docs', app, document);

  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
