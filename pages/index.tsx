import { categories, products } from '@prisma/client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Container, Input, Pagination, SimpleGrid } from '@mantine/core';
import { TAKE, CATEGORY_MAP, FILTERS } from '@constants/products';
import { SegmentedControl, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import useDebounce from '@hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ProductCard } from '@components/ProductCard';
import { ProductCard as SProductsCard } from '@components/skeleton/ProductCard';
import styled from '@emotion/styled';

export default function Home() {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string>('-1');
  const [selectedFilter, setSelectedFilter] = useState<string>('latest');
  const [keyword, setKeyword] = useState<string>('');

  const debouncedKeyword = useDebounce<string>(keyword);

  const { data: categories } = useQuery<{ items: categories[] }, unknown, any>(
    ['/api/get-categories'],
    () => fetch('/api/get-categories').then((res) => res.json()),
    { select: (data) => data.items }
  );

  const { data: total } = useQuery<number, unknown, any>(
    [
      `/api/get-products-count?category=${selectedCategories}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products-count?category=${selectedCategories}&contains=${debouncedKeyword}`
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE))
  );

  const { data: products, isLoading } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectedCategories}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
    ],
    () => {
      const SKIP = TAKE * (activePage - 1);
      const response = fetch(
        `/api/get-products?skip=${SKIP}&take=${TAKE}&category=${selectedCategories}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
      ).then((res) => res.json());
      return response;
    },
    { select: (data) => data.items }
  );

  const categoryOptions = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    const result = categories.map((category: categories) => ({
      label: category.name,
      value: String(category.id),
    }));
    result.unshift({ label: 'ALL', value: '-1' });

    return result;
  }, [categories]);

  const handleChangeCategory = (value: string) => {
    setSelectedCategories(value);
    activePage !== 1 && setPage(1);
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="w-full h-full pt-60pxr">
      <div className="mb-40pxr">
        <Input
          icon={<IconSearch />}
          placeholder="Search"
          value={keyword}
          onChange={handleChangeKeyword}
        />
      </div>

      <div className="flex justify-between mb-40pxr">
        {categories ? (
          <div>
            <SegmentedControl
              value={selectedCategories}
              onChange={handleChangeCategory}
              data={categoryOptions}
              color="dark"
            />
          </div>
        ) : (
          <div />
        )}

        <Select
          value={selectedFilter}
          onChange={(value: string) => setSelectedFilter(value)}
          data={FILTERS}
        />
      </div>

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
            products.map((prod, idx) => (
              <React.Fragment key={idx}>
                <ProductCard data={prod} />
              </React.Fragment>
            ))}
        </SimpleGrid>
      </Container>

      {!products ||
        (products.length === 0 && (
          <Empty>
            <Image
              src="/images/mood-empty.png"
              alt="no-result"
              width={120}
              height={120}
            />
            <p className="pt-25pxr text-slate-400">검색된 결과가 없습니다.</p>
          </Empty>
        ))}

      <div className="w-full flex my-80pxr">
        <Pagination
          className="m-auto"
          page={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </div>
  );
}

const Empty = styled.div`
  width: 100%;
  height: 50vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
