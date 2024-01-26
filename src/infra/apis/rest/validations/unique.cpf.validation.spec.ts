import { Test, TestingModule } from '@nestjs/testing';
import { UniqueCpfValidation } from './unique.cpf.validation';
import { ClienteUseCases } from '../../../../usecases/cliente.use.cases';
import { UseCaseProxy } from '../../../usecases-proxy/use-case-proxy';
import { UseCasesProxyModule } from '../../../usecases-proxy/use-cases-proxy.module';
import { NotFoundException } from '../../../../domain/exceptions/not-found.exception';
import { Cliente } from '../../../../domain/model/cliente';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

jest.mock('../../../../usecases/cliente.use.cases');

describe('UniqueCpfValidation', () => {
  let uniqueCpfValidation: UniqueCpfValidation;
  let mockUseCaseProxy: UseCaseProxy<ClienteUseCases>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UseCasesProxyModule.register()],
      providers: [UniqueCpfValidation],
    }).compile();

    uniqueCpfValidation = module.get<UniqueCpfValidation>(UniqueCpfValidation);

    mockUseCaseProxy = module.get<UseCaseProxy<ClienteUseCases>>(
      UseCasesProxyModule.CLIENTE_USECASES_PROXY,
    );
  });

  it('should be defined', () => {
    expect(uniqueCpfValidation).toBeDefined();
  });

  it('should validate CPF successfully', async () => {
    const mockCpf = '12345678901';

    jest
      .spyOn(mockUseCaseProxy.getInstance(), 'getClienteByCpf')
      .mockResolvedValue(null);

    const result = await uniqueCpfValidation.validate(mockCpf);

    expect(result).toBeTruthy();
    expect(mockUseCaseProxy.getInstance().getClienteByCpf).toHaveBeenCalledWith(
      mockCpf,
    );
  });

  it('should fail validation for existing CPF', async () => {
    const mockCpf = 'existing-cpf';

    jest
      .spyOn(mockUseCaseProxy.getInstance(), 'getClienteByCpf')
      .mockResolvedValue(
        new Cliente(
          '12345678901',
          'Teste',
          'existing@example.com',
          '(88) 88888-8888',
        ),
      );

    const result = await uniqueCpfValidation.validate(mockCpf);

    expect(result).toBeFalsy();
    expect(mockUseCaseProxy.getInstance().getClienteByCpf).toHaveBeenCalledWith(
      mockCpf,
    );
  });

  it('should pass validation for non-existing CPF', async () => {
    const mockCpf = 'non-existing-cpf';

    jest
      .spyOn(mockUseCaseProxy.getInstance(), 'getClienteByCpf')
      .mockRejectedValue(
        new NotFoundException('O CPF do cliente fornecido não foi encontrado'),
      );

    const result = await uniqueCpfValidation.validate(mockCpf);

    expect(result).toBeTruthy();
    expect(mockUseCaseProxy.getInstance().getClienteByCpf).toHaveBeenCalledWith(
      mockCpf,
    );
  });

  it('should log unexpected errors and return false', async () => {
    const mockCpf = 'unexpected-error-cpf';

    jest
      .spyOn(mockUseCaseProxy.getInstance(), 'getClienteByCpf')
      .mockRejectedValue(new Error('Unexpected error'));

    const result = await uniqueCpfValidation.validate(mockCpf);

    expect(result).toBeFalsy();
    expect(mockUseCaseProxy.getInstance().getClienteByCpf).toHaveBeenCalledWith(
      mockCpf,
    );
  });

  it('should have a default error message', () => {
    const defaultMessage = uniqueCpfValidation.defaultMessage({
      property: 'cpf',
    } as ValidationArguments);

    expect(defaultMessage).toEqual(
      expect.stringContaining('O campo cpf já foi cadastrado'),
    );
  });
});
