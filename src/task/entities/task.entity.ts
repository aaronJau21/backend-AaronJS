import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Proyect } from 'src/proyects/entities/proyect.entity';
import { ProjectStatus } from 'src/shared/enum/project/status.enum';

@Schema()
export class Task {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: ProjectStatus;

  @Prop({ required: true, type: Types.ObjectId, ref: Proyect.name })
  project: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
