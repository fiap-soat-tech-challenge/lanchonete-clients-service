import { Module } from '@nestjs/common';
import { ClientesController } from './controllers/clientes.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { UniqueCpfValidation } from './validations/unique.cpf.validation';
import { UniqueEmailValidation } from './validations/unique.email.validation';
import { LoginController } from './controllers/login.controller';

@Module({
  imports: [UseCasesProxyModule],
  providers: [UniqueCpfValidation, UniqueEmailValidation],
  controllers: [LoginController, ClientesController],
})
export class RestModule {}
