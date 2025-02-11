import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { AppointmentHistory } from 'src/appointments-history/entities/appointments-history.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Schedule, (schedule) => schedule.user)
    schedules: Schedule[];

    @OneToMany(() => AppointmentHistory, (history) => history.user)
    history: AppointmentHistory[];
}