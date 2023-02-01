/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode | null;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({ children, onClick }: Props) {
  return (
    <button
      css={css`
        padding: 10px 14px;
        background-color: #2979ff;
        border-radius: 15px;
        color: #ffffff;
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
