import styled from '@emotion/styled';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export default function Main({ children }: Props) {
  return <Container className="pt-60pxr">{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
