import { PrismaClient, Prisma } from '@prisma/client';
import { PRODUCT } from './product-mock';
// TODO : yarn ts-node prisma/product-with-category.ts

const prisma = new PrismaClient();

const productData: Prisma.productsCreateInput[] = [
  ...PRODUCT.SNEAKERS,
  ...PRODUCT['T-SHIRT'],
  ...PRODUCT.PANTS,
  ...PRODUCT.CAP,
  ...PRODUCT.HOODIE,
];

async function main() {
  const CATEGORY_MAP = ['Sneakers', 'T-Shirt', 'Pants', 'Cap', 'Hoodie'];
  CATEGORY_MAP.forEach(async (c, i) => {
    const category = await prisma.categories.upsert({
      where: {
        id: i + 1,
      },
      update: {
        name: c,
      },
      create: {
        name: c,
      },
    });
    console.log(`Upsert category id : ${category.id}`);
  });

  await prisma.products.deleteMany({});

  for (const p of productData) {
    // contents 너무길다고 prisma에서 에러나서 잠시 뺌
    const { contents, ...withoutContent } = p;

    const product = await prisma.products.create({
      data: withoutContent,
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
