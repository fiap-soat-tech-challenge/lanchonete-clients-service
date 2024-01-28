import { Cliente } from '../../../../domain/model/cliente';
import { ClienteDto } from './cliente.dto';

describe('ClienteDto', () => {
  describe('toCliente', () => {
    it('should convert ClienteDto to Cliente', () => {
      const clienteDto = new ClienteDto();
      clienteDto.cpf = '123.456.789-00';
      clienteDto.nome = 'John Doe';
      clienteDto.email = 'john.doe@example.com';
      clienteDto.telefone = '(99) 99999-9999';

      const cliente: Cliente = clienteDto.toCliente();

      expect(cliente).toBeInstanceOf(Cliente);
      expect(cliente.cpf).toBe(clienteDto.cpf);
      expect(cliente.nome).toBe(clienteDto.nome);
      expect(cliente.email).toBe(clienteDto.email);
      expect(cliente.telefone).toBe(clienteDto.telefone);
    });
  });
});
