import { OrderItem, Orders } from '@prisma/client';

export interface OrderItemDetail extends OrderItem {
  name: string;
  image_url: string;
}

export interface OrderDetail extends Orders {
  orderItems: OrderItemDetail[];
}
