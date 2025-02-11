import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentsHistoryDto } from './create-appointments-history.dto';

export class UpdateAppointmentsHistoryDto extends PartialType(CreateAppointmentsHistoryDto) {}
