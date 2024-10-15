import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const customer = await this.customersService.getCustomerDetails(
        createOrderDto.customerId,
      );
      if (!customer) {
        throw new NotFoundException(
          `Customer with ID ${createOrderDto.customerId} not found`,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error validating customer: ${error.message}`,
      );
    }

    // Validate inventory exists with inventory service
    try {
      for (const item of createOrderDto.items) {
        const isAvailable =
          await this.inventoryService.checkProductAvailability(
            item.productId,
            item.quantity,
          );
        if (!isAvailable) {
          throw new BadRequestException(
            `Product with ID ${item.productId} is out of stock`,
          );
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error validating inventory: ${error.message}`,
      );
    }

    // Create the order
    try {
      const order = this.ordersRepository.create({
        ...createOrderDto,
        items: createOrderDto.items.map((item) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
      });
      return await this.ordersRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not create order: ${error.message}`,
      );
    }
  }

  // Update shipment tracking information
  async updateShipmentTrackingInformation(
    orderId: string,
    updateShipmentTrackingDto: UpdateShipmentTrackingDto,
  ): Promise<Order> {
    try {
      // Find the order by ID
      const order = await this.ordersRepository.findOneBy({ id: orderId });

      // If no order is found
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      // Update the shipment tracking information
      order.shipment = {
        carrier: updateShipmentTrackingDto.carrier,
        trackingNumber: updateShipmentTrackingDto.trackingNumber,
      };

      // Update the order status directly to 'shipped'
      if (order.status !== 'shipped') {
        order.status = 'shipped';
      }

      return this.ordersRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not retrieve order: ${error.message}`,
      );
    }
  }

  // Update order status
  async updateOrderStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    try {
      // Find the order by ID
      const order = await this.ordersRepository.findOneBy({ id: orderId });

      // If no order is found
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      // Update the order status
      order.status = updateOrderStatusDto.status;

      return this.ordersRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not retrieve order: ${error.message}`,
      );
    }
  }

  // Delete an order
  async deleteOrder(orderId: string) {
    try {
      // Find the order by ID
      const order = await this.ordersRepository.findOneBy({ id: orderId });

      // If no order is found
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      // Delete the order from the database
      await this.ordersRepository.delete(orderId);
      // No need to return anything, as we are using 204 No Content in the controller
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not retrieve order: ${error.message}`,
      );
    }
  }
}
