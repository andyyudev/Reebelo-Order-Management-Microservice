import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  // Custom methods for querying Orders can go here
  async findOrdersWithStatus(status: string): Promise<Order[]> {
    return this.createQueryBuilder('order')
      .where('order.status = :status', { status })
      .getMany();
  }
}
