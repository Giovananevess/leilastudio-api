import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { AppointmentHistory } from 'src/appointments-history/entities/appointments-history.entity';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.schedules)
    user: User;

    @ManyToOne(() => Service, (service) => service.schedules)
    service: Service;

    @Column('datetime')
    appointmentDate: Date;

    @Column({ default: 'Pendente' })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => AppointmentHistory, (history) => history.schedule)
    history: AppointmentHistory[];
}