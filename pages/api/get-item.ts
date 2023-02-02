// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const databaseId = process.env.NOTION_DB_ID!;
const auth = process.env.NOTION_SECRET_KEY;

const notion = new Client({
  auth,
});

async function getItem() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    });
    return response;
  } catch (err) {
    console.error(`ERROR에요! :${JSON.stringify(err)}`);
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
    const response = await getItem();
    res.status(200).json({ items: response?.results, message: `Success` });
  } catch (error) {
    res.status(500).json({ message: `Failed` });
  }
}
