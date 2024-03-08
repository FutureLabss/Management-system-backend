import {
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Profile, ProfileDocument } from '../model/profile.model';
import { CreateUserDto } from '../schema/dto/create-user.dto';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { UpdateUserDto } from '../schema/dto/update-user.dto';
import {
  Auth,
  AuthDocument,
} from 'src/all_modules/authentication/model/auth.model';
import { UpdateStatusDto } from '../schema/dto/update-status.dto';
import { Filter, IUser } from '../schema/interface/profile.interface';
import {
  AuthUser,
  UpdatedUserResponse,
} from 'src/all_modules/authentication/schema/entity/login.entity';
import {
  SingleUserResponse,
  UserResponse,
} from '../schema/entity/profile.entity';
import { Role } from 'src/all_modules/authentication/schema/enum/auth.enum';
import { ConfigService } from '@nestjs/config';
import { PaginateModel } from 'src/core/helpers/pagination';
import { PaginatedResponse } from 'src/core/entities/response.entities';
import { EmailService } from 'src/all_modules/email/services/email.service';

@Injectable()
export class AdminProfileService implements OnModuleInit {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(Profile.name) private profileModel: PaginateModel<Profile>,
    private configService: ConfigService,
    private emailService: EmailService)
    
  {}

  async onModuleInit() {
    return this.authModel
      .findOne({
        email: this.configService.get('DEFAULT_ADMIN', 'admin10@email.com'),
      })
      .then(async (existingUser) => {
        if (!existingUser) {
          const adminUser = new this.authModel({
            email: this.configService.get('DEFAULT_ADMIN', 'admin10@email.com'),
            fullName: 'admin',
            password: this.configService.get('DEFAULT_PASSWORD', 'password10 '),
            role: Role.ADMIN,
            phoneNumber: '09045678902',
          });

          return adminUser.save().catch(() => {});
        }
      })
      .catch(() => {});
  }

  async register(createUserDto: CreateUserDto): Promise<AuthUser> {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const userPassword = createUserDto.email.split('@')[0] + Math.floor(10 + Math.random() * 5);
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
        const newUserData: IUser = {
          ...userDto,
          password:userPassword,
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
          role: newUser.role,
        };
        await this.emailService.sendUserWelcome(newUserData, token);
        return response;
      });
  }

  async getAllUsers(filters: Filter):Promise<PaginatedResponse<UserResponse>> {
    const {page, pageSize, ...otherFilters} = filters
    return await this.profileModel
      .find({ ...otherFilters})
      .populate({ path: 'userId' })
      .paginate({ page, limit: pageSize })
      .then((allUsers) => {
        const data = allUsers.data.map((user) => {
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
        return <PaginatedResponse<UserResponse>>{
          ...allUsers,
          data,
        };
      });
  }

  async getSingleUser(id: string): Promise<SingleUserResponse> {
    return await this.profileModel
      .findById(id)
      .populate({ path: 'userId' })
      .then((singleUser) => {
        if (!singleUser) {
          throw new ServiceException('No such User'), HttpStatus.NOT_FOUND;
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
      .then(async(updated) => { 
        if (!updated) {
          throw (
            (new ServiceException('Failed to update the data'),
            HttpStatus.EXPECTATION_FAILED)
          );
        }
        return this.profileModel
          .findByIdAndUpdate(
             userProfile.id ,
            { department, profilePicture },
          )
          .then(() => {
            const updatedUser: UpdatedUserResponse = {
              message: `The details for "${updated.fullName}" has been updated successfully`,
            };
            return updatedUser;
          });
      });
  }

  async updateUserStatus(
    userId: string,
    updateStatus: UpdateStatusDto,
  ): Promise<UpdatedUserResponse> {
    let user = await this.profileModel.findById(userId);
    if (!user) {
      throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
    }
    return await this.authModel
      .findByIdAndUpdate(user.userId, updateStatus)
      .then((statusChanged) => {
        if (!statusChanged) {
          throw (
            (new ServiceException('Failed to update user status'),
            HttpStatus.EXPECTATION_FAILED)
          );
        }
        const updatedUser: UpdatedUserResponse = {
          message: `The status has been successfully changed.`,
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
