import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsHistoryService } from './appointments-history.service';

describe('AppointmentsHistoryService', () => {
  let service: AppointmentsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsHistoryService],
    }).compile();

    service = module.get<AppointmentsHistoryService>(AppointmentsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
