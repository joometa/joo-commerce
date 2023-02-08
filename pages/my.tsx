import { CountControl } from '@components/common/CountControl';
import { CATEGORY_MAP } from '@constants/products';
import styled from '@emotion/styled';
import { Badge, Button } from '@mantine/core';
import { Cart, OrderItem, Orders, products } from '@prisma/client';
import { IconRefresh, IconX } from '@tabler/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

interface OrderItemDetail extends OrderItem {
  name: string;
  image_url: string;
}

interface OrderDetail extends Orders {
  orderItems: OrderItemDetail[];
}

const ORDER_STATUS_MAP = [
  '주문취소',
  '주문대기',
  '결제대기',
  '결제완료',
  '배송대기',
  '배송중',
  '배송완료',
  '환불대기',
  '환불완료',
  '반품대기',
  '반품완료',
];

export const ORDER_QUERY_KEY = '/api/get-order';

export default function MyPage() {
  const { data: orderItems } = useQuery<
    { items: OrderDetail[] },
    unknown,
    OrderDetail[]
  >([ORDER_QUERY_KEY], () => {
    const response = fetch(ORDER_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items);
    return response;
  });

  return (
    <div>
      <span className="text-2xl mb-3">
        주문내역 ({orderItems && orderItems.length})
      </span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {orderItems ? (
            orderItems.length > 0 ? (
              orderItems.map((item, idx) => <DetailItem key={idx} {...item} />)
            ) : (
              <div>주문내역이 비었습니다.</div>
            )
          ) : (
            <div>불러오는 중..</div>
          )}
        </div>
      </div>
    </div>
  );
}

const DetailItem = (props: OrderDetail) => {
  const queryClient = useQueryClient();
  const [isPayed, setIsPayed] = useState<boolean>(props.status === 5);

  const { mutate: fetchUpdateOrderStatus } = useMutation<
    unknown,
    unknown,
    OrderDetail,
    any
  >(
    (item) =>
      fetch('/api/update-order-status', {
        method: 'POST',
        body: JSON.stringify({
          id: props.id,
          userId: props.userId,
          isPayed: !isPayed,
        }),
      })
        .then((res) => res.json())
        .then((res) => res.items),
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries([ORDER_QUERY_KEY]);

        const previous = queryClient.getQueryData([ORDER_QUERY_KEY]);
        queryClient.setQueryData<OrderDetail[]>([ORDER_QUERY_KEY], (old) =>
          old?.map((c) => {
            const status = isPayed ? 5 : 2;
            if (c.id === item.id) {
              c.status = status;
            }
            return c;
          })
        );

        return { previous };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData([ORDER_QUERY_KEY], context?.previous);
      },
      onSuccess: () => {
        setIsPayed(!isPayed);
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
    }
  );

  const handleClickPay = async () => {
    fetchUpdateOrderStatus(props);
  };

  return (
    <div
      className="w-full flex flex-col p-4 rounded-md"
      style={{ border: '1px solid gray' }}
    >
      <div className="flex">
        <Badge className="mb-2">{ORDER_STATUS_MAP[props.status + 1]}</Badge>
        <IconX className="ml-auto" />
      </div>
      {props.orderItems.map((orderItem, idx) => (
        <Item key={idx} {...orderItem} status={props.status} />
      ))}
      <div className="flex mt-4">
        <div className="flex flex-col">
          <span className="mb-2">주문 정보</span>
          <span>받는사람: {props.receiver ?? '입력 필요'}</span>
          <span>주소: {props.address ?? '입력 필요'}</span>
          <span>연락처: {props.phoneNumber ?? '입력 필요'}</span>
        </div>
        <div className=" ml-auto mr-4 text-right flex flex-col">
          <span className="mb-2 font-semibold">
            합계 금액 :{' '}
            <span className="text-blue-500">
              {props.orderItems
                .map((item) => item.amount)
                .reduce((prev, cur) => prev + cur, 0)
                .toLocaleString('ko-kr')}{' '}
              원
            </span>
          </span>
          <span className="text-zinc-400 mt-auto mb-auto">
            주문일자 :{' '}
            {format(new Date(props.createdAt), 'yyyy년 M월 d일 HH:mm:ss')}
          </span>
          <Button
            style={{ backgroundColor: '#2979ff', color: '#ffffff' }}
            onClick={handleClickPay}
          >
            {isPayed ? '결제 처리 취소' : '결제 처리'}
          </Button>
        </div>
      </div>
    </div>
  );
};
const Item = (props: OrderItemDetail & { status: number }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  const handleClickComment = () => {
    router.push(`/comment/edit?orderItemId=${props.id}`);
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
        <span className="mb-auto">
          가격 : {props.price.toLocaleString('ko-kr')} 원
        </span>
        <div className="flex items-center space-x-4">
          <CountControl value={quantity} setValue={setQuantity} />
        </div>
      </div>
      <div className="flex flex-col ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')} 원</span>

        {props.status === 5 && (
          <>
            <Button
              style={{ backgroundColor: '#2979ff', color: '#ffffff' }}
              onClick={handleClickComment}
            >
              후기 작성
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
