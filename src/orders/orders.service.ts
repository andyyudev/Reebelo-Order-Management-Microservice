import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateShipmentTrackingDto } from './dtos/update-shipment-tracking.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { CustomersService } from '../customers//customers.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly customersService: CustomersService, // Inject customer service
    private readonly inventoryService: InventoryService, // Inject inventory service
  ) {}

  // Create a new order
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Validate customer exists with customer service

    // Validate inventory exists with inventory service

    // Create the order
    const order = this.ordersRepository.create(createOrderDto);

    return this.ordersRepository.save(order);
  }

  // Update shipment tracking information
  async updateShipmentTrackingInformation(
    orderId: string,
    updateShipmentTrackingDto: UpdateShipmentTrackingDto,
  ): Promise<Order> {
    // Find the order
    const order = await this.ordersRepository.findOne(orderId);

    // Validate order
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Update the shipment tracking information
    order.shipment = {
      carrier: updateShipmentTrackingDto.carrier,
      trackingNumber: updateShipmentTrackingDto.trackingNumber,
    };

    // Call update order status method to update the order status to shipped
    await this.updateOrderStatus(orderId, { status: 'shipped' });

    return this.ordersRepository.save(order);
  }

  // Update order status
  async updateOrderStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    // Find the order
    const order = await this.ordersRepository.findOne(orderId);

    // Validate order
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Update the order status
    order.status = updateOrderStatusDto.status;

    return this.ordersRepository.save(order);
  }

  // Delete an order
  async deleteOrder(orderId: string) {
    // Find the order
    const order = await this.ordersRepository.findOne(orderId);

    // Validate order
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Delete the order from the database
    await this.ordersRepository.delete(orderId);
    // No need to return anything, as we are using 204 No Content in the controller
  }
}
