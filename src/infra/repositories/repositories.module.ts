import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepositoryImpl } from './cliente.repository.impl';
import { ClienteEntity } from '../entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  exports: [ClienteRepositoryImpl],
  providers: [ClienteRepositoryImpl],
})
export class RepositoriesModule {}
