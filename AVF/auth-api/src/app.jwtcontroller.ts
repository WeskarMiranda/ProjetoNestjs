import {
  Controller,
  Query,
  Post,
  Get,
  Headers,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/User';
import { InjectModel } from '@nestjs/sequelize';

@Controller('token')
export class AppJwtController {
  public constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User)
    private readonly user: typeof User,
  ) {}

  @Get()
  public async verificaLogin(
    @Query('user') userId, 
    @Headers('authorization') token
  ): Promise<object> {

    if (!token) {
      return {auth:false}
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);

      if (decoded.userId !== parseInt(userId)) {
        return {auth:false}
      }

      return {auth: true};
    } catch (error) {
      return {auth:false}
    }
  }

  @Post()
  public async login(
    @Query('email') email,
    @Query('password') password,
  ): Promise<object> {
    const user = await this.user.findOne({
      where: {
        email,
        password: password,
      },
    });

    if (!user) {
      return { token: false };
    }

    const payload = {
      userId: user.userId,  
      name: user.dataValues.name,
      email: user.dataValues.email,
      password: user.dataValues.password
    };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}


