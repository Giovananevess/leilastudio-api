import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { UserModule } from 'src/user/user.module';
import { AppointmentsHistoryModule } from 'src/appointments-history/appointments-history.module';
import { ServiceService } from 'src/service/service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, User, Service]),
    UserModule,
    AppointmentsHistoryModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ServiceService],
  exports: [ScheduleService],
})
export class ScheduleModule { }
