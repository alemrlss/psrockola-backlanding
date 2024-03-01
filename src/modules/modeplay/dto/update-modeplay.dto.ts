import { PartialType } from '@nestjs/mapped-types';
import { CreateModeplayDto } from './create-modeplay.dto';

export class UpdateModeplayDto extends PartialType(CreateModeplayDto) {
  
}
