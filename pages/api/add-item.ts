// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const databaseId = process.env.NOTION_DB_ID!;
const auth = process.env.NOTION_SECRET_KEY;

const notion = new Client({
  auth,
});

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error(`ERROR에요! :${JSON.stringify(err)}`);
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;

  if (name == null) {
    return res.status(400).json({ message: 'No name' });
  }

  try {
    await addItem(String(name));
    res.status(200).json({ message: `Success ${name} ` });
  } catch (error) {
    res.status(500).json({ message: `Failed ${name} ` });
  }
}
