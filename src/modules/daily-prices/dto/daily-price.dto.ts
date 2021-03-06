import { IsNotEmpty, MinLength } from 'class-validator';

export class DailyPriceDto {
    @IsNotEmpty()
    readonly openingPrice: number;

    @IsNotEmpty()
    readonly closingPrice: number;

    @IsNotEmpty()
    readonly companyAbbr: string;

    @IsNotEmpty()
    readonly createdAt:string;

}