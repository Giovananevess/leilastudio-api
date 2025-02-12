import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';
import { Service } from './service/entities/service.entity';
import { User } from './user/entities/user.entity';
import { Schedule } from './schedule/entities/schedule.entity';
import { AppointmentHistory } from './appointments-history/entities/appointments-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'agro_maintenance',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Schedule, Service, AppointmentHistory]),
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }
