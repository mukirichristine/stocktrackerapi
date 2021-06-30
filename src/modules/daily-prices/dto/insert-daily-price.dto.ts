import { IsNotEmpty, MinLength } from 'class-validator';

export class InsertDailyPriceDto {
    @IsNotEmpty()
    readonly openingPrice: number;

    @IsNotEmpty()
    readonly closingPrice: number;

    @IsNotEmpty()
    readonly companyId: number;

    @IsNotEmpty()
    readonly createdAt:string;

}