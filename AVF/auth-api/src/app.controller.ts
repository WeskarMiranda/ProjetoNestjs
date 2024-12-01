import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Delete,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/User';
import { InjectModel } from '@nestjs/sequelize';
import authJwt from './helper/authJwt';
import { UserResponse } from './app.userresponse';

@Controller('user')
export class AppController {
  public constructor(
    @InjectModel(User) 
    private readonly user: typeof User,
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getUsers(@Query('email') email): Promise<UserResponse[]> {
    const users = await this.appService.selectUser(email);
  
    return users.map(user => ({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password 
    }));
  
    
    
  }

  

  

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createUser(
    @Body() user,
  ): object {
    this.appService.createUser(user);
    return { message: 'ok', user };
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  public updateUser(
    @Body() user,
    @Query('userId') userId,
    @Headers('authorization') token,
  ): object {
    authJwt({
      jwtService: this.jwtService,
      userService: this.user,
      token,
    });

    this.appService.updateUser(user, userId);
    return { message: 'ok', user };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  public deleteUser(
    @Query('userId') userId,
    @Headers('authorization') token,
  ): object {
    authJwt({
      jwtService: this.jwtService,
      userService: this.user,
      token,
    });

    this.appService.deleteUser(userId);
    return { message: 'ok' };
  }

  
}
