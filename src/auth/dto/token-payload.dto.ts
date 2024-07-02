import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  userId: number;
}
