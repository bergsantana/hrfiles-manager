import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  console.log('env port', configService.get('port'))
  console.log('env database url ', configService.get('database.uri') )
   
  await app.listen(configService.get('PORT') ?? 3000);

}
bootstrap();
