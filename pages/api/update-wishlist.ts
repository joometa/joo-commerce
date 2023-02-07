// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function updateWishlist(userId: string, productId: string) {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: userId,
      },
    });

    const originWishlist =
      wishlist?.productIds != null && wishlist.productIds !== ''
        ? wishlist.productIds.split(',')
        : [];

    const isWished = originWishlist.includes(productId);
    const newWishlist = isWished
      ? originWishlist.filter((id) => id !== productId)
      : [...originWishlist, productId];

    const response = await prisma.wishlist.upsert({
      where: {
        userId: userId,
      },
      update: {
        productIds: newWishlist.join(','),
      },
      create: {
        userId,
        productIds: newWishlist.join(','),
      },
    });

    return response?.productIds.split(',');
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
  const { productId } = JSON.parse(req.body);
  console.log('왜 undefined?', { productId }, req.body);
  if (session == null) {
    res.status(200).json({ items: [], message: `No Session` });
    return;
  }

  try {
    const wishlist = await updateWishlist(
      String(session.id),
      String(productId)
    );
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
