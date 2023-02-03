import styled from '@emotion/styled';
import Image from 'next/image';

interface Props {
  src: string;
  size?: number;
}

export default function AutoSizeImage({ src, size = 500 }: Props) {
  return (
    <AutoSizeImageWrapper size={size}>
      <Image src={src} alt="" layout="fill" objectFit="contain" />
    </AutoSizeImageWrapper>
  );
}

const AutoSizeImageWrapper = styled.div<{ size: number }>`
  width: ${(props) => (props.size ? `${props.size}px` : '500px')};
  height: ${(props) => (props.size ? `${props.size}px` : '500px')};
  position: relative;
`;
