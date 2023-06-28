import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, name, user, password, port, schema } =
          configService.postgres;
        return {
          type: 'postgres',
          host,
          database: name,
          schema,
          username: user,
          password,
          port,
          synchronize: true,
          autoLoadEntities: true,
          //entities: ["src/**/*.entity.ts"],
        };
      },
      // type: 'postgres',
      // url: 'postgres://unzqgyjk:gyRJDSCjS4btdsER6aWdfYD8OQ2n-f-n@mahmud.db.elephantsql.com/unzqgyjk?ssl=true'
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
