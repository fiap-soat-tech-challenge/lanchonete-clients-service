import { ClientePresenter } from './cliente.presenter';
import { Cliente } from '../../../../domain/model/cliente';

describe('ClientePresenter', () => {
  it('should create a ClientePresenter instance with valid Cliente data using constructor', () => {
    const cliente: Cliente = new Cliente(
      1,
      '12345678901',
      'John Doe',
      'john.doe@example.com',
      '123456789',
      new Date('2022-01-01T12:00:00Z'),
    );

    const clientePresenter = new ClientePresenter(cliente);

    expect(clientePresenter.id).toBe(cliente.id);
    expect(clientePresenter.cpf).toBe(cliente.cpf);
    expect(clientePresenter.nome).toBe(cliente.nome);
    expect(clientePresenter.email).toBe(cliente.email);
    expect(clientePresenter.telefone).toBe(cliente.telefone);
    expect(clientePresenter.dataHoraCadastro).toBe(cliente.dataHoraCadastro);
  });
});
