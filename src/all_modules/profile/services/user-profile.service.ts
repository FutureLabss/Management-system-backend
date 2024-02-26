import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Profile } from '../model/profile.model';
import { Auth } from 'src/all_modules/authentication/model/auth.model';
import { CreateUserDto } from '../schema/dto/create-user.dto';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { AuthUser } from 'src/all_modules/authentication/schema/entity/login.entity';
@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(Profile.name) private profileModel: mongoose.Model<Profile>,
  ) {}

 
}
