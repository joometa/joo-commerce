// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCategories() {
  try {
    const response = await prisma.categories.findMany({});
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
  try {
    const categories = await getCategories();
    res.status(200).json({ items: categories, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Faild` });
  }
}
