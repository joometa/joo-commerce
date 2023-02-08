import styled from '@emotion/styled';
import { CartItem } from '@components/pages/cart/types';
import { useMemo } from 'react';
import { Button } from '@mantine/core';

interface Props {
  items: CartItem[];
  onOrder: () => void;
}

export function Receipt({ items, onOrder }: Props) {
  const deliveryAmount = items && items.length > 0 ? 5000 : 0;
  const discountAmount = 0;

  const amount = useMemo(() => {
    if (!items) return 0;
    return items.map((data) => data.amount).reduce((pre, cur) => pre + cur, 0);
  }, [items]);

  return (
    <Wrapper>
      <h1 className="text-xl font-bold">INFORMATION</h1>
      <div className="mt-30pxr">
        <RowItem>
          <span className="category">금액</span>
          <div className="content">{amount.toLocaleString('ko-kr')} 원</div>
        </RowItem>
        <RowItem>
          <span className="category">배송비</span>
          <div className="content">
            {deliveryAmount.toLocaleString('ko-kr')} 원
          </div>
        </RowItem>
        <RowItem>
          <span className="category">할인 금액</span>
          <div className="content">
            {discountAmount.toLocaleString('ko-kr')} 원
          </div>
        </RowItem>
        <RowItem>
          <span className="category">결제 금액</span>
          <div className="content" style={{ color: 'red' }}>
            {(amount + deliveryAmount - discountAmount).toLocaleString('ko-kr')}{' '}
            원
          </div>
        </RowItem>
      </div>

      <Button
        size="md"
        radius={8}
        style={{ backgroundColor: '#000', marginTop: '50px' }}
        styles={{
          root: { paddingRight: 14, height: 48 },
        }}
        onClick={onOrder}
      >
        구매하기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  padding-top: 0;
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
  }
`;
