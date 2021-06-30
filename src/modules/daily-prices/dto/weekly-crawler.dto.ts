import { IsNotEmpty, MinLength } from 'class-validator';

export class WeeklyCrawlerDto {
    
    @IsNotEmpty()
    readonly weekNumber: number;

    @IsNotEmpty()
    readonly year: number;


}