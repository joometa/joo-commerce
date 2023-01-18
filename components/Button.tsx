/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode | null;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({ children }: Props) {
  return (
    <button
      css={css`
        padding: 15px;
        background-color: lightblue;
        border-radius: 15px;
      `}
    >
      {children}
    </button>
  );
}
