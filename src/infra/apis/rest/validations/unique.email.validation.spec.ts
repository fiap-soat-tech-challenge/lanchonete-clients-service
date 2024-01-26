// import { Test, TestingModule } from '@nestjs/testing';
// import { UniqueEmailValidation } from './unique.email.validation';
// import { ClienteUseCases } from '../../../../usecases/cliente.use.cases';
// import { UseCaseProxy } from '../../../usecases-proxy/use-case-proxy';
// import { UseCasesProxyModule } from '../../../usecases-proxy/use-cases-proxy.module';
// import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
// import { Cliente } from '../../../../domain/model/cliente';
//
// describe('UniqueEmailValidation Tests', () => {
//   let module: TestingModule;
//   let uniqueEmailValidation: UniqueEmailValidation;
//   let mockUseCaseProxy: UseCaseProxy<ClienteUseCases>;
//
//   beforeAll(async () => {
//     module = await Test.createTestingModule({
//       imports: [UseCasesProxyModule.register()],
//       providers: [UniqueEmailValidation],
//     }).compile();
//
//     uniqueEmailValidation = module.get<UniqueEmailValidation>(
//       UniqueEmailValidation,
//     );
//
//     mockUseCaseProxy = module.get<UseCaseProxy<ClienteUseCases>>(
//       UseCasesProxyModule.CLIENTE_USECASES_PROXY,
//     );
//   });
//
//   afterAll(async () => {
//     await module.close();
//   });
//
//   it('should be defined', () => {
//     expect(uniqueEmailValidation).toBeDefined();
//   });
//
//   it('should validate email successfully', async () => {
//     const mockEmail = 'test@example.com';
//
//     jest
//       .spyOn(mockUseCaseProxy.getInstance(), 'getClienteByEmail')
//       .mockResolvedValue(null);
//
//     const result = await uniqueEmailValidation.validate(mockEmail);
//
//     expect(result).toBeTruthy();
//     expect(
//       mockUseCaseProxy.getInstance().getClienteByEmail,
//     ).toHaveBeenCalledWith(mockEmail);
//   });
//
//   it('should fail validation for existing email', async () => {
//     const mockEmail = 'existing@example.com';
//
//     jest
//       .spyOn(mockUseCaseProxy.getInstance(), 'getClienteByEmail')
//       .mockResolvedValue(
//         new Cliente(
//           '12345678901',
//           'Teste',
//           'existing@example.com',
//           '(88) 88888-8888',
//         ),
//       );
//
//     const result = await uniqueEmailValidation.validate(mockEmail);
//
//     expect(result).toBeFalsy();
//     expect(
//       mockUseCaseProxy.getInstance().getClienteByEmail,
//     ).toHaveBeenCalledWith(mockEmail);
//   });
//
//   it('should have a default error message', () => {
//     const defaultMessage = uniqueEmailValidation.defaultMessage({
//       property: 'email',
//     } as ValidationArguments);
//
//     expect(defaultMessage).toEqual(
//       expect.stringContaining('O campo email já foi cadastrado'),
//     );
//   });
// });
