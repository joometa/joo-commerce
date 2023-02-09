import { Badge, Button } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { Item } from './Item';
import { format } from 'date-fns';
import { OrderDetail } from './types';
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';

interface Props {
  data: OrderDetail;
  onCompletePay: (params: OrderDetail) => void;
  onDelete: (id: number) => void;
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

export function DetailItem({ data, onCompletePay, onDelete }: Props) {
  const handleClickPay = async () => {
    onCompletePay(data);
  };

  const handleDelete = () => {
    onDelete(data.id);
  };

  return (
    <Wrapper>
      <div className="flex pb-12pxr">
        <Badge className="mb-2">{ORDER_STATUS_MAP[data.status + 1]}</Badge>
        <IconX className="ml-auto cursor-pointer" onClick={handleDelete} />
      </div>

      <div className="flex flex-col space-x-30pxr sm:flex-row">
        <div className="w-full sm:w-1/2">
          {data.orderItems.map((orderItem, idx) => (
            <Item key={idx} data={{ ...orderItem, status: data.status }} />
          ))}
        </div>

        <div className="flex w-full sm:w-1/2 pr-30pxr mb-20pxr">
          <div className="flex flex-col w-full">
            <h2 className="text-xl font-bold">주문 정보</h2>
            <div className="my-10pxr">
              <RowItem>
                <span className="category">받는사람</span>
                <div className="content">{data.receiver ?? '입력 필요'}</div>
              </RowItem>
              <RowItem>
                <span className="category">주소</span>
                <div className="content">{data.address ?? '입력 필요'}</div>
              </RowItem>
              <RowItem>
                <span className="category">연락처</span>
                <div className="content">{data.phoneNumber ?? '입력 필요'}</div>
              </RowItem>
              <RowItem>
                <span className="category">주문일자</span>
                <div className="content">
                  {format(new Date(data.createdAt), 'yy/MM/dd')}
                </div>
              </RowItem>
              <RowItem>
                <span className="category">합계금액</span>
                <div className="content total-cost text-red-500">
                  {data.orderItems
                    .map((item) => item.amount)
                    .reduce((prev, cur) => prev + cur, 0)
                    .toLocaleString('ko-kr')}{' '}
                  원
                </div>
              </RowItem>
            </div>
            <Button
              style={{
                backgroundColor: '#2979ff',
                color: '#ffffff',
              }}
              onClick={handleClickPay}
              styles={{
                root: { height: 48 },
              }}
            >
              {data.status === 5 ? '결제 처리 취소' : '결제 처리'}
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid gray; */
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05), 0 2px 5px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 30px;
`;

const RowItem = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .category {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgb(148 163 184 / 1);
  }
  .content {
    display: flex;
    justify-content: flex-end;
    font-weight: 600;
    align-items: center;
    height: 100%;

    .total-cost {
      color: rgb(239 68 68 / 1);
    }
  }
`;
