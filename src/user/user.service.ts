import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { HashService } from 'src/shared/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const passwordHash = await this.hashService.hashPassword(
      createUserDto.password,
    );
    const user = new this.userModel({ password: passwordHash, ...rest });
    return await user.save();
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
