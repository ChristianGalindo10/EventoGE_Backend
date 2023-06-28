import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { Repository } from 'typeorm/repository/Repository';

import { Usuario } from './usuario.entity';

import {
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';

import {
    CreateUsuarioDto,
    //FilterUsersDto,
    //UpdateUsuarioDto,
} from './usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>
    ) { }


    async findAll() {
        try {
            return await this.usuarioRepo.find({});
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(
                `Problemas encontrando los usuarios: ${error}`,
            );
        }
    }

    async createUser(data: CreateUsuarioDto) {
        try {
            const userExits = await this.findOneByCorreo(data.correo);
            if (userExits instanceof Usuario) {
              throw new InternalServerErrorException(
                `Este usuario ya se encuentra registrado en la BD`,
              );
            }
            const newUser = this.usuarioRepo.create(data);
            return this.usuarioRepo.save(newUser);
          } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(
              `Problemas creando el usuario: ${error}`,
            );
          }
    }

    async findOneByCorreo(correo: string) {
        try {
          const user = await this.usuarioRepo.findOne({
            where: { correo: correo },
          });
          // if (!user) {
          //   throw new NotFoundException(
          //     `Usuario con #${correo_cor} no se encuentra en la Base de Datos`,
          //   );
          // }
          return user;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException(
            `Problemas encontrando el usuario dado el correo: ${error}`,
          );
        }
      }

}
