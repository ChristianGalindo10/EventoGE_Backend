import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';

import { UsuarioService } from './usuario.service';

@Controller('asistentes')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService,
    ) {}

    @Get()
    findAll() {
        return this.usuarioService.findAll();
    }
}
