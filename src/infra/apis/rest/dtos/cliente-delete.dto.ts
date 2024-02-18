import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class ClienteDeleteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O cpf é obrigatório' })
  @Matches(/\d{3}\.\d{3}\.\d{3}-\d{2}/gm, {
    message: 'Formato de CPF inválido. Use o formato 123.456.789-00',
  })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(250, { message: 'O nome deve ter no máximo 250 caracteres' })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @MinLength(3, { message: 'O endereço deve ter no mínimo 3 caracteres' })
  @MaxLength(250, { message: 'O endereço deve ter no máximo 250 caracteres' })
  endereco: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @Matches(/\(\d{2}\)\s\d{4,5}-\d{4}/gm, {
    message: 'Formato de telefone inválido. Use o formato (99) 99999-9999',
  })
  telefone: string;
}
