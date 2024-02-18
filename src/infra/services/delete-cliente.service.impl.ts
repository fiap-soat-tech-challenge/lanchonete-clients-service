import { Injectable, Logger } from '@nestjs/common';
import { DeleteClienteService } from '../../domain/services/delete-cliente.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class DeleteClienteServiceImpl implements DeleteClienteService {
  private readonly logger = new Logger(DeleteClienteServiceImpl.name);
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async deleteCpf(cpf: string): Promise<void> {
    this.logger.log(`[Sender] Enviando CPF para a filas de exclusão`);
    await this.amqpConnection.publish('delete_cliente', '', cpf);
  }
}
