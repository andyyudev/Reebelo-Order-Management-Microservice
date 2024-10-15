import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique ID for the orderz

  @Column()
  storeId: string; // Store ID for the order

  @Column()
  customerId: string; // Customer ID for the order

  @Column('decimal')
  itemsTotal: number; // Total price of items

  @Column('decimal')
  shippingCost: number; // Shipping cost

  @Column('decimal')
  taxAmount: number; // Tax amount

  @Column('decimal')
  totalAmount: number; // Total amount including items, shipping, and tax

  @Column({ default: 'pending' })
  status: string; // Order status, defaulting to 'pending'

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[]; // One-to-many relationship with OrderItem

  @Column('json', { nullable: true }) // Shipment details stored as JSON
  shipment: {
    carrier: string;
    trackingNumber: string;
  };
}
