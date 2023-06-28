import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
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
}

// export class FilterUsersDto {
//   @IsOptional()
//   @IsPositive()
//   limit: number;
//   @IsOptional()
//   @Min(0)
//   offset: number;
// }
