import { MaxLength, IsString, IsNumber, Max } from 'class-validator';

export class CreateUserDto {
    @MaxLength(10)
    @IsString()
    name: string;

    @MaxLength(25)
    @IsString()
    username: string;

    @Max(120)
    @IsNumber()
    age: number;
}
