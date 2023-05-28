import { MaxLength, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(10)
    name!: string;
}
