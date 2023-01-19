import { PrismaClient, Prisma } from '@prisma/client';

// TODO : yarn ts-node prisma/product.ts

const prisma = new PrismaClient();

const productData: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(100)
).map((_, index) => ({
  name: `Black Mantoman ${index + 1}`,
  contents: `{"blocks":[{"key":"csl9v","text":"This is not Real. Its fake products. Made in China! Serial No.${
    index + 1
  }","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":51,"style":"color-rgb(0,0,0)"},{"offset":0,"length":51,"style":"fontsize-medium"},{"offset":0,"length":51,"style":"fontfamily-ui-sans-serif, system-ui, -apple-system, \\"system-ui\\", \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":37,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  category_id: 1,
  image_url: `https://picsum.photos/id/1${String(index + 1).padStart(
    3,
    '0'
  )}/1000/600/`,
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}));

async function main() {
  await prisma.products.deleteMany({});

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    });
    console.log(`Created id : ${product.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
