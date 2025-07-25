import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = new this.roleModel(createRoleDto);
    return await role.save();
  }

  findAll() {
    return `This action returns all role`;
  }

  async findOne(id?: Types.ObjectId) {
    return await this.roleModel.findById(id).exec();
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
