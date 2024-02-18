export interface DeleteClienteService {
  deleteCpf(cpf: string): Promise<void>;
}
