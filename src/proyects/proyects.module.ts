import { Module } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { ProyectsController } from './proyects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyect, ProyectSchema } from './entities/proyect.entity';

@Module({
  controllers: [ProyectsController],
  providers: [ProyectsService],
  imports: [
    MongooseModule.forFeature([{ name: Proyect.name, schema: ProyectSchema }]),
  ],
})
export class ProyectsModule {}
