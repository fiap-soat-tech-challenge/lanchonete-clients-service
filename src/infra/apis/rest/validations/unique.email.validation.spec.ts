import { ClienteUseCases } from '../../../../usecases/cliente.use.cases';
import { instance, mock, when } from 'ts-mockito';
import { UniqueEmailValidation } from './unique.email.validation';
import { Cliente } from '../../../../domain/model/cliente';
import { ValidationArguments } from 'class-validator';

describe('UniqueEmailValidation', () => {
  let validation: UniqueEmailValidation;
  let clienteUseCasesMock: ClienteUseCases;

  beforeEach(() => {
    clienteUseCasesMock = mock(ClienteUseCases);
    validation = new UniqueEmailValidation(instance(clienteUseCasesMock));
  });

  it('should be defined', () => {
    expect(validation).toBeDefined();
  });

  it('should return true if email is unique', async () => {
    const email = 'test@example.com';
    when(clienteUseCasesMock.getClienteByEmail(email)).thenResolve(null);

    const result = await validation.validate(email);
    expect(result).toBe(true);
  });

  it('should return false if email is not unique', async () => {
    const email = 'test@example.com';
    when(clienteUseCasesMock.getClienteByEmail(email)).thenResolve(
      new Cliente(
        '12345678901',
        'Teste',
        'existing@example.com',
        '(88) 88888-8888',
      ),
    );

    const result = await validation.validate(email);
    expect(result).toBe(false);
  });

  it('should have a default error message', () => {
    const defaultMessage = validation.defaultMessage({
      property: 'email',
    } as ValidationArguments);

    expect(defaultMessage).toEqual(
      expect.stringContaining('O campo email já foi cadastrado'),
    );
  });
});
