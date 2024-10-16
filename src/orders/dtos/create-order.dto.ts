import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  idempotencyKey?: string;

  @IsNumber()
  @IsNotEmpty()
  itemsTotal: number;

  @IsNumber()
  @IsNotEmpty()
  shippingCost: number;

  @IsNumber()
  @IsNotEmpty()
  taxAmount: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsString()
  status: string = 'pending';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
