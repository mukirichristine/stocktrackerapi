import { IsNotEmpty, MinLength } from 'class-validator';

export class DailyCrawlerDto {
    /* @IsNotEmpty()
    readonly startMonth: number;

    @IsNotEmpty()
    readonly endMonth: number;

    @IsNotEmpty()
    readonly startDate: number;

    @IsNotEmpty()
    readonly endDate: number;

    @IsNotEmpty()
    readonly startYear: number;

    @IsNotEmpty()
    readonly endYear: number; */
    @IsNotEmpty()
    readonly currentDate: number;


}