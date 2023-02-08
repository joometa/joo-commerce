import { Button, Container, SimpleGrid } from '@mantine/core';
import { Cart, OrderItem, products } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ORDER_QUERY_KEY } from './my';
import Main from '@components/layout/Main';
import { ProductCard as SProductsCard } from '@components/skeleton/ProductCard';
import { ProductCard } from '@components/ProductCard';
import * as C from '@components/pages/cart';
import { CartItem } from '@components/pages/cart/types';

export const CART_QUERY_KEY = '/api/get-cart';

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const RECOMM_ITEM_COUNT = 4;

  const { data: cartItems } = useQuery<
    { items: CartItem[] },
    unknown,
    CartItem[]
  >([CART_QUERY_KEY], () => {
    const response = fetch(CART_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items);
    return response;
  });

  const { data: products, isLoading: isLoadingProd } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [`/api/get-products?skip=0&take=${RECOMM_ITEM_COUNT}`],
    () => {
      const response = fetch(
        `/api/get-products?skip=0&take=${RECOMM_ITEM_COUNT}`
      ).then((res) => res.json());
      return response;
    },
    { select: (data) => data.items }
  );

  const { mutate: fetchAddOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, 'id'>[],
    any
  >(
    (items) =>
      fetch('/api/add-order', {
        method: 'POST',
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push('/my');
      },
    }
  );

  const { mutate: fetchUpdateCart } = useMutation<unknown, unknown, Cart, any>(
    (item) =>
      fetch('/api/update-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((res) => res.items),
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const previous = queryClient.getQueryData([CART_QUERY_KEY]);
        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== item.id).concat(item)
        );
        return { previous };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context?.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );
  const { mutate: fetchDeleteCart } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    (id) =>
      fetch('/api/delete-cart', {
        method: 'POST',
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((res) => res.items),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const previous = queryClient.getQueryData([CART_QUERY_KEY]);
        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== id)
        );
        return { previous };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context?.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
        alert('상품이 장바구니에서 삭제되었습니다.');
      },
    }
  );

  const handleUpdate = (data: CartItem) => {
    if (data.quantity == null) {
      alert('최소 수량을 선택하세요.');
      return;
    }
    fetchUpdateCart({
      ...data,
      quantity: data.quantity,
      amount: data.price * data.quantity,
    });
  };

  const handleDelete = async (id: number) => {
    fetchDeleteCart(id, {
      onSuccess: () => {},
    });
  };

  const handleOrder = () => {
    if (cartItems == null) return;
    fetchAddOrder(
      cartItems.map((cart) => ({
        productId: cart.productId,
        price: cart.price,
        amount: cart.amount,
        quantity: cart.quantity,
      }))
    );
  };

  return (
    <Main>
      <h1 className="text-2xl mb-30pxr">
        장바구니 ({cartItems && cartItems.length})
      </h1>
      <div
        className="flex flex-col divide-x divide-slate-200 sm:flex-row"
        style={{ minHeight: '50vh' }}
      >
        <div className="w-full sm:w-1/2 p-14pxr">
          {cartItems ? (
            cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <C.Item
                  key={idx}
                  data={item}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            ) : (
              <div>장바구니함이 비었습니다.</div>
            )
          ) : (
            <div>불러오는 중..</div>
          )}
        </div>

        <div className="p-15pxr w-full sm:w-1/2">
          <div className="flex flex-col">
            <C.Receipt items={cartItems ?? []} onOrder={handleOrder} />
          </div>
        </div>
      </div>

      {/* 추천상품 */}
      <div className="w-full mt-50pxr">
        <h2 className="text-2xl mb-30pxr">추천상품</h2>
        <Container
          py="xl"
          style={{ width: '100%', maxWidth: '100%', padding: 0 }}
        >
          <SimpleGrid
            cols={4}
            breakpoints={[
              { maxWidth: 'md', cols: 2 },
              { maxWidth: 'xs', cols: 1 },
            ]}
          >
            {isLoadingProd &&
              Array.from({ length: 4 }).map((_, idx) => (
                <SProductsCard key={idx} />
              ))}

            {products &&
              products.map((prod, idx) => (
                <ProductCard key={idx} data={prod} />
              ))}
          </SimpleGrid>
        </Container>
      </div>
    </Main>
  );
}
