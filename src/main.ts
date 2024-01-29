import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { RestExceptionFilter } from './infra/apis/rest/exceptions/rest-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new RestExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Clients Service Lanchonete')
    .setDescription('Esta API expõe endpoints para gerenciamento dos clientes.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/clients/docs', app, document);

  await app.listen(3001);
}
bootstrap();
