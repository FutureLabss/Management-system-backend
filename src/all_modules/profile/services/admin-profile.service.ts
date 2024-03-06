import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Profile } from '../model/profile.model';
import { CreateUserDto } from '../schema/dto/create-user.dto';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { UpdateUserDto } from '../schema/dto/update-user.dto';
import {
  Auth,
  AuthDocument,
} from 'src/all_modules/authentication/model/auth.model';
import { UpdateStatusDto } from '../schema/dto/update-status.dto';
import { IUser } from '../schema/interface/profile.interface';
import {
  AuthUser,
  UpdatedUserResponse,
} from 'src/all_modules/authentication/schema/entity/login.entity';
import {
  SingleUserResponse,
  UserResponse,
} from '../schema/entity/profile.entity';

@Injectable()
export class AdminProfileService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(Profile.name) private profileModel: mongoose.Model<Profile>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthUser> {
    const { department, ...userDto } = createUserDto;
    return await this.authModel
      .findOne({ email: createUserDto.email })
      .then(async (user) => {
        if (user) {
          throw new ServiceException(
            'Email already in use, try another one',
            HttpStatus.BAD_REQUEST,
          );
        }
        const userPassword = 'password';
        const newUserData: IUser = {
          ...userDto,
          password: userPassword,
        };
        const newAuthModel = new this.authModel(newUserData);
        const newUser = await newAuthModel.save();
        const newProfileModel = new this.profileModel({
          userId: newUser._id,
          department,
        });
        await newProfileModel.save();
        const response: AuthUser = {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
        };
        return response;
      });
  }

  async getAllUsers(page: number = 1, pageSize: number = 10): Promise<UserResponse[]> {
    const currentPage = (page - 1) * pageSize;
    console.log(currentPage)
    return await this.profileModel
      .find().skip(currentPage).limit(pageSize)
      .populate({ path: 'userId' })
      .then((allUsers) => {
        return allUsers.map((user) => {
          const auth = user.userId as AuthDocument;
          return <UserResponse>{
            id: user.id,
            profilePicture: user.profilePicture,
            department: user.department,
            email: auth.email,
            role: auth.role,
            fullName: auth.fullName,
            status: auth.isActive,
          };
        });
      });
  }

  async getSingleUser(id: string): Promise<any> {
    return await this.profileModel
      .findById(id)
      .populate({ path: 'userId' })
      .then((singleUser) => {
        if (!singleUser) {
          throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
        }
        const auth = singleUser.userId as AuthDocument;
        return <SingleUserResponse>{
          id: auth.id,
          fullName: auth.fullName,
          email: auth.email,
          department: singleUser.department,
          userType: singleUser.userType,
          profilePicture: singleUser.profilePicture,
          phoneNumber: auth.phoneNumber,
        };
      });
  }

  async updateUserProfile(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<UpdatedUserResponse> {
    const { department, profilePicture, ...userInfo } = updateData;
    let userProfile = await this.profileModel.findById(userId);
    if (!userProfile) {
      throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
    }
    return await this.authModel
      .findByIdAndUpdate(userProfile.userId, userInfo)
      .then((updated) => {
        if (!updated) {
          throw (
            (new ServiceException('Failed to update the data'),
            HttpStatus.EXPECTATION_FAILED)
          );
        }
        return this.profileModel
          .findByIdAndUpdate(
            { id: userProfile.id },
            { department, profilePicture },
          )
          .then(() => {
            const updatedUser: UpdatedUserResponse = {
              message: `The details for ${updated.fullName} has been updated successfully`,
            };
            return updatedUser;
          });
      });
  }

  async updateUserStatus(
    userId: string,
    updateStatus: UpdateStatusDto,
  ): Promise<UpdatedUserResponse> {
    let user = await this.authModel.findById(userId);
    if (!user) {
      throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
    }
    return await this.authModel
      .findByIdAndUpdate(userId, updateStatus)
      .then((statusChanged) => {
        if (!statusChanged) {
          throw (
            (new ServiceException('Failed to update user status'),
            HttpStatus.EXPECTATION_FAILED)
          );
        }
        const updatedUser: UpdatedUserResponse = {
          message: `The status for ${user.fullName} has been successfully changed.`,
        };
        return updatedUser;
      });
  }

  async deleteUser(userId: string): Promise<UpdatedUserResponse> {
    return await this.profileModel.findById(userId).then((user) => {
      if (!user) {
        throw (new ServiceException('User not found'), HttpStatus.BAD_REQUEST);
      }
      return Promise.allSettled([
        user.deleteOne(),
        this.authModel.findByIdAndDelete(user.userId),
      ]).then(() => {
        return {
          message: 'User deleted successfully',
        };
      });
    });
  }

  
}
