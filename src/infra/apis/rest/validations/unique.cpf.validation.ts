import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable, Logger } from '@nestjs/common';
import { ClienteUseCases } from '../../../../usecases/cliente.use.cases';
import { NotFoundException } from '../../../../domain/exceptions/not-found.exception';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueCpfValidation implements ValidatorConstraintInterface {
  private readonly logger = new Logger(UniqueCpfValidation.name);
  constructor(private clienteUseCases: ClienteUseCases) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `O campo ${validationArguments.property} já foi cadastrado`;
  }

  async validate(
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    try {
      const clienteByCpf = await this.clienteUseCases.getClienteByCpf(value);
      return !clienteByCpf;
    } catch (e) {
      if (e instanceof NotFoundException) {
        return true;
      }
      this.logger.warn('Unexpected error:', e.stack);
      return false;
    }
  }
}

export function UniqueCpf(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueCpfValidation,
    });
  };
}
