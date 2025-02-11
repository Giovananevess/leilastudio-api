import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) { }

  findAll() {
    return this.serviceRepository.find();
  }

  findOne(id: number) {
    return this.serviceRepository.findOne({ where: { id } });
  }

  async create(service: Partial<Service>) {
    const newService = this.serviceRepository.create(service);
    return this.serviceRepository.save(newService);
  }

  async update(id: number, serviceData: Partial<Service>) {
    await this.serviceRepository.update(id, serviceData);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.serviceRepository.delete(id);
    return { message: 'Serviço removido com sucesso' };
  }
}
