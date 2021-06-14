import { IsNotEmpty, MinLength } from 'class-validator';

export class StockExchangeDto {
    @IsNotEmpty()
    readonly name: string;
}