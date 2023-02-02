// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { OrderItem, PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

interface AddOrderProps {
  userId: string;
  items: Omit<OrderItem, 'id'>[];
  orderInfo?: { receiver: string; address: string; phoneNumber: string };
}

async function addOrder({ userId, items, orderInfo }: AddOrderProps) {
  try {
    // 1. orderItem 들을 만든다.
    let orderItemIds = [];
    for (const item of items) {
      const orderItem = await prisma.orderItem.create({
        data: {
          ...item,
        },
      });
      console.log(`Created id : ${orderItem.id}`);
      orderItemIds.push(orderItem.id);
    }

    console.log(JSON.stringify(orderItemIds));

    // 2. 만들어진 orderItemIds 를 포함한 orders 를 만든다.
    const orderInfoCondition = orderInfo ? { ...orderInfo } : {};

    const response = await prisma.orders.create({
      data: {
        userId: userId,
        orderItemIds: orderItemIds.join(','),
        ...orderInfoCondition,
        status: 0,
      },
    });

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
  const { items, orderInfo } = JSON.parse(req.body);

  if (session == null) {
    res.status(200).json({ items: [], message: `No Session` });
    return;
  }

  try {
    const orderItems = await addOrder({
      userId: String(session.id),
      items,
      orderInfo,
    });
    res.status(200).json({ items: orderItems, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
