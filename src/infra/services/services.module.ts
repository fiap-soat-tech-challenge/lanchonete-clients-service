import { Module } from '@nestjs/common';
import { QueuesModule } from '../queues/queues.module';
import { DeleteClienteServiceImpl } from './delete-cliente.service.impl';

@Module({
  imports: [QueuesModule],
  providers: [DeleteClienteServiceImpl],
  exports: [DeleteClienteServiceImpl],
})
export class ServicesModule {}
