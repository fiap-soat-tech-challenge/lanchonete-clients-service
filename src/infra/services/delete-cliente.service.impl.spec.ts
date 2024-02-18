import { Test, TestingModule } from '@nestjs/testing';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DeleteClienteServiceImpl } from './delete-cliente.service.impl';

class MockAmqpConnection {
  async publish(
    exchange: string,
    routingKey: string,
    data: any,
  ): Promise<void> {
    console.log(exchange, routingKey, data);
  }
}

describe('DeleteClienteServiceImpl', () => {
  let service: DeleteClienteServiceImpl;
  let amqpConnection: AmqpConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClienteServiceImpl,
        { provide: AmqpConnection, useClass: MockAmqpConnection },
      ],
    }).compile();

    service = module.get<DeleteClienteServiceImpl>(DeleteClienteServiceImpl);
    amqpConnection = module.get<AmqpConnection>(AmqpConnection);
  });

  const cpf: string = '12345678901';

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendOrderToPayment', () => {
    it('should send order to payment queue', async () => {
      const publishSpy = jest.spyOn(amqpConnection, 'publish');

      await service.deleteCpf(cpf);

      expect(publishSpy).toHaveBeenCalledWith('delete_cliente', '', cpf);
    });
  });
});
