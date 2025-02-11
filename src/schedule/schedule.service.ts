import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { AppointmentHistoryService } from 'src/appointments-history/appointments-history.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    private readonly historyService: AppointmentHistoryService,
  ) { }

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const { userId, serviceId, appointmentDate } = createScheduleDto;

    // Buscar usuário no banco
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);

    // Buscar serviço no banco
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) throw new NotFoundException(`Serviço com ID ${serviceId} não encontrado`);

    // Criar e salvar o agendamento
    const schedule = this.scheduleRepository.create({
      user,
      service,
      appointmentDate,
      status: 'Pendente',
    });

    const savedSchedule = await this.scheduleRepository.save(schedule);

    // Registrar no histórico
    await this.historyService.create({
      scheduleId: savedSchedule.id,
      userId: savedSchedule.user.id,
      serviceId: savedSchedule.service.id,
      appointmentDate: savedSchedule.appointmentDate,
      status: savedSchedule.status,
      changedBy: 'Cliente',
    });

    return savedSchedule;
  }

  async findByUser(userId: number): Promise<Schedule[]> {
    return await this.scheduleRepository.find({
      where: { user: { id: userId } },
      relations: ['service', 'user'],
    });
  }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleRepository.find({ relations: ['user', 'service'] });
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({ where: { id }, relations: ['user', 'service'] });
    if (!schedule) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }
    return schedule;
  }

  async remove(id: number): Promise<void> {
    await this.scheduleRepository.delete(id);
  }
}
