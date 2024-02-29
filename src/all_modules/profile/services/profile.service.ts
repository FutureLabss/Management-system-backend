import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Profile } from '../model/profile.model';
import { Auth } from 'src/all_modules/authentication/model/auth.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(Profile.name) private profileModel: mongoose.Model<Profile>,
  ) {}

//  async getUser(id: string): Promise<AuthUserResponse> {
//   return this.authModel.findById({userId: id})
//   .then((user)=>{
//     if(!user){
//       throw new ServiceException('No such User'), HttpStatus.NOT_FOUND;
//     }
// //     const authUser:AuthUserResponse{
// //  id: userId,

// //     }
//     return user
//   })
// }

}