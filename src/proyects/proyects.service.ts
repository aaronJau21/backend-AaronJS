import { Injectable } from '@nestjs/common';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Proyect } from './entities/proyect.entity';
import { Model } from 'mongoose';
import { IJwtUser } from './interfaces/jwt-user.intereface';

@Injectable()
export class ProyectsService {
  constructor(
    @InjectModel(Proyect.name)
    private readonly proyectRepository: Model<Proyect>,
  ) {}

  async create(createProyectDto: CreateProyectDto) {
    const project = new this.proyectRepository(createProyectDto);
    await project.save();

    return project;
  }

  findAll(user: IJwtUser) {
    if (user.role === 'Administrador') {
      return this.proyectRepository.find().exec();
    } else if (user.role === 'Client') {
      return this.proyectRepository.find({ client: user.id }).exec();
    } 
  }

  findOne(id: number) {
    return `This action returns a #${id} proyect`;
  }

  update(id: number, updateProyectDto: UpdateProyectDto) {
    return `This action updates a #${id} proyect`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyect`;
  }
}
