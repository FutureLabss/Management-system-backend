import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Biometric } from '../model/biometric.model';

@Injectable()
export class BiometricService {
  constructor(@InjectModel(Biometric.name) private authModel: mongoose.Model<Biometric>,) {}

 
}
