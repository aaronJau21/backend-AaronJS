import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { JwtAuthGuard } from 'src/shared/guards/auth/jwt-auth-guard/jwt-auth-guard.guard';
import { PermitionsGuard } from 'src/shared/guards/permitions/permitions.guard';
import { Permissions } from 'src/shared/decoradores/permitions/permitions.decorator';

@UseGuards(JwtAuthGuard, PermitionsGuard)
@Controller('proyects')
export class ProyectsController {
  constructor(private readonly proyectsService: ProyectsService) {}

  @Permissions('proyect:create')
  @Post()
  create(@Body() createProyectDto: CreateProyectDto) {
    return this.proyectsService.create(createProyectDto);
  }

  @Get()
  findAll() {
    return this.proyectsService.findAll();
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
