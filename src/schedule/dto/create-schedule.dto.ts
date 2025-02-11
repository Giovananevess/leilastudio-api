import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateScheduleDto {
    @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
    @IsNumber()
    userId: number;

    @IsNotEmpty({ message: 'O ID do serviço é obrigatório' })
    @IsNumber()
    serviceId: number;

    @IsNotEmpty({ message: 'A data do agendamento é obrigatória' })
    @IsDateString({}, { message: 'A data deve estar no formato correto (ISO 8601)' })
    appointmentDate: Date;
}
