import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Schedule } from '../schedule/entities/schedule.entity';
import { AppointmentHistory } from '../appointments-history/entities/appointments-history.entity';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Schedule, AppointmentHistory]),
    forwardRef(() => ScheduleModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
