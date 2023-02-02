// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { Cart, PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

async function addCart(userId: string, item: Omit<Cart, 'id' | 'userId'>) {
  try {
    //TODO : 장바구니에 해당값이 이미 존재하면 존재하는거 지우고 새로 덮어쓰기

    //  const response = await prisma.cart.upsert({
    //  where:{
    //   userId: userId,
    //  },
    //  update:{
    //   data:{}
    //  },
    //  create:{}
    //  })

    const response = await prisma.cart.create({
      data: {
        userId,
        ...item,
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
  const { item } = JSON.parse(req.body);

  if (session == null) {
    res.status(200).json({ items: [], message: `No Session` });
    return;
  }

  try {
    const wishlist = await addCart(String(session.id), item);
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
