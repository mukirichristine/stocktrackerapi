import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { sectorsProviders } from './sectors.providers';
import { Sector } from './sector.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  providers: [SectorsService, ...sectorsProviders],
  controllers: [SectorsController]
})
export class SectorsModule {}
