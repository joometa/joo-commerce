import CommentItem from '@components/CommentItem';
import { CountControl } from '@components/common/CountControl';
import { CATEGORY_MAP } from '@constants/products';
import { Button } from '@mantine/core';
import { Cart, Comment, OrderItem, products } from '@prisma/client';
import { IconHeart, IconHeartbeat, IconShoppingCart } from '@tabler/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CustomEditor from '@components/common/Editor';
import { format } from 'date-fns';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import { CART_QUERY_KEY } from 'pages/cart';
import { ORDER_QUERY_KEY } from 'pages/my';
import { useEffect, useMemo, useState } from 'react';
import { easeCubicOut } from 'd3-ease';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const product = await fetch(
    `${process.env.NEXTAUTH_URL}/api/get-product?id=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items);

  const comments = await fetch(
    `${process.env.NEXTAUTH_URL}/api/get-comments?productId=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items);
  return {
    props: {
      product: {
        ...product,
        images: [product?.image_url, '/images/coming-soon.png'],
      },
      comments: comments,
    },
  };
};

export interface CommentItemType extends Comment, OrderItem {}

interface Props {
  product: products & { images: string[] };
  comments: CommentItemType[];
}

const WISHLIST_QUERY_KEY = '/api/get-wishlist';

export default function Products({ ...props }: Props) {
  const { product, comments } = props;
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

  const { mutate: fetchUpdateWishlist } = useMutation<
    unknown,
    unknown,
    string,
    any
  >(
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
  const { mutate: fetchAddOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, 'id'>[],
    any
  >(
    (items) =>
      fetch(ORDER_QUERY_KEY, {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((res) => res),
    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push('/my');
      },
    }
  );

  const isWished = useMemo(() => {
    if (!wishlist) return false;
    return wishlist.includes(productId);
  }, [wishlist, productId]);

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
    if (type === 'order') {
      fetchAddOrder([
        {
          productId: product.id,
          quantity: quantity || 1,
          amount: product.price * (quantity || 1),
          price: product.price,
        },
      ]);
    }
  };

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
      fetchUpdateWishlist(String(productId));
    }
  };

  const handleClickOrder = () => {
    if (session == null) {
      alert('로그인이 필요한 기능입니다.');
      router.push('/auth/login');
      return;
    }
    validate('order');
  };

  const totalCost = useMemo(() => {
    if (product.price == null || quantity == null) return 0;
    return product.price * quantity;
  }, [quantity, product.price]);

  if (product == null || productId == null) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <div className="flex flex-row  pt-80pxr divide-x divide-slate-200">
        <div className="w-full pr-40pxr">
          <Carousel
            animation="fade"
            withoutControls
            wrapAround
            easing={easeCubicOut}
            speed={1}
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
          <div className="flex mt-20pxr space-x-10pxr">
            {product &&
              product.images.map((url, idx) => (
                <div
                  className="flex items-center"
                  key={`${url}-image-${idx}`}
                  style={{
                    borderRadius: '10px',
                    marginLeft: idx === 0 ? '0' : '10px',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={url}
                    alt="image"
                    width={80}
                    height={80}
                    onClick={() => {
                      setIndex(idx);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col space-y-6 w-full pl-40pxr">
          <div className="text-4xl font-semibold">{product.name}</div>

          <section className="mt-25pxr mb-24pxr">
            <h3 className="text-sm text-slate-400">상품설명</h3>
            {editorState != null ? (
              <CustomEditor editorState={editorState} readOnly />
            ) : (
              <div>내용 준비 중 입니다.</div>
            )}
          </section>

          <section className="space-y-24pxr">
            <div className="divide-y divide-slate-200 space-y-24pxr">
              <div className="w-full h-56pxr flex justify-between items-center">
                <span className="text-sm text-slate-400">수량</span>
                <div className="flex justify-end h-full items-center">
                  <CountControl
                    value={quantity}
                    setValue={setQuantity}
                    max={200}
                  />
                </div>
              </div>

              <div className="w-full h-56pxr flex justify-between items-center">
                <span className="text-sm text-slate-400">금액</span>
                <div className="flex justify-end h-full items-center font-semibold">
                  {product.price.toLocaleString('ko-kr')}원
                </div>
              </div>

              <div className="w-full h-90pxr flex justify-between items-center">
                <span className="text-sm text-slate-400">총금액</span>
                <div className="flex justify-end h-full items-center font-semibold text-xl">
                  <div className="flex flex-col items-end">
                    <span className="text-blue-400 font-light text-xs">{`${
                      product.price.toLocaleString('ko-kr') ?? 0
                    } * ${quantity ?? 1}`}</span>
                    {totalCost.toLocaleString('ko-kr')}원
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-15pxr w-full">
              <Button
                disabled={wishlist == null}
                leftIcon={<IconShoppingCart size={20} stroke={1.5} />}
                style={{
                  backgroundColor: '#2979ff',
                  height: '48px',
                  width: '50%',
                }}
                size="md"
                radius={8}
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
                style={{
                  backgroundColor: isWished ? 'lightgray' : '#f05650',
                  height: '48px',
                  width: '50%',
                }}
                size="md"
                radius={8}
                onClick={handleClickWish}
              >
                찜하기
              </Button>
            </div>
            <Button
              style={{
                // backgroundColor: '#2979ff',
                backgroundColor: '#000',
                height: '48px',
                width: '100%',
              }}
              size="md"
              radius={8}
              onClick={handleClickOrder}
            >
              구매하기
            </Button>
          </section>

          <div
            className="mt-100pxr flex justify-between py-20pxr text-sm"
            style={{
              border: '1px solid rgb(226,232,240,1)',
              borderRight: 'none',
              borderLeft: 'none',
            }}
          >
            <div className="text-slate-400">상품 정보</div>
            <div className="flex justify-between" style={{ width: '50%' }}>
              <div>
                <span className="text-slate-400">분류</span>
                <p>{CATEGORY_MAP[product.category_id - 1]}</p>
              </div>
              <div>
                <span className="text-slate-400">등록일</span>
                <p>{format(new Date(product.createdAt), 'yy/MM/dd')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-40pxr">
        <p className="text-2xl font-semibold">후기</p>
        {comments && comments.length > 0 ? (
          comments.map((comment, idx) => (
            <CommentItem key={idx} item={comment} />
          ))
        ) : (
          <div>등록된 후기가 없습니다.</div>
        )}
      </div>
    </>
  );
}
