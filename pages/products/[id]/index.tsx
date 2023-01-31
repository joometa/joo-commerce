import { CATEGORY_MAP } from '@constants/products';
import { Button } from '@mantine/core';
import { products } from '@prisma/client';
import { IconHeart } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import CustomEditor from 'components/Editor';
import { format } from 'date-fns';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const product = await fetch(
    `http:localhost:3000/api/get-product?id=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items);
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    }, // will be passed to the page component as props
  };
};

const WISHLIST_QUERY_KEY = '/api/get-wishlist';

export default function Products(props: {
  product: products & { images: string[] };
}) {
  const router = useRouter();
  const { id: productId } = router.query;
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  );
  const [index, setIndex] = useState<number>(0);
  const product = props.product;

  const { data: wishlist } = useQuery([WISHLIST_QUERY_KEY], () =>
    fetch(WISHLIST_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items)
  );

  if (product == null || productId == null) {
    return <div>로딩중</div>;
  }

  return (
    <div className="p-24 flex flex-row">
      <div style={{ width: '50%', marginRight: 52 }}>
        <Carousel
          animation="zoom"
          autoplay
          withoutControls
          wrapAround
          speed={3}
          slideIndex={index}
        >
          {product &&
            product.images.map((url, idx) => (
              <Image
                src={url}
                key={`${url}-carousel-${idx}`}
                alt="image"
                width={1000}
                height={1000}
                layout="responsive"
              />
            ))}
        </Carousel>
        <div className="flex space-x-4 mt-2">
          {product &&
            product.images.map((url, idx) => (
              <Image
                src={url}
                key={`${url}-image-${idx}`}
                alt="image"
                width={100}
                height={100}
                onClick={() => {
                  setIndex(idx);
                }}
              />
            ))}
        </div>
        {editorState != null && (
          <CustomEditor editorState={editorState} readOnly />
        )}
      </div>
      <div className="flex flex-col space-y-6">
        <div className="text-lg text-zinc-400">
          {CATEGORY_MAP[product.category_id - 1]}
        </div>
        <div className="text-4xl font-semibold">{product.name}</div>
        <div className="text-lg">{product.price.toLocaleString('ko-kr')}원</div>
        <>{wishlist}</>
        <Button leftIcon={<IconHeart />} style={{ backgroundColor: '#2979ff' }}>
          찜하기
        </Button>
        <div className="text-sm text-zinc-300">
          등록 : {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
        </div>
      </div>
    </div>
  );
}
