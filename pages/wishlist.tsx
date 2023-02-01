import { CATEGORY_MAP } from '@constants/products';
import { products } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Wishlist() {
  const router = useRouter();
  const { data: products } = useQuery<
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

  return (
    <div>
      <p className="text-2xl mb-4">내가 찜한 상품</p>
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
    </div>
  );
}
