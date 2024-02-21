import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientePresenter } from '../presenters/cliente.presenter';
import { ClienteDto } from '../dtos/cliente.dto';
import { ClienteUseCases } from '../../../../usecases/cliente.use.cases';
import { ClienteDeleteDto } from '../dtos/cliente-delete.dto';

@ApiTags('Clientes')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/clientes')
export class ClientesController {
  constructor(private clienteUseCases: ClienteUseCases) {}
  @ApiOperation({
    summary: 'Listagem de clientes cadastrados',
    description: 'Retorna a lista de clientes cadastrados no sistema',
  })
  @ApiOkResponse({
    isArray: true,
    type: ClientePresenter,
  })
  @Get()
  async listar(): Promise<Array<ClientePresenter>> {
    const allClientes = await this.clienteUseCases.getAllClientes();
    return allClientes.map((cliente) => new ClientePresenter(cliente));
  }

  @ApiOperation({
    summary: 'Cadastro de cliente',
    description:
      'Realiza o cadastro de um novo cliente com os dados fornecidos e retorna o cliente cadastrado',
  })
  @ApiCreatedResponse({
    type: ClientePresenter,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Post()
  async cadastrar(@Body() clienteDto: ClienteDto): Promise<ClientePresenter> {
    const cliente = await this.clienteUseCases.addCliente(
      clienteDto.toCliente(),
    );
    return new ClientePresenter(cliente);
  }

  @ApiOperation({
    summary: 'Pesquisa um cliente pelo CPF',
    description: 'Retorna um cliente pelo CPF, se for encontrado',
  })
  @ApiCreatedResponse({
    type: ClientePresenter,
  })
  @ApiNotFoundResponse({
    description: 'O CPF do cliente fornecido não foi encontrado',
  })
  @Get(':cpf')
  async buscarPorCpf(@Param('cpf') cpf: string): Promise<ClientePresenter> {
    const clienteByCpf = await this.clienteUseCases.getClienteByCpf(cpf);
    return new ClientePresenter(clienteByCpf);
  }

  @ApiOperation({
    summary: 'Deletar cliente',
    description:
      'Deleta um cliente pelos dados informados.\nATENÇÃO: Está ação é irreversível.',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'O cliente com os dados fornecidos não foi encontrado',
  })
  @Delete()
  async deletarCliente(
    @Body() clienteDeleteDto: ClienteDeleteDto,
  ): Promise<void> {
    await this.clienteUseCases.deleteClienteByCpf(clienteDeleteDto.cpf);
  }
}
