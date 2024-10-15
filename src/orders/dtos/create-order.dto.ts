import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  // Represents individual items in the order
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
  storeId: string; // Store ID, to match the Order entity

  @IsString()
  @IsNotEmpty()
  customerId: string; // Customer ID, to match the Order entity

  @IsNumber()
  @IsNotEmpty()
  itemsTotal: number; // Total price of items before taxes and shipping

  @IsNumber()
  @IsNotEmpty()
  shippingCost: number; // Shipping cost for the order

  @IsNumber()
  @IsNotEmpty()
  taxAmount: number; // Tax amount for the order

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number; // Total amount including items, tax, and shipping

  @IsString()
  status: string = 'pending'; // Order status (optional, defaults to 'pending')

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
