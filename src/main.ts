import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './config/logging.interceptor';
import { HttpExceptionFilter } from './user/filters/http-exeption.filter';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  //     AppModule,
  //     new FastifyAdapter(),
  //   );
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(4000);
}
bootstrap();
