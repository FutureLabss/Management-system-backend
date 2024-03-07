import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../model/auth.model';
import mongoose from 'mongoose';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { compareSync } from 'bcrypt';
import { LoginDto } from '../schema/dto/login.dto';
import { AuthResponse, AuthUser } from '../schema/entity/login.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.authModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new ServiceException(
        'Invalid Login Credentials: Re-enter a valid Email',
        HttpStatus.BAD_REQUEST,
      );
    }
    const correctPassword = compareSync(loginDto.password, user.password);
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
      role:user.role
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      ...payload,
      token: accessToken,
    };
  }
}
