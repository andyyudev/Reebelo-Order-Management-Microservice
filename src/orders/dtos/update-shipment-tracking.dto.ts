import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateShipmentTrackingDto {
  @IsString()
  @IsNotEmpty()
  carrier: string; // The carrier handling the shipment (e.g., FedEx, UPS)

  @IsString()
  @IsNotEmpty()
  trackingNumber: string; // The tracking number for the shipment
}
