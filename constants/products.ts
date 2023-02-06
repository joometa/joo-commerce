export const CATEGORY_MAP = ['Sneakers', 'T-Shirt', 'Pants', 'Cap', 'Hoodie'];
export const CATEGORY_COLOR_MAP = [
  'red',
  'orange',
  'yellow',
  'indigo',
  'violet',
];
export const TAKE = 9;

export const FILTERS = [
  { label: '최신순', value: 'latest' },
  { label: '가격 높은순', value: 'expensive' },
  { label: '가격 낮은순', value: 'cheap' },
];

export const getOrderBy = (value: string) => {
  if (value === 'latest') return { orderBy: { createdAt: 'desc' } };
  if (value === 'expensive') return { orderBy: { price: 'desc' } };
  if (value === 'cheap') return { orderBy: { price: 'asc' } };

  return undefined;
};
