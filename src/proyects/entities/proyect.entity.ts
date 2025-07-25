import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Proyect extends Document {
  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: String })
  estado: string;
}

export const ProyectSchema = SchemaFactory.createForClass(Proyect);