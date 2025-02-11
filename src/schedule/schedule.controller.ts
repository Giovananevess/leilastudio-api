import { Controller, Get, Post, Body, Param, Res, HttpStatus, Delete, ValidationPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Response } from 'express';


@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Post()
  async create(@Body(new ValidationPipe()) createScheduleDto: CreateScheduleDto, @Res() res: Response) {
    const schedule = await this.scheduleService.create(createScheduleDto);
    return res.status(HttpStatus.CREATED).json(schedule);
  }

  @Get('/user/:id')
  async findByUser(@Param('id') id: number, @Res() res: Response) {
    const schedules = await this.scheduleService.findByUser(id);
    return res.status(HttpStatus.OK).json(schedules);
  }


  @Get()
  async findAll(@Res() res: Response) {
    const schedules = await this.scheduleService.findAll();
    return res.status(HttpStatus.OK).json(schedules);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const schedule = await this.scheduleService.findOne(id);
    return res.status(HttpStatus.OK).json(schedule);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.scheduleService.remove(id);
    return res.status(HttpStatus.OK).json({ message: 'Agendamento removido com sucesso' });
  }
}