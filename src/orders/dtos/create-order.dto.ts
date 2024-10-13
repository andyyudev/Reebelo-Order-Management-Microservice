import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  status: string;
}
