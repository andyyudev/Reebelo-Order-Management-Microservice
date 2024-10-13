import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerName: string;

  @Column('decimal')
  totalPrice: number;

  @Column({ default: 'pending' })
  status: string;

  @Column('json', { nullable: true }) // Store shipment as a JSON object
  shipment: {
    carrier: string;
    trackingNumber: string;
  };
}
