import { CountControl } from '@components/CountControl';
import { CATEGORY_MAP } from '@constants/products';
import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { Cart, products } from '@prisma/client';
import { IconRefresh, IconX } from '@tabler/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

interface CartItem extends Cart {
  name: string;
  price: number;
  image_url: string;
}

export const CART_QUERY_KEY = '/api/get-cart';

export default function CartPage() {
  const router = useRouter();

  const { data: cartItems } = useQuery<
    { items: CartItem[] },
    unknown,
    CartItem[]
  >([CART_QUERY_KEY], () => {
    const response = fetch(CART_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items);
    return response;
  });

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    ['/api/get-products?skip=0&take=3'],
    () => {
      const response = fetch('/api/get-products?skip=0&take=3').then((res) =>
        res.json()
      );
      return response;
    },
    { select: (data) => data.items }
  );

  const deliveryAmount = cartItems && cartItems.length > 0 ? 5000 : 0;
  const discountAmout = 0;
  const amount = useMemo(() => {
    if (!cartItems) return 0;
    return cartItems
      .map((data) => data.amount)
      .reduce((pre, cur) => pre + cur, 0);
  }, [cartItems]);

  const handleOrder = () => {
    //TODO: 구매하기 기능 구현
    alert(`장바구니 담긴 물품 ${JSON.stringify(cartItems)} 구매`);
  };

  return (
    <div>
      <span className="text-2xl mb-3">
        장바구니 ({cartItems && cartItems.length})
      </span>
      <div className="flex">
        <div>
          {cartItems &&
            cartItems.map((item, idx) => <Item key={idx} {...item} />)}
        </div>
        <div className="px-4">
          <div
            className="flex flex-col p-4 space-y-4"
            style={{ minWidth: 300, border: '1px solid grey' }}
          >
            <div>info</div>
            <Row>
              <span>금액</span>
              <span>{amount.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span>배송비</span>
              <span>{deliveryAmount.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span>할인 금액</span>
              <span>{discountAmout.toLocaleString('ko-kr')} 원</span>
            </Row>
            <Row>
              <span className="font-semibold">결제 금액</span>
              <span className="font-semibold text-red-500">
                {(amount + deliveryAmount - discountAmout).toLocaleString(
                  'ko-kr'
                )}{' '}
                원
              </span>
            </Row>

            <Button
              size="md"
              radius={8}
              style={{ backgroundColor: '#2979ff' }}
              styles={{
                root: { paddingRight: 14, height: 48 },
              }}
              onClick={handleOrder}
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <p>추천상품</p>
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
    </div>
  );
}

const Item = (props: CartItem) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  const { mutate: fetchUpdateCart } = useMutation<unknown, unknown, Cart, any>(
    (item) =>
      fetch('/api/update-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((res) => res.items),
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const previous = queryClient.getQueryData([CART_QUERY_KEY]);
        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== item.id).concat(item)
        );
        return { previous };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context?.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );
  const { mutate: fetchDeleteCart } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    (id) =>
      fetch('/api/delete-cart', {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((res) => res.items),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const previous = queryClient.getQueryData([CART_QUERY_KEY]);
        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== id)
        );
        return { previous };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context?.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );

  const handleUpdate = () => {
    if (quantity == null) {
      alert('최소 수량을 선택하세요.');
      return;
    }
    fetchUpdateCart({
      ...props,
      quantity: quantity,
      amount: props.price * quantity,
    });
  };

  const handleDelete = async () => {
    //TODO: 장바구니에서 삭제 기능 구현
    fetchDeleteCart(props.id, {
      onSuccess: () => {
        alert(`${props.name} 상품이 장바구니에서 삭제되었습니다.`);
      },
    });
  };

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price);
    }
  }, [quantity, props.price]);

  return (
    <div className="w-full flex p-4" style={{ borderBottom: '1px solid gray' }}>
      <Image
        src={props.image_url}
        width={150}
        height={150}
        alt="cart-prod-image"
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span className="font-semibold mb-2">
          가격 : {props.price.toLocaleString('ko-kr')} 원
        </span>
        <div className="flex items-center space-x-4">
          <CountControl value={quantity} setValue={setQuantity} />
          <IconRefresh onClick={handleUpdate} />
        </div>
      </div>
      <div className="flex al-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')} 원</span>
        <IconX onClick={handleDelete} />
      </div>
    </div>
  );
};

const Row = styled.div`
  display: flex;
  * ~ * {
    margin-left: auto;
  }
`;
