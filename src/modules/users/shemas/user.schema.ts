import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, default: Object.toString() })
  // _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ default: false, type: Boolean })
  isAdmin: boolean;

  @Prop({ default: new Date(), type: Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: Date })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
