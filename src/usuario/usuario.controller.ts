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
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.dto';

@Controller('asistentes')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService,
    ) { }

    @Get()
    findAll() {
        return this.usuarioService.findAll();
    }

    @Get('/count')
    getCount() {
        return this.usuarioService.getCount();
    }

    @Post()
    createUsuario(@Body() payload: CreateUsuarioDto) {
        console.log(payload)
        return this.usuarioService.createUser(payload);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateUsuarioDto,
    ) {
        return this.usuarioService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.remove(id);
    }
}
