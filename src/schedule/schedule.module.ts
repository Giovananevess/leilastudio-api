import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity'; // 🔹 Adicionado
import { UserModule } from 'src/user/user.module';
import { AppointmentsHistoryModule } from 'src/appointments-history/appointments-history.module';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, User, Service]), // 🔹 Adicione o Service aqui!
    forwardRef(() => UserModule),
    AppointmentsHistoryModule,
    ServiceModule, // 🔹 Certifique-se de importar o ServiceModule
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule { }
