import { UniqueCpfValidation } from './unique.cpf.validation';
import { ClienteUseCases } from '../../../../usecases/cliente.use.cases';
import { NotFoundException } from '../../../../domain/exceptions/not-found.exception';
import { Cliente } from '../../../../domain/model/cliente';
import { instance, mock, when } from 'ts-mockito';
import { ValidationArguments } from 'class-validator';

describe('UniqueCpfValidation', () => {
  let validation: UniqueCpfValidation;
  let clienteUseCasesMock: ClienteUseCases;

  beforeEach(() => {
    clienteUseCasesMock = mock(ClienteUseCases);
    validation = new UniqueCpfValidation(instance(clienteUseCasesMock));
  });

  it('should be defined', () => {
    expect(validation).toBeDefined();
  });

  it('should return true if cpf is unique', async () => {
    const cpf = '12345678901';
    when(clienteUseCasesMock.getClienteByCpf(cpf)).thenResolve(null);

    const result = await validation.validate(cpf);
    expect(result).toBe(true);
  });

  it('should return false if cpf is not unique', async () => {
    const cpf = '12345678901';
    when(clienteUseCasesMock.getClienteByCpf(cpf)).thenResolve(
      new Cliente(
        '12345678901',
        'Teste',
        'existing@example.com',
        '(88) 88888-8888',
      ),
    );

    const result = await validation.validate(cpf);
    expect(result).toBe(false);
  });

  it('should return true if NotFoundException is thrown', async () => {
    const cpf = '12345678901';
    when(clienteUseCasesMock.getClienteByCpf(cpf)).thenReject(
      new NotFoundException('O CPF do cliente fornecido não foi encontrado'),
    );

    const result = await validation.validate(cpf);
    expect(result).toBe(true);
  });

  it('should return false on unexpected error', async () => {
    const cpf = '12345678901';
    when(clienteUseCasesMock.getClienteByCpf(cpf)).thenReject(
      new Error('Unexpected error'),
    );

    const result = await validation.validate(cpf);
    expect(result).toBe(false);
  });

  it('should have a default error message', () => {
    const defaultMessage = validation.defaultMessage({
      property: 'cpf',
    } as ValidationArguments);

    expect(defaultMessage).toEqual(
      expect.stringContaining('O campo cpf já foi cadastrado'),
    );
  });
});
