import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { Request } from 'express';

describe('HomeController', () => {
  let homeController: HomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
    }).compile();

    homeController = module.get<HomeController>(HomeController);
  });

  describe('home', () => {
    it('should return a welcome message with docs link', () => {
      const mockRequest = {
        protocol: 'http',
        get: jest.fn(),
        originalUrl: '/',
      } as unknown as Request;
      jest.spyOn(mockRequest, 'get').mockReturnValue('localhost:3000');

      const result = homeController.home(mockRequest);

      expect(result).toEqual({
        message: 'Bem-vindo ao Clients Service Lanchonete!',
        docs: 'http://localhost:3000/api/docs',
      });
    });
  });
});
