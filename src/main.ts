import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { jwtAuth } from './auth/jwtAuth.guard';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './middlewares/global-exception.filter';
import { ResponseFormatInterceptor } from './middlewares/response-format.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new jwtAuth(reflector));
  // app.useGlobalFilters(new GlobalExceptionFilter());
   app.useGlobalInterceptors(new ResponseFormatInterceptor)
  const configService = app.get(ConfigService)

  const port = configService.get('port')

  await app.listen(port);
}
bootstrap();
