import { IconHeart, IconHome, IconShoppingCart, IconUser } from '@tabler/icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClickHome = () => router.push('/');
  const handleClickProfile = () => router.push('/my');
  const handleClickCart = () => router.push('/cart');
  const handleClickWishlist = () => router.push('/wishlist');

  const handleClickLogin = () => signIn();
  const handleClickLogout = () => signOut();

  return (
    <div className="fixed top-0 left-0 w-full px-10 pt-2 pb-0 z-50 bg-white">
      <div className="w-full flex justify-end text-xs text-gray-400">
        {session ? (
          <a onClick={handleClickLogout}>로그아웃</a>
        ) : (
          <a onClick={handleClickLogin}>로그인</a>
        )}
      </div>
      <div className="w-full py-5 flex justify-between">
        <Image src="/images/logo.png" alt="logo" width={100} height={24} />
        <div className="flex w-auto">
          <IconHome className="mr-4" onClick={handleClickHome} />
          <IconHeart className="mr-4" onClick={handleClickWishlist} />
          <IconShoppingCart onClick={handleClickCart} />

          {session && (
            <Image
              className="ml-4"
              src={session.user?.image!}
              alt="user-image"
              width={30}
              height={30}
              style={{ borderRadius: '50%' }}
              onClick={handleClickProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}
