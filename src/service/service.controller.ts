import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.serviceService.findOne(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() service: Partial<Service>) {
    return this.serviceService.update(id, service);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.serviceService.remove(id);
  }
}
