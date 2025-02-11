import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsHistoryController } from './appointments-history.controller';
import { AppointmentsHistoryService } from './appointments-history.service';

describe('AppointmentsHistoryController', () => {
  let controller: AppointmentsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsHistoryController],
      providers: [AppointmentsHistoryService],
    }).compile();

    controller = module.get<AppointmentsHistoryController>(AppointmentsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
