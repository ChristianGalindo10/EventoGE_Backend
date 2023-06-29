import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class CreateUsuarioDto {
  
  @IsNotEmpty()
  @IsString()
  readonly tipo_documento: string;
  
  @IsNotEmpty()
  @IsString()
  readonly documento: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;
  
  @IsNotEmpty()
  @IsNumber()
  readonly telefono: number;
  
  @IsNotEmpty()
  @IsString()
  readonly correo: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly activo: boolean;
}

// export class FilterUsersDto {
//   @IsOptional()
//   @IsPositive()
//   limit: number;
//   @IsOptional()
//   @Min(0)
//   offset: number;
// }

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}