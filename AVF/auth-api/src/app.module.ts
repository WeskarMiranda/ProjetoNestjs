import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './models/User';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AppJwtController } from './app.jwtcontroller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'MySecretKey',
      signOptions: { expiresIn: '1000s' },
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'wkr2003',
      database: 'avfbd',
      models: [User],
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AppController, AppJwtController],
  providers: [AppService],
})
export class AppModule {}
