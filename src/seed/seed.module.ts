import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/entities/city.entity';
import { State } from 'src/entities/state.entity';
import { Country } from 'src/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, State, City])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
