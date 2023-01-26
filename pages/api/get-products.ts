// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PrismaClient } from '@prisma/client';
import { getOrderBy } from '@constants/products';

const prisma = new PrismaClient();

async function getProducts({
  skip,
  take,
  category,
  orderBy,
  contains,
}: {
  skip: number;
  take: number;
  category: number;
  orderBy: string;
  contains: string;
}) {
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

  const orderByCondition = getOrderBy(orderBy);

  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
      where,
      ...orderByCondition,
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
  const { skip, take, category, orderBy, contains } = req.query;

  if (skip == null || take == null || category == null || orderBy == null) {
    res.status(400).json({ message: 'Check query parameters plz' });
    return;
  }

  try {
    const products = await getProducts({
      skip: Number(skip),
      take: Number(take),
      category: Number(category),
      orderBy: String(orderBy),
      contains: String(contains),
    });
    res.status(200).json({ items: products, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Faild` });
  }
}
