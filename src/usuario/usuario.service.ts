import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { Usuario } from './usuario.entity';
import { UpdateUsuarioDto } from './usuario.dto';

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

  async update(id_usuario: number, cambios: UpdateUsuarioDto) {
    try {
      const user = await this.usuarioRepo.findOneBy({ id_usuario });
      console.log(user)
      this.usuarioRepo.merge(user, cambios);
      return this.usuarioRepo.save(user);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Problemas actualizando el usuario: ${error}`,
      );
    }
  }

  async remove(id_usuario: number) {
    try {
      const user = await this.usuarioRepo.findOneBy({ id_usuario });
      return this.usuarioRepo.delete(user.id_usuario);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Problemas eliminando el usuario: ${error}`,
      );
    }
  }

  async getCount() {
    try {
      const countA = await this.usuarioRepo.createQueryBuilder("user")
        .where("user.activo = :activo", { activo: true })
        .getCount()
      const countN = await this.usuarioRepo.createQueryBuilder("user")
        .where("user.activo = :activo", { activo: false })
        .getCount()
      const total = await this.usuarioRepo.createQueryBuilder("user").getCount()
      const datos = {
        total: total,
        countA: countA,
        countN: countN
      }
      return datos;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        `Problemas obteniendo conteo: ${error}`,
      );
    }
  }
}
