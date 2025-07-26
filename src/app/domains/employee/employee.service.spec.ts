import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  const mockEmployees: { name: string; cpf: string; hiredAt: string }[] = [
    {
      name: 'Maria',
      cpf: '123.456.789-00', 
      hiredAt: '2024-01-01',
    },
    {
      name: 'João',
      cpf: '987.654.321-00',
      hiredAt: '2024-02-01',
    },
  ];
  const mockInsertMany = jest.fn().mockResolvedValue(mockEmployees);

  const mockEmployeeModel = {
    insertMany: mockInsertMany,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getModelToken('Employee'),
          useValue: mockEmployeeModel,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should register multiple employees', async () => {
    const result = await service.register(mockEmployees);
    expect(result).toEqual(mockEmployees);
    expect(mockInsertMany).toHaveBeenCalledWith(mockEmployees);
  });
});
