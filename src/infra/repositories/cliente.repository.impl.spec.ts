import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClienteRepositoryImpl } from './cliente.repository.impl';
import { ClienteEntity } from '../entities/cliente.entity';
import { ClienteConverter } from '../shared/cliente.converter';
import { Cliente } from '../../domain/model/cliente';

describe('ClienteRepositoryImpl', () => {
  let clienteRepository: ClienteRepositoryImpl;

  const mockClienteEntityRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteRepositoryImpl,
        {
          provide: getRepositoryToken(ClienteEntity),
          useValue: mockClienteEntityRepository,
        },
      ],
    }).compile();

    clienteRepository = module.get<ClienteRepositoryImpl>(
      ClienteRepositoryImpl,
    );
  });

  describe('findAll', () => {
    it('should return an array of Cliente entities', async () => {
      const mockClienteEntities = [
        new ClienteEntity(
          '12345678901',
          'Teste',
          'teste@gmail.com',
          '11123456784',
        ),
        new ClienteEntity(
          '12345678902',
          'Teste 2',
          'teste2@gmail.com',
          '11123456789',
        ),
      ];
      mockClienteEntityRepository.find.mockResolvedValue(mockClienteEntities);

      const result = await clienteRepository.findAll();

      expect(result).toEqual(
        mockClienteEntities.map(ClienteConverter.toCliente),
      );
    });
  });

  describe('findByCpf', () => {
    it('should return a Cliente entity based on CPF', async () => {
      const cpf = '12345678901';
      const mockClienteEntity = new ClienteEntity(
        '12345678901',
        'Teste',
        'teste@gmail.com',
        '11123456784',
      );
      mockClienteEntityRepository.findOneBy.mockResolvedValue(
        mockClienteEntity,
      );

      const result = await clienteRepository.findByCpf(cpf);

      expect(result).toEqual(ClienteConverter.toCliente(mockClienteEntity));
    });

    it('should return null if no Cliente entity is found for the given CPF', async () => {
      const cpf = 'nonexistent-cpf';
      mockClienteEntityRepository.findOneBy.mockResolvedValue(null);

      const result = await clienteRepository.findByCpf(cpf);

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a Cliente entity based on email', async () => {
      const email = 'test@example.com';
      const mockClienteEntity = new ClienteEntity(
        '12345678901',
        'Teste',
        email,
        '11123456784',
      );
      mockClienteEntityRepository.findOneBy.mockResolvedValue(
        mockClienteEntity,
      );

      const result = await clienteRepository.findByEmail(email);

      expect(result).toEqual(ClienteConverter.toCliente(mockClienteEntity));
    });

    it('should return null if no Cliente entity is found for the given email', async () => {
      const email = 'nonexistent-email@example.com';
      mockClienteEntityRepository.findOneBy.mockResolvedValue(null);

      const result = await clienteRepository.findByEmail(email);

      expect(result).toBeNull();
    });
  });

  describe('insert', () => {
    it('should insert a Cliente entity and return the inserted entity', async () => {
      const mockCliente = new Cliente(
        '12345678901',
        'Teste',
        'test@example.com',
        '11123456784',
      );
      const mockClienteEntity = new ClienteEntity(
        '12345678901',
        'Teste',
        'test@example.com',
        '11123456784',
      );
      mockClienteEntityRepository.save.mockResolvedValue(mockClienteEntity);

      const result = await clienteRepository.insert(mockCliente);

      expect(result).toEqual(ClienteConverter.toCliente(mockClienteEntity));
    });
  });
});
