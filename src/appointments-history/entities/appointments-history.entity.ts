import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';


@Entity()
export class AppointmentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Schedule, (schedule) => schedule.history)
    schedule: Schedule;

    @ManyToOne(() => User, (user) => user.history)
    user: User;

    @ManyToOne(() => Service, (service) => service.history)
    service: Service;

    @Column('datetime')
    appointmentDate: Date;

    @Column()
    status: string;

    @Column({ nullable: true })
    changedBy: string; // Quem fez a alteração (cliente ou administrador)

    @CreateDateColumn()
    changedAt: Date; // Data da alteração
}