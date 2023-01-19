import { products } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Pagination } from '@mantine/core';

const TAKE = 9;

export default function Products() {
  const [activePage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    fetch('/api/get-products-count')
      .then((res) => res.json())
      .then((data) => {
        const TOTAL_COUNT = Math.ceil(data.items / TAKE);
        setTotal(TOTAL_COUNT);
      });

    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  useEffect(() => {
    const SKIP = TAKE * (activePage - 1);
    fetch(`/api/get-products?skip=${SKIP}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, [activePage]);

  return (
    <div className="px-36 mt-36 mb-36">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((prod) => (
            <div key={prod.id}>
              <Image
                className="rounded"
                src={prod.image_url ?? ''}
                alt={prod.name}
                width={300}
                height={200}
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
                {prod.category_id === 1 && '의류'}
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