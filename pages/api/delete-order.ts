// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function deleteOrder(userId: string, id: number) {
  try {
    // orders 테이블에서 나의 주문들을 조회힌다.
    const myOrders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    });

    const targetIds: number[] = [];

    for (const order of myOrders) {
      if (order.id === id) {
        order.orderItemIds
          .split(',')
          .forEach((id) => targetIds.push(Number(id)));
      }
    }
    // orderItem DB 내부 데이터 제거
    targetIds.length > 0 &&
      targetIds.forEach(async (id) => {
        await prisma.orderItem.delete({
          where: {
            id: id,
          },
        });
      });

    // Orders DB 내부 값 제거
    const response = await prisma.orders.delete({
      where: {
        id: id,
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
  const { id } = JSON.parse(req.body);

  const session = await unstable_getServerSession(req, res, authOptions);
  if (session == null) {
    res.status(200).json({ items: [], message: `No Session` });
    return;
  }

  try {
    const wishlist = await deleteOrder(String(session.id), Number(id));
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: 'Failed' });
  }
}
