import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './database.config.service';

describe('DatabaseConfigService', () => {
  let service: DatabaseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseConfigService>(DatabaseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTypeOrmOptions', () => {
    it('should return test configuration for NODE_ENV=test', () => {
      process.env.NODE_ENV = 'test';

      const result = service.createTypeOrmOptions();

      expect(result.type).toEqual('sqlite');
      expect(result.database).toEqual(':memory:');
      expect(result.synchronize).toEqual(true);
    });

    it('should return production configuration for NODE_ENV=production', () => {
      process.env.NODE_ENV = 'production';

      jest
        .spyOn(service['configService'], 'get')
        .mockReturnValueOnce('production-value');

      const result = service.createTypeOrmOptions();

      expect(result.type).toEqual('postgres');
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });
});
