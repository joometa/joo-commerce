import { OrderItemDetail } from './types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Button } from '@mantine/core';

interface Props {
  data: OrderItemDetail & { status: number };
}

export function Item({ data }: Props) {
  const router = useRouter();
  const TOTAL_COST = (data.price * data.quantity).toLocaleString('ko-kr');

  const handleClickComment = () => {
    router.push(
      `/comment/edit?orderItemId=${data.id}&productId=${data.productId}`
    );
  };

  return (
    <Wrapper>
      <Image
        src={data.image_url}
        width={150}
        height={150}
        alt="cart-prod-image"
        onClick={() => router.push(`/products/${data.productId}`)}
      />
      <div className="w-full flex flex-col justify-between ml-14pxr">
        <div className="w-full flex justify-between ">
          <span className="font-bold text-lg">{data.name}</span>
        </div>

        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col justify-between items-start md:items-end">
            <div className="flex flex-col justify-around py-10pxr">
              <p className="font-normal text-sm text-slate-400">
                {data.price.toLocaleString('ko-kr')}원 * {data.quantity}개
              </p>
              <p className="font-semibold">
                <span className="text-md text-green-600">₩</span> {TOTAL_COST}
              </p>
            </div>
          </div>
        </div>
      </div>
      {data.status === 5 && (
        <>
          <Button
            style={{
              backgroundColor: '#000',
              color: '#ffffff',
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}
            onClick={handleClickComment}
          >
            후기 쓰기
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding: 14px;
  transition: transform 150ms ease, box-shadow 150ms ease;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.01), 2px 2px 2px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.23);
  }
`;
