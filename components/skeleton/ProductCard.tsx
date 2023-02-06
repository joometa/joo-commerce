import { AspectRatio, Card, Skeleton } from '@mantine/core';

export function ProductCard() {
  return (
    <Card p="md" radius="md" component="a" style={{ height: '100%' }}>
      <AspectRatio ratio={1920 / 1920}>
        <Skeleton height="100%" radius="md" />
      </AspectRatio>
      <Skeleton height={20} mt={15} width="60%" radius="xl" />
      <Skeleton height={13} mt={13} width="75%" radius="xl" />
      <Skeleton height={13} mt={10} width="75%" radius="xl" />
      <Skeleton height={13} mt={10} width="25%" radius="xl" />
    </Card>
  );
}
