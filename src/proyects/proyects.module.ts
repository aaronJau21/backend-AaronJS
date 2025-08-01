import { Module } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { ProyectsController } from './proyects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyect, ProyectSchema } from './entities/proyect.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [ProyectsController],
  providers: [ProyectsService],
  imports: [
    MongooseModule.forFeature([{ name: Proyect.name, schema: ProyectSchema }]),
    SharedModule
  ],
})
export class ProyectsModule {}
