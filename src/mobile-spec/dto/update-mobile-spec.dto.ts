import { PartialType } from '@nestjs/swagger';
import { CreateMobileSpecDto } from './create-mobile-spec.dto';

export class UpdateMobileSpecDto extends PartialType(CreateMobileSpecDto) {}
