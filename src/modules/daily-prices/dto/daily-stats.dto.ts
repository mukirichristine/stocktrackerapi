import { IsNotEmpty, MinLength } from 'class-validator';

export class DailyStatsDto {
    @IsNotEmpty()
    readonly companyId: number;

    @IsNotEmpty()
    readonly change: number;

    

}