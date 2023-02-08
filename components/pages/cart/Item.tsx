import { CountControl } from '@components/common/CountControl';
import { Cart } from '@prisma/client';
import { IconRefresh, IconX } from '@tabler/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CartItem } from './types';
import styled from '@emotion/styled';

interface Props {
  data: CartItem;
  onDelete: (id: number) => void;
  onUpdate: (data: CartItem) => void;
}

export function Item({ data, onDelete, onUpdate }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number | undefined>(data.quantity);
  const [amount, setAmount] = useState<number>(data.quantity);

  const handleUpdate = () => {
    const params = {
      ...data,
      quantity: quantity ?? data.quantity,
      amount: amount,
    };
    onUpdate(params);
  };

  const handleDelete = () => {
    onDelete(data.id);
  };

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * data.price);
    }
  }, [quantity, data.price]);

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
          <IconX onClick={handleDelete} />
        </div>

        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col justify-between items-start md:items-end">
            <div className="flex flex-col justify-around py-10pxr">
              <p className="font-normal text-md">
                <span className="text-md">₩</span>{' '}
                {data.price.toLocaleString('ko-kr')}
              </p>
              <div className="flex items-center">
                <CountControl value={quantity} setValue={setQuantity} />
                <IconRefresh className="ml-14pxr" onClick={handleUpdate} />
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end pb-10pxr">
            <p>
              <span className="text-md text-green-600">₩</span>{' '}
              {amount.toLocaleString('ko-kr')}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
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
