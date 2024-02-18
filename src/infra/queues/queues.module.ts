import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClienteForDeleteClientFactory } from './cliente-for-delete-client-factory';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: ClienteForDeleteClientFactory,
    }),
    QueuesModule,
  ],
  exports: [RabbitMQModule],
})
export class QueuesModule {}
