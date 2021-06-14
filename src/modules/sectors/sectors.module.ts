import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { sectorsProviders } from './sectors.providers';
@Module({
  providers: [SectorsService, ...sectorsProviders],
  controllers: [SectorsController]
})
export class SectorsModule {}
