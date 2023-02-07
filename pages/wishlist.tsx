import { Container, SimpleGrid } from '@mantine/core';
import { products } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ProductCard as SProductsCard } from '@components/skeleton/ProductCard';
import { ProductCard } from '@components/ProductCard';
import { useEffect } from 'react';
import Main from '@components/layout/Main';

export default function Wishlist() {
  const router = useRouter();
  const { data: products, isLoading } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    ['/api/get-wishlists'],
    () => {
      const response = fetch('/api/get-wishlists').then((res) => res.json());
      return response;
    },
    { select: (data) => data.items }
  );

  if (products && products.length === 0) {
    return (
      <Main>
        <p className="text-2xl mb-4 font-semibold">내가 찜한 상품</p>
        <div
          className="flex justify-center items-center "
          style={{
            marginTop: '30px',
            height: '30vh',
            borderRadius: '25px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.23)',
          }}
        >
          찜한 상품이 없습니다.
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <p className="text-2xl mb-4 font-semibold">내가 찜한 상품</p>
      <Container
        py="xl"
        style={{ width: '100%', maxWidth: '100%', padding: 0 }}
      >
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'xs', cols: 1 },
          ]}
        >
          {isLoading &&
            Array.from({ length: 9 }).map((_, idx) => (
              <SProductsCard key={idx} />
            ))}

          {products &&
            products.map((prod, idx) => <ProductCard key={idx} data={prod} />)}
        </SimpleGrid>
      </Container>
    </Main>
  );
}
