import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { ClientesController } from './controllers/clientes.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { UniqueCpfValidation } from './validations/unique.cpf.validation';
import { UniqueEmailValidation } from './validations/unique.email.validation';
import { LoginController } from './controllers/login.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  providers: [UniqueCpfValidation, UniqueEmailValidation],
  controllers: [HomeController, LoginController, ClientesController],
})
export class RestModule {}
