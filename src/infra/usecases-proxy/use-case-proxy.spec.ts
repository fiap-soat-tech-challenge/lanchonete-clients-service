import { UseCaseProxy } from './use-case-proxy';
import { ClienteUseCases } from '../../usecases/cliente.use.cases';

describe('UseCaseProxy', () => {
  describe('getInstance', () => {
    it('should return the provided use case instance', () => {
      const mockUseCase = ClienteUseCases; // Substitua isso por uma instância válida do seu caso de uso

      const useCaseProxy = new UseCaseProxy(mockUseCase);
      const result = useCaseProxy.getInstance();

      expect(result).toBe(mockUseCase);
    });
  });
});
