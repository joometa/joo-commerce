import { CountControl } from '@components/CountControl';
import { CATEGORY_MAP } from '@constants/products';
import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { products } from '@prisma/client';
import { IconRefresh, IconX } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

interface CartItem {
  name: string;
  productId: number;
  price: number;
  quantity: number;
  amount: number;
  image_url: string;
}

const mockData = [
  {
    name: '빛나는 등짝',
    productId: 100,
    price: 20000,
    quantity: 1,
    amount: 20000,
    image_url:
      'https://contents.lotteon.com/itemimage/_v174449/LO/19/73/58/58/25/_1/97/35/85/82/6/LO1973585825_1973585826_1.jpg/dims/optimize/dims/resizemc/500x500',
  },
  {
    name: '타락한 곰돌이 후드',
    productId: 91,
    price: 143200,
    quantity: 2,
    amount: 286400,
    image_url:
      'https://contents.lotteon.com/itemimage/_v154347/LE/12/08/71/72/82/_1/24/72/84/27/9/LE1208717282_1247284279_1.jpg/dims/optimize/dims/resizemc/500x500',
  },
];

export default function Cart() {
  const router = useRouter();
  const [data, setData] = useState<CartItem[]>(mockData);

  const amount = useMemo(() => {
    return data.map((data) => data.amount).reduce((pre, cur) => pre + cur, 0);
  }, [data]);

  const deliveryAmount = 5000;
  const discountAmout = 0;

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

  const handleOrder = () => {
    //TODO: 구매하기 기능 구현
    alert(`장바구니 담긴 물품 ${JSON.stringify(data)} 구매`);
  };

  return (
    <div>
      <span className="text-2xl mb-3">장바구니 ({data.length})</span>
      <div className="flex">
        <div>
          {data.map((item, idx) => (
            <Item key={idx} {...item} />
          ))}
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
  const router = useRouter();
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  const handleDelete = () => {
    //TODO: 장바구니에서 삭제 기능 구현
    alert(`장바구니에서 ${props.name} 삭제`);
  };
  const handleUpdate = () => {
    //TODO: 장바구니에서 수정 기능 구현
    alert(`장바구니에서 ${props.name} 수정`);
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
