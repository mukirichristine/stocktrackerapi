import { IsNotEmpty, MinLength } from 'class-validator';

export class SectorDto {
    @IsNotEmpty()
    readonly name: string;

    
}