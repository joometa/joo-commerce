import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getComment(userId: string, orderItemId: number) {
  try {
    const response = await prisma.comment.findUnique({
      where: {
        orderItemId: orderItemId,
      },
    });

    if (response?.userId === userId) {
      return response;
    }
    return { message: 'userId is not matched' };
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
  const { orderItemId } = req.query;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session == null) {
    res.status(200).json({ items: [], message: `No Session` });
    return;
  }
  if (orderItemId == null) {
    res.status(200).json({ items: [], message: `No orderItemId` });
    return;
  }

  try {
    const wishlist = await getComment(String(session.id), Number(orderItemId));
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
