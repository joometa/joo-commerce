// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

interface UpdateCommentParams {
  userId: string;
  userName: string;
  orderItemId: number;
  rate: number;
  contents: string;
  images: string;
}

async function updateComment({
  userId,
  userName,
  orderItemId,
  rate,
  contents,
  images,
}: UpdateCommentParams) {
  try {
    const response = await prisma.comment.upsert({
      where: {
        orderItemId,
      },
      update: {
        contents,
        rate,
        images,
      },
      create: {
        userId,
        userName,
        contents,
        rate,
        orderItemId,
        images,
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
  const { orderItemId, rate, contents, images } = JSON.parse(req.body);

  if (session == null) {
    res.status(200).json({ items: [], message: `No Session` });
    return;
  }

  console.log({ session });
  try {
    const wishlist = await updateComment({
      userId: String(session.id),
      userName: session?.user?.name ? String(session.user.name) : 'anonymous',
      orderItemId: orderItemId,
      rate: rate,
      contents: contents,
      images: images,
    });
    res.status(200).json({ items: wishlist, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
