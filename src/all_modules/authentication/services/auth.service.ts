import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../model/auth.model';
import mongoose from 'mongoose';
import { ServiceException } from 'src/core/exceptions/service.exception';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../schema/dto/login.dto';
import {
  AuthResponse,
  AuthUser,
  UpdatedUserResponse,
} from '../schema/entity/login.entity';
import { ForgotPasswordDto, passwordDTO } from '../schema/dto/password.dto';
import { ConfigService } from '@nestjs/config';
import { ForgotPassword } from 'src/all_modules/email/model/email.model';
import { EmailService } from 'src/all_modules/email/services/email.service';
import { IEmail, IPassword } from 'src/all_modules/profile/schema/interface/profile.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(ForgotPassword.name) private emailModel: mongoose.Model<Auth>,
    private emailService: EmailService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.authModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new ServiceException(
        'Invalid Login Credentials: Re-enter a valid Email',
        HttpStatus.BAD_REQUEST,
      );
    }
    const correctPassword = bcrypt.compare(loginDto.password, user.password);
    if (!correctPassword) {
      throw new ServiceException(
        'Invalid Login Credentials:Check your password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.signUser(user);
  }

  async signUser(user: AuthDocument): Promise<AuthResponse> {
    const payload: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    user.refreshToken = await this.hashRefreshToken(refreshToken);
    await user.save();

    return {
      ...payload,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  private async hashRefreshToken(refreshToken: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(refreshToken, salt);
  }
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const decoded = this.jwtService.decode(refreshToken);
    if (!decoded) {
      throw new ServiceException(
        'Invalid refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.authModel.findById(decoded.id);
    if (!user) {
      throw new ServiceException('Invalid userId', HttpStatus.BAD_REQUEST);
    }
    const validRefreshToken = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!validRefreshToken) {
      throw new ServiceException(
        'The refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPayload: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
    const newAccessToken = this.jwtService.sign(newPayload, {
      expiresIn: '15m',
    });

    return {
      ...newPayload,
      accessToken: newAccessToken,
      refreshToken: user.refreshToken,
    };
  }

  async passwordReset(
    id: string,
    updatePassword: passwordDTO,
  ): Promise<UpdatedUserResponse> {
    return await this.authModel.findById(id).then(async (existingUser) => {
      if (!existingUser) {
        throw (new ServiceException('No such User'), HttpStatus.NOT_FOUND);
      }
      const isMatchingPasswords = bcrypt.compareSync(
        updatePassword.oldPassword,
        existingUser.password,
      );
  
      if (!isMatchingPasswords) {
        throw new ServiceException(
          'Invalid Password:Check your password and try again',
          HttpStatus.BAD_REQUEST,
        );
      }
      existingUser.password = updatePassword.newPassword;
      await existingUser.save();
      const message = {
        message: 'password Updated Successfully',
      };
      return message;
    });
  }
  private async validateOTP(OTP: number) {
    const validOtp = await this.emailModel.findOne({otp: OTP})
    if(!validOtp){
      throw new ServiceException('invalid OTP'), HttpStatus.EXPECTATION_FAILED;
    }
  
    
  }
  async forgotPassword(dto:ForgotPasswordDto){
    return await this.authModel.findOne({email: dto.email}).then(async(user) =>{
      if(!user){
        throw new ServiceException('email not found'), HttpStatus.NOT_FOUND;
      }

      const token = Math.floor(1000 + Math.random() * 9000).toString();
      const subject = "Forgot Your Password? Here's How to Recover It";
      const emailTemplate = 'forgotPassword-template.ejs';
      const OTP = Math.floor(100000 + Math.random() * 90000);

      const userData:IEmail ={
        fullName : user.fullName,
        email : user.email,
        password: OTP

      }
      
      const forgotPasswordDetail ={
        userId : user._id ,
        otp: OTP,
        expiredIn: 60 *10
      }

      const newForgotPasswordModel = new this.emailModel(forgotPasswordDetail);
      const newUser = await newForgotPasswordModel.save();
      await this.emailService.sendEmail(userData, token, subject, emailTemplate);
    })



  }
}
