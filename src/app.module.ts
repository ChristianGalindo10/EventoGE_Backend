import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import * as Joi from 'joi';

import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './usuario/usuario.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.prod.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PG_HOST: Joi.string().required(),
        PG_DATABASE: Joi.string().required(),
        PG_USUARIO: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PG_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
