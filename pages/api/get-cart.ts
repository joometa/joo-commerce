// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function getCart(userId: string) {
  try {
    const cart =
      await prisma.$queryRaw`SELECT c.id, userId, quantity, amount, price, name, image_url, productId FROM Cart as c JOIN products as p WHERE c.productId=p.id AND userId=${userId}`;

    return cart;
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
    const wishlist = await getCart(String(session.id));
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
