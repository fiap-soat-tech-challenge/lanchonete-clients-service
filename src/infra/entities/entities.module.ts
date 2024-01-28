import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity]), RepositoriesModule],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
