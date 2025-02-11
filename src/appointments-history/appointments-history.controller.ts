import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { AppointmentHistoryService } from './appointments-history.service';
import { CreateAppointmentsHistoryDto } from './dto/create-appointments-history.dto';
import { Response } from 'express';

@Controller('appointment-history')
export class AppointmentHistoryController {
  constructor(private readonly historyService: AppointmentHistoryService) { }

  @Post()
  async create(@Body() createHistoryDto: CreateAppointmentsHistoryDto, @Res() res: Response) {
    const history = await this.historyService.create(createHistoryDto);
    return res.status(HttpStatus.CREATED).json(history);
  }

  @Get(':scheduleId')
  async findBySchedule(@Param('scheduleId') scheduleId: number, @Res() res: Response) {
    const history = await this.historyService.findBySchedule(scheduleId);
    return res.status(HttpStatus.OK).json(history);
  }
}