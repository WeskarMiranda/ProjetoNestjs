import { Injectable } from '@nestjs/common';
import { User } from './models/User';
import { InjectModel } from '@nestjs/sequelize';



@Injectable()
export class AppService {
  public constructor(
    @InjectModel(User)
    private user: typeof User
    
  ) {}

  public async selectUser(email) {
    return email
      ? this.user.findAll({
          where: {
            email,
          },
        })
      : this.user.findAll();
  }

  public createUser(user: any) {
    this.user.create(user);
  }

  public updateUser(user: any, userId: any) {
    this.user.update(user, {
      where: {
        userId,
      },
    });
  }

  public deleteUser(userId: any) {
    this.user.destroy({
      where: {
        userId,
      },
    });
  }
  
}
