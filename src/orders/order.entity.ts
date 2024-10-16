import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @Column()
  customerId: string;

  @Column('decimal')
  itemsTotal: number;

  @Column('decimal')
  shippingCost: number;

  @Column('decimal')
  taxAmount: number;

  @Column('decimal')
  totalAmount: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ unique: true, nullable: true })
  idempotencyKey: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column('json', { nullable: true })
  shipment: {
    carrier: string;
    trackingNumber: string;
  };
}
