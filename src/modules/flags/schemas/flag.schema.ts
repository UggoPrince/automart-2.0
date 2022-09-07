import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Car } from 'src/modules/cars/schemas/car.schema';

export type FlagDocument = Flag & Document;

@Schema()
export class Flag {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Car' })
  carId: Car;

  @Prop({ required: true, type: String })
  reason: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ default: new Date(), type: Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: Date })
  updatedAt: Date;
}

export const FlagSchema = SchemaFactory.createForClass(Flag);
