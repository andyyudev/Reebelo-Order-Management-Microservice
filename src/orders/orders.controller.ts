import {
  Controller,
  Post,
  Put,
  Delete,
  Headers,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateShipmentTrackingDto } from './dtos/update-shipment-tracking.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Create a new order
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Headers('idempotency-key') idempotencyKey: string,
  ) {
    // Generate a unique idempotency key if not provided
    if (!idempotencyKey) {
      idempotencyKey = uuidv4();
    }
    return this.ordersService.createOrder(createOrderDto, idempotencyKey);
  }

  // Placeholder for updating payment information
  @Put(':id/payment')
  async updatePayment() {
    /* 
      Update payment information, including payment method, address, etc.
      This might involve calling a payment gateway API to process the payment, etc.
    */
    return { message: 'Payment information update is not implemented.' };
  }

  // Placeholder for updating shipping information
  @Put(':id/shipping')
  async updateShipping() {
    /* 
      Update shipping information, including address, contact details, etc.
      This might trigger re-calculation of shipping cost.
    */
    return { message: 'Shipping information update is not implemented.' };
  }

  // Update shipment tracking information
  @Put(':id/shipment/tracking')
  async updateShipmentTracking(
    @Param('id') orderId: string,
    @Body() updateShipmentTrackingDto: UpdateShipmentTrackingDto,
  ) {
    return this.ordersService.updateShipmentTrackingInformation(
      orderId,
      updateShipmentTrackingDto,
    );
  }

  // Update order status
  @Put(':id/status')
  async updateStatus(
    @Param('id') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(orderId, updateOrderStatusDto);
  }

  // Delete an order
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Return 204 No Content
  async deleteOrder(@Param('id') orderId: string): Promise<void> {
    await this.ordersService.deleteOrder(orderId);
    // No need to return anything, the 204 status code will indicate successful deletion
  }
}
