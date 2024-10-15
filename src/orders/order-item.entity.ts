import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique ID for the order item

  @Column()
  productId: string; // Product ID

  @Column('decimal')
  price: number; // Price per unit

  @Column('int')
  quantity: number; // Quantity of the product ordered

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order; // Many-to-one relationship with Order
}
