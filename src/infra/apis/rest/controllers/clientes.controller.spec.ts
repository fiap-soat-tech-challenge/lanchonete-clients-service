import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClienteUseCases } from '../../../../usecases/cliente.use.cases';
import { ClienteDto } from '../dtos/cliente.dto';
import { ClientePresenter } from '../presenters/cliente.presenter';
import { anyOfClass, anything, instance, mock, when } from 'ts-mockito';
import { Cliente } from '../../../../domain/model/cliente';
import any = jasmine.any;

describe('ClientesController', () => {
  let controller: ClientesController;
  let clienteUseCasesMock: ClienteUseCases;

  beforeEach(async () => {
    clienteUseCasesMock = mock(ClienteUseCases);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        {
          provide: ClienteUseCases,
          useValue: instance(clienteUseCasesMock),
        },
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
  });

  describe('listar', () => {
    it('should return an array of ClientePresenter', async () => {
      const mockClientes = [
        new Cliente(
          1,
          '12345678901',
          'John Doe',
          'john.doe@example.com',
          '123456789',
          new Date('2022-01-01T12:00:00Z'),
        ),
      ];
      when(clienteUseCasesMock.getAllClientes()).thenResolve(mockClientes);

      const result = await controller.listar();
      expect(result).toEqual(
        mockClientes.map((cliente) => new ClientePresenter(cliente)),
      );
    });
  });

  describe('cadastrar', () => {
    it('should return ClientePresenter for a valid clienteDto', async () => {
      const clienteDto = new ClienteDto();
      clienteDto.cpf = '12345678901';
      clienteDto.nome = 'John Doe';
      clienteDto.email = 'john.doe@example.com';
      clienteDto.telefone = '123456789';

      const cliente = new Cliente(
        1,
        clienteDto.cpf,
        clienteDto.nome,
        clienteDto.email,
        clienteDto.telefone,
        new Date('2022-01-01T12:00:00Z'),
      );

      when(clienteUseCasesMock.addCliente(anyOfClass(Cliente))).thenResolve(
        cliente,
      );

      const result = await controller.cadastrar(clienteDto);
      expect(result).toEqual(new ClientePresenter(cliente));
    });
  });

  describe('buscarPorCpf', () => {
    it('should return the ClientePresenter for a valid CPF', async () => {
      const cpf = '12345678901';
      const mockCliente = new Cliente(
        1,
        '12345678901',
        'John Doe',
        'john.doe@example.com',
        '123456789',
        new Date('2022-01-01T12:00:00Z'),
      );
      when(clienteUseCasesMock.getClienteByCpf(cpf)).thenResolve(mockCliente);

      const result = await controller.buscarPorCpf(cpf);
      expect(result).toEqual(new ClientePresenter(mockCliente));
    });

    it('should throw a NotFoundException for an invalid CPF', async () => {
      const invalidCpf = '99999999999';
      when(clienteUseCasesMock.getClienteByCpf(invalidCpf)).thenResolve(null);

      await expect(controller.buscarPorCpf(invalidCpf)).rejects.toThrowError();
    });
  });
});
