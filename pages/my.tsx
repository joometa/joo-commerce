import { OrderItem, Orders } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as My from '@components/pages/my';
import { OrderDetail } from '@components/pages/my/types';

export const ORDER_QUERY_KEY = '/api/get-order';

export default function MyPage() {
  const queryClient = useQueryClient();

  const { data: orderItems } = useQuery<
    { items: OrderDetail[] },
    unknown,
    OrderDetail[]
  >([ORDER_QUERY_KEY], () => {
    const response = fetch(ORDER_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items);
    return response;
  });

  const { mutate: fetchUpdateOrderStatus } = useMutation<
    unknown,
    unknown,
    OrderDetail,
    any
  >(
    (item) =>
      fetch('/api/update-order-status', {
        method: 'POST',
        body: JSON.stringify({
          id: item.id,
          userId: item.userId,
          isPayed: !(item.status === 5),
        }),
      })
        .then((res) => res.json())
        .then((res) => res.items),
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries([ORDER_QUERY_KEY]);

        const previous = queryClient.getQueryData([ORDER_QUERY_KEY]);
        queryClient.setQueryData<OrderDetail[]>([ORDER_QUERY_KEY], (old) =>
          old?.map((c) => {
            const status = item.status === 5 ? 5 : 2;
            if (c.id === item.id) {
              c.status = status;
            }
            return c;
          })
        );

        return { previous };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData([ORDER_QUERY_KEY], context?.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
    }
  );
  const { mutate: fetchDeleteOrder } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    (id) =>
      fetch('/api/delete-order', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((res) => res.json())
        .then((res) => res.items),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([ORDER_QUERY_KEY]);

        const previous = queryClient.getQueryData([ORDER_QUERY_KEY]);
        queryClient.setQueryData<OrderDetail[]>([ORDER_QUERY_KEY], (old) =>
          old?.filter((c) => c.id !== id)
        );

        return { previous };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData([ORDER_QUERY_KEY], context?.previous);
      },
      onSuccess: () => {
        alert('주문정보가 삭제되었습니다.');
        queryClient.invalidateQueries([ORDER_QUERY_KEY]);
      },
    }
  );

  const handleCompletePayment = (data: OrderDetail) => {
    fetchUpdateOrderStatus(data);
  };

  const handleDeleteOrder = (id: number) => {
    fetchDeleteOrder(id);
  };

  return (
    <div className="pt-30pxr">
      <span className="text-2xl">
        주문내역 ({orderItems && orderItems.length})
      </span>
      <div className="flex mt-20pxr">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {orderItems ? (
            orderItems.length > 0 ? (
              orderItems.map((item, idx) => (
                <My.DetailItem
                  key={idx}
                  data={item}
                  onCompletePay={handleCompletePayment}
                  onDelete={handleDeleteOrder}
                />
              ))
            ) : (
              <div>주문내역이 비었습니다.</div>
            )
          ) : (
            <div>불러오는 중..</div>
          )}
        </div>
      </div>
    </div>
  );
}
