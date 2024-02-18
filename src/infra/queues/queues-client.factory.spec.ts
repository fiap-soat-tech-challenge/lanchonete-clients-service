import { ConfigService } from '@nestjs/config';
import { QueuesClientFactory } from './queues-client.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { instance, mock, when } from 'ts-mockito';

describe('QueuesClientFactory', () => {
  let queuesClientFactory: QueuesClientFactory;
  let configService: ConfigService;

  beforeEach(async () => {
    process.env.QUEUE_USER = 'user';
    process.env.QUEUE_PASSWORD = 'password';
    process.env.QUEUE_HOST = 'localhost';
    process.env.QUEUE_PORT = '5672';

    configService = mock(ConfigService);
    when(configService.get('QUEUE_USER')).thenReturn(process.env.QUEUE_USER);
    when(configService.get('QUEUE_PASSWORD')).thenReturn(
      process.env.QUEUE_PASSWORD,
    );
    when(configService.get('QUEUE_HOST')).thenReturn(process.env.QUEUE_HOST);
    when(configService.get('QUEUE_PORT')).thenReturn(
      parseInt(process.env.QUEUE_PORT),
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueuesClientFactory,
        { provide: ConfigService, useValue: instance(configService) },
      ],
    }).compile();

    queuesClientFactory = module.get<QueuesClientFactory>(QueuesClientFactory);
  });

  it('should be defined', () => {
    expect(queuesClientFactory).toBeDefined();
  });

  it('should create module config', async () => {
    const result = await queuesClientFactory.createModuleConfig();

    expect(result).toEqual({
      name: 'RabbitMQ Server',
      uri: `amqp://${process.env.QUEUE_USER}:${process.env.QUEUE_PASSWORD}@${process.env.QUEUE_HOST}:${process.env.QUEUE_PORT}`,
      exchanges: [
        {
          name: 'delete_cliente',
          type: 'fanout',
        },
      ],
      queues: [
        {
          name: 'delete_cliente_orders',
          options: {
            durable: true,
          },
          exchange: 'delete_cliente',
          routingKey: '',
        },
        {
          name: 'delete_cliente_production',
          options: {
            durable: true,
          },
          exchange: 'delete_cliente',
          routingKey: '',
        },
      ],
    });
  });
});
