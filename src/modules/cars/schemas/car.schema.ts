import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/shemas/user.schema';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true, enum: ['new', 'used'], type: String })
  state: string;

  @Prop({ required: true, default: 'available', enum: ['available', 'sold'], type: String })
  status: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  manufacturer: string;

  @Prop({ required: true, type: String })
  model: string;

  @Prop({ required: true, type: String })
  bodyType: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ default: new Date(), type: Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: Date })
  deletedAt?: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);
