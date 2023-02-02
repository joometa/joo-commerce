import { IconHeart, IconHome, IconShoppingCart, IconUser } from '@tabler/icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClickHome = () => router.push('/');
  const handleClickUser = () => router.push('/auth/login');
  const handleClickProfile = () => router.push('/my');
  const handleClickCart = () => router.push('/cart');
  const handleClickWishlist = () => router.push('/wishlist');

  return (
    <div className="mt-12 mb-12">
      <div className="w-full flex h-50 items-center">
        <IconHome onClick={handleClickHome} />
        <span className="m-auto" />
        <IconHeart className="mr-4" onClick={handleClickWishlist} />
        <IconShoppingCart className="mr-4" onClick={handleClickCart} />
        {session ? (
          <Image
            src={session.user?.image!}
            alt="user-image"
            width={30}
            height={30}
            style={{ borderRadius: '50%' }}
            onClick={handleClickProfile}
          />
        ) : (
          <IconUser onClick={handleClickUser} />
        )}
      </div>
    </div>
  );
}
