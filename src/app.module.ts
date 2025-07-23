import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { EmployeeModule } from './app/domains/employee/employee.module';
import { HrFileModule } from './app/domains/hrfile/hrfile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
      load: [configuration],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: await configService.get('database.uri'),
        dbName: 'hrfiles-manager',
      }),
      inject: [ConfigService],
    }),
    EmployeeModule,
    HrFileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
