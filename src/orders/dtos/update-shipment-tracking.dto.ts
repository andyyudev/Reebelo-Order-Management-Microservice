import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateShipmentTrackingDto {
  @IsString()
  @IsNotEmpty()
  carrier: string;

  @IsString()
  @IsNotEmpty()
  trackingNumber: string;
}
