import { categories, products } from '@prisma/client';
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Pagination } from '@mantine/core';
import { TAKE, CATEGORY_MAP, FILTERS } from '@constants/products';
import { SegmentedControl, Select } from '@mantine/core';

export default function Products() {
  const [activePage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<products[]>([]);
  const [categories, setCategories] = useState<categories[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string>('-1');
  const [selectedFilter, setSelectedFilter] = useState<string>('latest');

  const categoryOptions = useMemo(() => {
    if (categories.length === 0) return [];

    const result = categories.map((category) => ({
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

  useEffect(() => {
    fetch('/api/get-categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.items);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategories}`)
      .then((res) => res.json())
      .then((data) => {
        const TOTAL_COUNT = Math.ceil(data.items / TAKE);
        setTotal(TOTAL_COUNT);
      });
  }, [selectedCategories]);

  useEffect(() => {
    const SKIP = TAKE * (activePage - 1);
    fetch(
      `/api/get-products?skip=${SKIP}&take=${TAKE}&category=${selectedCategories}&orderBy=${selectedFilter}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, [activePage, selectedCategories, selectedFilter]);

  return (
    <div className="px-36 mt-36 mb-36">
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
            <div key={prod.id}>
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
