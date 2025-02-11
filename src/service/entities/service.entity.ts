import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { AppointmentHistory } from 'src/appointments-history/entities/appointments-history.entity';

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    duration: number;

    @Column({
        type: 'decimal', precision: 10, scale: 2, transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    price: number;


    @OneToMany(() => Schedule, (schedule) => schedule.service)
    schedules: Schedule[];

    @OneToMany(() => AppointmentHistory, (history) => history.service)
    history: AppointmentHistory[];
}