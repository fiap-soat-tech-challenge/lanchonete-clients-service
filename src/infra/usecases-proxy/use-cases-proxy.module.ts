import { Module } from '@nestjs/common';
import { ClienteUseCases } from '../../usecases/cliente.use.cases';
import { ClienteRepositoryImpl } from '../repositories/cliente.repository.impl';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DeleteClienteService } from '../../domain/services/delete-cliente.service';
import { ServicesModule } from '../services/services.module';
import { DeleteClienteServiceImpl } from '../services/delete-cliente.service.impl';

const createClienteUseCase = (
  clienteRepository: ClienteRepository,
  deleteClienteService: DeleteClienteService,
) => {
  return new ClienteUseCases(clienteRepository, deleteClienteService);
};

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    {
      provide: ClienteUseCases,
      useFactory: createClienteUseCase,
      inject: [ClienteRepositoryImpl, DeleteClienteServiceImpl],
    },
  ],
  exports: [ClienteUseCases],
})
export class UseCasesProxyModule {}
