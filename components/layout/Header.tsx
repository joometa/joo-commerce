import styled from '@emotion/styled';
import { IconHeart, IconHome, IconShoppingCart, IconUser } from '@tabler/icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const handleClickHome = () => router.push('/');
  const handleClickProfile = () => router.push('/my');
  const handleClickCart = () => router.push('/cart');
  const handleClickWishlist = () => router.push('/wishlist');

  const handleClickLogin = () => {
    signIn();
  };
  const handleClickLogout = () => signOut();

  const handleScroll = (e: any) => {
    setScrollHeight(e.srcElement.scrollingElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full px-100pxr z-50 bg-white h-100pxr box-border"
      style={{
        borderBottom:
          scrollHeight === 0 ? '1px solid #ffffff' : '1px solid #e6e5e5',
      }}
    >
      <div
        className="w-full flex justify-end text-xs text-gray-400 pt-8pxr"
        style={{ height: '30%', cursor: 'pointer' }}
      >
        {session ? (
          <a onClick={handleClickLogout}>로그아웃</a>
        ) : (
          <a onClick={handleClickLogin}>로그인</a>
        )}
      </div>
      <div
        className="w-full my-auto flex justify-between pb-18pxr pt-8pxr"
        style={{ height: '70%' }}
      >
        <Image src="/images/logo.png" alt="logo" width={100} height={28} />
        <IconGroup className="h-28pxr">
          <IconHome
            className="mr-30pxr"
            onClick={handleClickHome}
            style={{ width: '100%', height: '100%' }}
          />
          <IconHeart
            className="mr-30pxr"
            onClick={handleClickWishlist}
            style={{ width: '100%', height: '100%' }}
          />
          <IconShoppingCart
            onClick={handleClickCart}
            style={{ width: '100%', height: '100%' }}
          />

          {session && (
            <div className="w-172pxr ml-40pxr">
              <Image
                src={session.user?.image!}
                alt="user-image"
                width={28}
                height={28}
                style={{ borderRadius: '50%' }}
                onClick={handleClickProfile}
              />
            </div>
          )}
        </IconGroup>
      </div>
    </div>
  );
}

const IconGroup = styled.div`
  display: flex;
  width: auto;
  margin-top: auto;
  margin-bottom: auto;
  > * {
    cursor: pointer;
    transition: transform 150ms ease;
    &:hover {
      transform: scale(1.2);
    }
  }
`;
