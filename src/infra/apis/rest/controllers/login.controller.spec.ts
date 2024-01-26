import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginDto } from '../dtos/login.dto';

describe('LoginController', () => {
  let loginController: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
  });

  describe('login', () => {
    it('should return an empty object for successful login', () => {
      const mockLoginDto: LoginDto = { cpf: 'example_cpf' };

      const result = loginController.login(mockLoginDto);

      expect(result).toEqual({});
    });
  });
});
