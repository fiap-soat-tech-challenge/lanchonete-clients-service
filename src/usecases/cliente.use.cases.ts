import { ClienteRepository } from '../domain/repositories/cliente.repository';
import { Cliente } from '../domain/model/cliente';
import { NotFoundException } from '../domain/exceptions/not-found.exception';
import { DeleteClienteService } from '../domain/services/delete-cliente.service';

export class ClienteUseCases {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly deleteClienteService: DeleteClienteService,
  ) {}

  async getAllClientes(): Promise<Array<Cliente>> {
    return await this.clienteRepository.findAll();
  }

  async getClienteByCpf(cpf: string): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.findByCpf(cpf);
    if (cliente === null) {
      throw new NotFoundException(
        'O CPF do cliente fornecido não foi encontrado',
      );
    }
    return cliente;
  }

  async getClienteByEmail(email: string): Promise<Cliente | null> {
    return await this.clienteRepository.findByEmail(email);
  }

  async addCliente(cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.insert(cliente);
  }

  async deleteClienteByCpf(cpf: string): Promise<void> {
    const cliente = await this.clienteRepository.findByCpf(cpf);
    if (cliente === null) {
      throw new NotFoundException(
        'O cliente com os dados fornecidos não foi encontrado',
      );
    }

    const clienteDeleted = await this.clienteRepository.delete(cliente);
    if (clienteDeleted) {
      await this.deleteClienteService.deleteCpf(cpf);
    }
  }
}
