import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentHistoryService } from './appointments-history.service';
import { AppointmentHistoryController } from './appointments-history.controller';
import { AppointmentHistory } from 'src/appointments-history/entities/appointments-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentHistory])],
  controllers: [AppointmentHistoryController],
  providers: [AppointmentHistoryService],
  exports: [AppointmentHistoryService],
})
export class AppointmentsHistoryModule { }
