import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesModule } from './entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { RepositoriesModule } from '../repositories/repositories.module';

describe('EntitiesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        EntitiesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [ClienteEntity],
          synchronize: true,
        }),
        RepositoriesModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should export TypeOrmModule', () => {
    const typeOrmModule = module.get(TypeOrmModule);

    expect(typeOrmModule).toBeDefined();
  });

  it('should export RepositoriesModule', () => {
    const repositoriesModule = module.get(RepositoriesModule);

    expect(repositoriesModule).toBeDefined();
  });
});
