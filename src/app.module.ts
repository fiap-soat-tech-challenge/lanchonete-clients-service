import { Module } from '@nestjs/common';
import { RestModule } from './infra/apis/rest/rest.module';
import { RepositoriesModule } from './infra/repositories/repositories.module';
import { UseCasesProxyModule } from './infra/usecases-proxy/use-cases-proxy.module';
import { HealthModule } from './infra/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database.config.service';
import { EntitiesModule } from './infra/entities/entities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    RestModule,
    EntitiesModule,
    RepositoriesModule,
    UseCasesProxyModule,
    HealthModule,
  ],
  providers: [DatabaseConfigService],
})
export class AppModule {}
