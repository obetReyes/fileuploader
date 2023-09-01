import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    { bufferLogs: true });
    // -- Helmet
  app.use(helmet());

  app.enableCors({
    methods:["POST"],
    origin:process.env.HOST 
  });
app.useLogger(app.get(Logger)
);
  if(process.env.NODE_ENV == "development"){
    const config = new DocumentBuilder()
    .setTitle('file Uploader')
    .setDescription('api to upload files to cloudinary server ')
    .setVersion('1.0')
  
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  }
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
    await app.listen(3000);
}
bootstrap();
