import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import { Logger, ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { APP } from './config';

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(compression())
  app.use(helmet())
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, enableDebugMessages: true })
  )
  const config = new DocumentBuilder()
    .setTitle('Buktrips api')
    .setDescription('Main API')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(APP.PORT)
  logger.log(`Server is Connected at http://localhost:${APP.PORT}`)
  logger.log(`Swagger Api at http://localhost:${APP.PORT}/api`)
}
bootstrap();
