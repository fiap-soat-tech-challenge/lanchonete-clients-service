import { Module } from '@nestjs/common';
import { ClienteUseCases } from '../../usecases/cliente.use.cases';
import { ClienteRepositoryImpl } from '../repositories/cliente.repository.impl';
import { ClienteRepository } from '../../domain/repositories/cliente.repository';
import { RepositoriesModule } from '../repositories/repositories.module';

const createClienteUseCase = (clienteRepository: ClienteRepository) => {
  return new ClienteUseCases(clienteRepository);
};

@Module({
  imports: [RepositoriesModule],
  providers: [
    {
      provide: ClienteUseCases,
      useFactory: createClienteUseCase,
      inject: [ClienteRepositoryImpl],
    },
  ],
  exports: [ClienteUseCases],
})
export class UseCasesProxyModule {}
