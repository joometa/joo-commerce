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
