import { ClienteConverter } from './cliente.converter';
import { ClienteEntity } from '../entities/cliente.entity';
import { Cliente } from '../../domain/model/cliente';

describe('ClienteConverter', () => {
  describe('toCliente', () => {
    it('should convert ClienteEntity to Cliente', () => {
      const clienteEntity = new ClienteEntity(
        '12345678901',
        'Teste',
        'teste@example.com',
        '11123456784',
      );
      clienteEntity.id = 1;
      clienteEntity.dataHoraCadastro = new Date();

      const result = ClienteConverter.toCliente(clienteEntity);

      expect(result).toBeInstanceOf(Cliente);
      expect(result.id).toEqual(clienteEntity.id);
      expect(result.cpf).toEqual(clienteEntity.cpf);
      expect(result.nome).toEqual(clienteEntity.nome);
      expect(result.email).toEqual(clienteEntity.email);
      expect(result.telefone).toEqual(clienteEntity.telefone);
      expect(result.dataHoraCadastro).toEqual(clienteEntity.dataHoraCadastro);
    });

    it('should return null if ClienteEntity is null or undefined', () => {
      const resultNull = ClienteConverter.toCliente(null);
      const resultUndefined = ClienteConverter.toCliente(undefined);

      expect(resultNull).toBeNull();
      expect(resultUndefined).toBeNull();
    });
  });

  describe('toClienteEntity', () => {
    it('should convert Cliente to ClienteEntity', () => {
      const cliente = new Cliente(
        1,
        '12345678901',
        'Teste',
        'test@example.com',
        '11123456784',
        new Date(),
      );

      const result = ClienteConverter.toClienteEntity(cliente);

      expect(result).toBeInstanceOf(ClienteEntity);
      expect(result.id).toEqual(cliente.id);
      expect(result.cpf).toEqual(cliente.cpf);
      expect(result.nome).toEqual(cliente.nome);
      expect(result.email).toEqual(cliente.email);
      expect(result.telefone).toEqual(cliente.telefone);
      expect(result.dataHoraCadastro).toEqual(cliente.dataHoraCadastro);
    });

    it('should return null if Cliente is null', () => {
      const result = ClienteConverter.toClienteEntity(null);
      expect(result).toBeNull();
    });

    it('should not set id and dataHoraCadastro if not present in Cliente', () => {
      const cliente = new Cliente(
        '12345678901',
        'Teste',
        'test@example.com',
        '11123456784',
      );

      const result = ClienteConverter.toClienteEntity(cliente);

      expect(result).toBeInstanceOf(ClienteEntity);
      expect(result.id).toBeUndefined();
      expect(result.dataHoraCadastro).toBeUndefined();
    });
  });
});
