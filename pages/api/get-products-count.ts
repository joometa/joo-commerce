// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProductsCount(category: number, contains: string) {
  const containsCondition =
    contains && contains !== '' ? { name: { contains } } : undefined;
  const where =
    category && category !== -1
      ? {
          category_id: category,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined;

  try {
    const response = await prisma.products.count({ where });
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
  const { category, contains } = req.query;

  try {
    const count = await getProductsCount(Number(category), String(contains));
    res.status(200).json({ items: count, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
