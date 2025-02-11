export class CreateAppointmentsHistoryDto {
    scheduleId: number; // ID do agendamento
    userId: number; // ID do usuário
    serviceId: number; // ID do serviço
    appointmentDate: Date; // Data do agendamento
    status: string; // Status do agendamento
    changedBy: string; // Quem fez a alteração
}