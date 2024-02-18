import { ClienteRepository } from '../domain/repositories/cliente.repository';
import { Cliente } from '../domain/model/cliente';
import { NotFoundException } from '../domain/exceptions/not-found.exception';
import { ClienteUseCases } from './cliente.use.cases';
import { DeleteClienteService } from '../domain/services/delete-cliente.service';

describe('ClienteUseCases', () => {
  let clienteUseCases: ClienteUseCases;
  let clienteRepository: jest.Mocked<ClienteRepository>;
  let deleteClienteService: jest.Mocked<DeleteClienteService>;

  beforeEach(() => {
    clienteRepository = {
      findAll: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
      insert: jest.fn(),
      delete: jest.fn(),
    };
    deleteClienteService = {
      deleteCpf: jest.fn(),
    };
    clienteUseCases = new ClienteUseCases(
      clienteRepository,
      deleteClienteService,
    );
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
      clienteRepository.findAll.mockResolvedValue(mockClientes);

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
      clienteRepository.findByCpf.mockResolvedValue(mockCliente);

      const result = await clienteUseCases.getClienteByCpf(mockCpf);

      expect(result).toEqual(mockCliente);
    });

    it('should throw NotFoundException if Cliente with the provided CPF is not found', async () => {
      const mockCpf = 'nonexistent-cpf';
      clienteRepository.findByCpf.mockResolvedValue(null);

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
      clienteRepository.findByEmail.mockResolvedValue(mockCliente);

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
      clienteRepository.insert.mockResolvedValue(mockCliente);

      const result = await clienteUseCases.addCliente(mockCliente);

      expect(result).toEqual(mockCliente);
    });
  });

  describe('deleteClienteByCpf', () => {
    it('should delete the cliente by cpf and call deleteCpf on service', async () => {
      const mockCliente = new Cliente(
        '12345678901',
        'Teste',
        'teste@gmail.com',
        '11123456784',
      );

      clienteRepository.findByCpf.mockResolvedValue(mockCliente);
      clienteRepository.delete.mockResolvedValue(true);

      await clienteUseCases.deleteClienteByCpf('12345678901');

      expect(clienteRepository.findByCpf).toHaveBeenCalledWith('12345678901');
      expect(clienteRepository.delete).toHaveBeenCalledWith(mockCliente);
      expect(deleteClienteService.deleteCpf).toHaveBeenCalledWith(
        '12345678901',
      );
    });

    it('should throw NotFoundException if cliente is not found', async () => {
      clienteRepository.findByCpf.mockResolvedValue(null);

      await expect(
        clienteUseCases.deleteClienteByCpf('12345678901'),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
