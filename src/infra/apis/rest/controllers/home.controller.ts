import { Controller, Get, Req } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request } from 'express';

@ApiExcludeController()
@Controller('/api/clients')
export class HomeController {
  @Get()
  home(@Req() request: Request): object {
    return {
      message: 'Bem-vindo ao Clients Service Lanchonete!',
      docs: `${request.protocol}://${request.get('Host')}${
        request.originalUrl
      }api/clientes/docs`,
    };
  }
}
