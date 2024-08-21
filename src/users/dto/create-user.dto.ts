import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  currency?: string;

  @ApiPropertyOptional()
  theme?: string;

  @ApiPropertyOptional()
  avatarUrl?: string;
}
