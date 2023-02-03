import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function updateOrderStatus(id: number, status: number) {
  try {
    const response = await prisma.orders.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    console.log(response);

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
  const { userId, id, isPayed } = JSON.parse(req.body);

  const status = isPayed ? 5 : 2; // 5: 배송완료 , 2: 결제완료

  if (session == null || session.id !== userId) {
    res
      .status(200)
      .json({ items: [], message: `No Session or Its not your product` });
    return;
  }

  try {
    const orderStatus = await updateOrderStatus(id, status);
    res.status(200).json({ items: orderStatus, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
