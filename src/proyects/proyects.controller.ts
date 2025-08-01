import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { JwtAuthGuard } from 'src/shared/guards/auth/jwt-auth-guard/jwt-auth-guard.guard';
import { PermitionsGuard } from 'src/shared/guards/permitions/permitions.guard';
import { Permissions } from 'src/shared/decoradores/permitions/permitions.decorator';
import { Request } from 'express';
import { IJwtUser } from './interfaces/jwt-user.intereface';

@UseGuards(JwtAuthGuard, PermitionsGuard)
@Controller('proyects')
export class ProyectsController {
  constructor(private readonly proyectsService: ProyectsService) {}

  @Permissions('proyect:create')
  @Post()
  create(@Body() createProyectDto: CreateProyectDto) {
    return this.proyectsService.create(createProyectDto);
  }

  @Permissions('proyect:read')
  @Get()
  findAll(@Req() req: Request) {
    const user: IJwtUser = req['user'];
    return this.proyectsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectDto: UpdateProyectDto) {
    return this.proyectsService.update(+id, updateProyectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectsService.remove(+id);
  }
}
