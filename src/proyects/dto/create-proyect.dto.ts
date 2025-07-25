import { IsOptional, IsString } from 'class-validator';

export class CreateProyectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  estado: string;
}
