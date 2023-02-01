import { CountControl } from '@components/CountControl';
import { CATEGORY_MAP } from '@constants/products';
import { Button } from '@mantine/core';
import { Cart, products } from '@prisma/client';
import { IconHeart, IconHeartbeat, IconShoppingCart } from '@tabler/icons';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import CustomEditor from 'components/Editor';
import { format } from 'date-fns';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import { CART_QUERY_KEY } from 'pages/cart';
import { useEffect, useMemo, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const product = await fetch(
    `${process.env.NEXTAUTH_URL}/api/get-product?id=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items);
  return {
    props: {
      product: { ...product, images: [product?.image_url, product?.image_url] },
    }, // will be passed to the page component as props
  };
};

const WISHLIST_QUERY_KEY = '/api/get-wishlist';

export default function Products(props: {
  product: products & { images: string[] };
}) {
  const product = props.product;
  const router = useRouter();
  const { data: session } = useSession();
  const { id: productId } = router.query;
  const queryClient = useQueryClient();

  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  );
  const [index, setIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number | undefined>(1);

  const { data: wishlist } = useQuery([WISHLIST_QUERY_KEY], () =>
    fetch(WISHLIST_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items)
  );

  const { mutate } = useMutation<unknown, unknown, string, any>(
    (productId: string) =>
      fetch('/api/update-wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((res) => res.items),
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries([WISHLIST_QUERY_KEY]);

        const previous = queryClient.getQueryData([WISHLIST_QUERY_KEY]);
        queryClient.setQueryData<string[]>([WISHLIST_QUERY_KEY], (old) => {
          if (old == null) return [];
          return old.includes(String(productId))
            ? old.filter((id) => id !== String(productId))
            : old.concat(String(productId));
        });
        return { previous };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData([WISHLIST_QUERY_KEY], context?.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_QUERY_KEY]);
      },
    }
  );
  const { mutate: fetchAddCart } = useMutation<
    unknown,
    unknown,
    Omit<Cart, 'id' | 'userId'>,
    any
  >(
    (item) =>
      fetch('/api/add-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((res) => res),
    {
      onMutate: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push('/cart');
      },
    }
  );

  const isWished = useMemo(() => {
    if (!wishlist) return false;
    return wishlist.includes(productId);
  }, [wishlist, productId]);

  const handleClickCart = async () => {
    if (session == null) {
      alert('로그인이 필요한 기능입니다.');
      router.push('/auth/login');
      return;
    }
    validate('cart');
  };

  const handleClickWish = () => {
    if (session == null) {
      alert('로그인이 필요한 기능입니다.');
      router.push('/auth/login');
      return;
    }
    if (productId != null) {
      mutate(String(productId));
    }
  };

  const validate = (type: 'cart' | 'order') => {
    if (quantity == null) {
      alert('최소 수량을 선택하세요.');
      return;
    }
    if (type === 'cart') {
      fetchAddCart({
        productId: product.id,
        quantity: quantity || 1,
        amount: product.price * (quantity || 1),
      });
    }
  };

  if (product == null || productId == null) {
    return <div>로딩중</div>;
  }

  return (
    <div className="flex flex-row">
      <div style={{ width: '50%', marginRight: 52 }}>
        <Carousel
          animation="zoom"
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

        <div className="text-lg">
          <span>수량</span>
          <CountControl value={quantity} setValue={setQuantity} max={200} />
        </div>

        <div className="flex space-x-3">
          <Button
            disabled={wishlist == null}
            leftIcon={<IconShoppingCart size={20} stroke={1.5} />}
            style={{ backgroundColor: '#2979ff' }}
            size="md"
            radius={8}
            styles={{
              root: { paddingRight: 14, height: 48 },
            }}
            onClick={handleClickCart}
          >
            장바구니
          </Button>
          <Button
            disabled={wishlist == null}
            leftIcon={
              isWished ? (
                <IconHeart size={20} stroke={1.5} />
              ) : (
                <IconHeartbeat size={20} stroke={1.5} />
              )
            }
            style={{ backgroundColor: isWished ? '#f05650' : 'lightgray' }}
            size="md"
            radius={8}
            styles={{
              root: { paddingRight: 14, height: 48 },
            }}
            onClick={handleClickWish}
          >
            찜하기
          </Button>
        </div>
        <div className="text-sm text-zinc-300">
          등록 : {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
        </div>
      </div>
    </div>
  );
}
