import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['pending', 'processing', 'shipped', 'delivered', 'canceled'])
  status: string; // Ensures that the status is one of the allowed values
}
