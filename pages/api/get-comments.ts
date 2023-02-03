import type { NextApiRequest, NextApiResponse } from 'next';
import { OrderItem, PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getComments(productId: number) {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productId,
      },
    });

    let response = [];

    // orderItemId를 기반으로 Comment를 조회
    for (const orderItem of orderItems) {
      const comment = await prisma.comment.findUnique({
        where: { orderItemId: orderItem.id },
      });
      response.push({ ...orderItem, ...comment });
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
  const { productId } = req.query;
  if (productId == null) {
    res.status(200).json({ items: [], message: `No productId` });
    return;
  }

  try {
    const wishlist = await getComments(Number(productId));
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: 'Failed' });
  }
}
