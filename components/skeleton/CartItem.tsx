import React from 'react';
import { Skeleton } from '@mantine/core';
import styled from '@emotion/styled';

export function CartItem() {
  return (
    <Wrapper>
      <Skeleton width={150} height={150} />

      <div className="flex flex-col w-full ml-20pxr justify-between my-10pxr">
        <Skeleton height={20} width="30%" radius="xl" />
        <Skeleton height={13} mt={13} width="40%" radius="xl" />
        <div className="flex justify-between items-end">
          <Skeleton height={40} mt={13} width="65%" radius="xl" />
          <Skeleton height={15} mt={13} width="20%" radius="xl" />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
`;
