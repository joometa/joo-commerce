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
        padding: 15px;
        background-color: lightblue;
        border-radius: 15px;
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
