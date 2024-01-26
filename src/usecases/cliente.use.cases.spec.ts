import { ClienteRepository } from '../domain/repositories/cliente.repository';
import { Cliente } from '../domain/model/cliente';
import { NotFoundException } from '../domain/exceptions/not-found.exception';
import { ClienteUseCases } from './cliente.use.cases';

describe('ClienteUseCases', () => {
  let clienteUseCases: ClienteUseCases;
  let clienteRepositoryMock: jest.Mocked<ClienteRepository>;

  beforeEach(() => {
    clienteRepositoryMock = {
      findAll: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      insert: jest.fn(),
    };
    clienteUseCases = new ClienteUseCases(clienteRepositoryMock);
  });

  describe('getAllClientes', () => {
    it('should return an array of Clientes', async () => {
      const mockClientes: Cliente[] = [
        new Cliente('12345678901', 'Teste', 'teste@gmail.com', '11123456784'),
        new Cliente(
          '12345678902',
          'Teste 2',
          'teste2@gmail.com',
          '11123456789',
        ),
      ];
      clienteRepositoryMock.findAll.mockResolvedValue(mockClientes);

      const result = await clienteUseCases.getAllClientes();

      expect(result).toEqual(mockClientes);
    });
  });

  describe('getClienteByCpf', () => {
    it('should return a Cliente by CPF', async () => {
      const mockCliente = new Cliente(
        '12345678901',
        'Teste',
        'teste@gmail.com',
        '11123456784',
      );
      const mockCpf = '12345678901';
      clienteRepositoryMock.findByCpf.mockResolvedValue(mockCliente);

      const result = await clienteUseCases.getClienteByCpf(mockCpf);

      expect(result).toEqual(mockCliente);
    });

    it('should throw NotFoundException if Cliente with the provided CPF is not found', async () => {
      const mockCpf = 'nonexistent-cpf';
      clienteRepositoryMock.findByCpf.mockResolvedValue(null);

      await expect(
        clienteUseCases.getClienteByCpf(mockCpf),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getClienteByEmail', () => {
    it('should return a Cliente by email', async () => {
      const mockCliente = new Cliente(
        '12345678901',
        'Teste',
        'teste@gmail.com',
        '11123456784',
      );
      const mockEmail = 'test@example.com';
      clienteRepositoryMock.findByEmail.mockResolvedValue(mockCliente);

      const result = await clienteUseCases.getClienteByEmail(mockEmail);

      expect(result).toEqual(mockCliente);
    });
  });

  describe('addCliente', () => {
    it('should add a Cliente and return the added Cliente', async () => {
      const mockCliente = new Cliente(
        '12345678901',
        'Teste',
        'teste@gmail.com',
        '11123456784',
      );
      clienteRepositoryMock.insert.mockResolvedValue(mockCliente);

      const result = await clienteUseCases.addCliente(mockCliente);

      expect(result).toEqual(mockCliente);
    });
  });
});
