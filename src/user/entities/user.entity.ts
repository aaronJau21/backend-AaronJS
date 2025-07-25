import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: Types.ObjectId, ref: Role.name, required: true })
  role: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
