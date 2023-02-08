import { CATEGORY_MAP, CATEGORY_COLOR_MAP } from '@constants/products';
import {
  createStyles,
  Card,
  Image,
  Text,
  AspectRatio,
  Badge,
} from '@mantine/core';
import { products } from '@prisma/client';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

interface Props {
  data: products;
}

export function ProductCard({ data }: Props) {
  const { classes } = useStyles();
  const router = useRouter();

  const handleClickCard = () => {
    router.push(`/products/${data.id}`);
  };

  return (
    <Card
      p="md"
      radius="md"
      component="a"
      onClick={handleClickCard}
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1920}>
        <Image
          style={{ borderRadius: '10px' }}
          src={data.image_url}
          alt="product-thumbnail"
        />
      </AspectRatio>
      <Text className={classes.title} mt={10} size="lg">
        {data.name}
      </Text>
      <Text className={classes.title} mt={10} size="md">
        {data.price.toLocaleString('ko-kr')}원
      </Text>
      <Text size="sm" color="dimmed">
        즉시 구매가
      </Text>
      <Badge
        className="mt-18pxr"
        color={CATEGORY_COLOR_MAP[data.category_id - 1]}
      >
        {CATEGORY_MAP[data.category_id - 1]}
      </Badge>
    </Card>
  );
}
