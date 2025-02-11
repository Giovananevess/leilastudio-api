import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentHistory } from 'src/appointments-history/entities/appointments-history.entity';
import { CreateAppointmentsHistoryDto } from './dto/create-appointments-history.dto';

@Injectable()
export class AppointmentHistoryService {
  constructor(
    @InjectRepository(AppointmentHistory)
    private readonly historyRepository: Repository<AppointmentHistory>,
  ) { }

  async create(createHistoryDto: CreateAppointmentsHistoryDto): Promise<AppointmentHistory> {
    const history = this.historyRepository.create(createHistoryDto);
    return await this.historyRepository.save(history);
  }

  async findBySchedule(scheduleId: number): Promise<AppointmentHistory[]> {
    return await this.historyRepository.find({
      where: { schedule: { id: scheduleId } },
      relations: ['user', 'service'],
    });
  }
}