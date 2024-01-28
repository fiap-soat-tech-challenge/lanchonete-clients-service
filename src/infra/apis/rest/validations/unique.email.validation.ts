import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ClienteUseCases } from '../../../../usecases/cliente.use.cases';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailValidation implements ValidatorConstraintInterface {
  constructor(private clienteUseCases: ClienteUseCases) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `O campo ${validationArguments.property} já foi cadastrado`;
  }

  async validate(
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const clienteByEmail = await this.clienteUseCases.getClienteByEmail(value);
    return !clienteByEmail;
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidation,
    });
  };
}
