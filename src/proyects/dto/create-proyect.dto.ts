import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ProjectStatus } from 'src/shared/enum/project/status.enum';

export class CreateProyectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProjectStatus)
  estado: ProjectStatus;

  @IsString()
  fecha_inicio: string;

  @IsString()
  @IsOptional()
  fecha_fin?: string;

  @IsString()
  client: Types.ObjectId;
}
