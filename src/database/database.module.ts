import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      // inject: [config.KEY],
      // useFactory: (configService: ConfigType<typeof config>) => {
      //   const { host, name, user, password, port, schema } =
      //     configService.postgres;
      //   return {
      //     type: 'postgres',
      //     host,
      //     database: name,
      //     schema,
      //     username: user,
      //     password,
      //     port,
      //     synchronize: true,
      //     autoLoadEntities: true,
      //     //entities: ["src/**/*.entity.ts"],
      //   };
      // },
      type: 'postgres',
      url: 'postgres://postgres1:SaHn7weFP85XUfib7S6oWI1zqqdbhFGe@dpg-cido3gp5rnukltkjf7hg-a.oregon-postgres.render.com/gearelectric_evento?ssl=true'
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
