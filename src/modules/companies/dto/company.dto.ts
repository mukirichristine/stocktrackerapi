import { IsNotEmpty, MinLength } from 'class-validator';

export class CompanyDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly trading_symbol: string;

    @IsNotEmpty()
    readonly sectorId: string;

    @IsNotEmpty()
    readonly stockExchangeId: string;
}