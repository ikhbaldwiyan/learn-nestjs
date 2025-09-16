import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  bio: string;

  @ApiPropertyOptional({ type: String, format: 'binary' })
  image?: string;
}
