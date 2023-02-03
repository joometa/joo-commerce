// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { OrderItem, PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getOrder(userId: string) {
  try {
    // orders 테이블에서 나의 주문들을 조회힌다.
    const myOrders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    });
    console.log({ myOrders });

    let response = [];

    // orders 안에 있는 orderItemIds로 orderItem을 꺼내고 products 테이블에서 이미지 등 정보를 조합한다.
    for (const order of myOrders) {
      let orderItems: OrderItem[] = [];
      const itemIds = order.orderItemIds.split(',').map((item) => Number(item));
      for (const id of itemIds) {
        const res: OrderItem[] =
          await prisma.$queryRaw`SELECT i.id, quantity, amount, i.price, name, image_url, productId FROM OrderItem as i JOIN products as p ON i.productId=p.id WHERE i.id=${id};`;
        orderItems.push.apply(orderItems, res);
      }
      response.push({ ...order, orderItems });
    }
    console.log({ response });
    return response;
  } catch (err) {
    console.error(`ERROR에요! :${err}`);
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session == null) {
    res.status(200).json({ items: [], message: `No Session` });
    return;
  }

  try {
    const wishlist = await getOrder(String(session.id));
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: 'Failed' });
  }
}
