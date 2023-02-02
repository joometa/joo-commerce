import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PrismaClient } from '@prisma/client';
import jwtDecode from 'jwt-decode';

interface Decoded {
  name: string;
  email: string;
  picture: string;
}

const prisma = new PrismaClient();

async function signUp(credential: string) {
  const decoded: Decoded = jwtDecode(credential);

  try {
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.name,
        image: decoded.picture,
      },
      create: {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
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
  const { credential } = req.query;

  try {
    const token = await signUp(String(credential));
    res.status(200).json({ items: token, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
