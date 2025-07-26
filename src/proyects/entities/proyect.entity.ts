import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProjectStatus } from 'src/shared/enum/project/status.enum';
import { User } from 'src/user/entities/user.entity';

@Schema()
export class Proyect extends Document {
  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: String })
  estado: ProjectStatus;

  @Prop({ required: true, type: String })
  fecha_inicio: string;

  @Prop({ required: false, type: String })
  fecha_fin?: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  client: Types.ObjectId;
}

export const ProyectSchema = SchemaFactory.createForClass(Proyect);
