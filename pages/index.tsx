import { categories, products } from '@prisma/client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Input, Pagination } from '@mantine/core';
import { TAKE, CATEGORY_MAP, FILTERS } from '@constants/products';
import { SegmentedControl, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import useDebounce from '@hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

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

  const { data: products } = useQuery<
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
    <div className="mt-36 mb-36">
      <div className="mb-4">
        <Input
          icon={<IconSearch />}
          placeholder="Search"
          value={keyword}
          onChange={handleChangeKeyword}
        />
      </div>

      <div className="mb-4">
        <Select
          value={selectedFilter}
          onChange={(value: string) => setSelectedFilter(value)}
          data={FILTERS}
        />
      </div>

      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectedCategories}
            onChange={handleChangeCategory}
            data={categoryOptions}
            color="dark"
          />
        </div>
      )}
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => router.push(`/products/${prod.id}`)}
            >
              <Image
                className="rounded"
                src={prod.image_url ?? ''}
                alt={prod.name}
                width={320}
                height={350}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcu317PQAG0AKcthc3wwAAAABJRU5ErkJggg=="
              />

              <div className="flex">
                <span>{prod.name}</span>
                <span className="ml-auto">
                  {prod.price.toLocaleString('ko-kr')}원
                </span>
              </div>
              <span className="text-zinc-400">
                {CATEGORY_MAP[prod.category_id - 1]}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex mt-5">
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
