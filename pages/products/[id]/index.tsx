// import ImageGallery from 'react-image-gallery';
// import Image from 'next/image';
import Image from 'next/image';
import Carousel from 'nuka-carousel';
import { useState } from 'react';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1016/1000/600/',
    thumbnail: 'https://picsum.photos/id/1016/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

export default function Products() {
  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <Carousel
        slideIndex={index}
        autoplay
        withoutControls
        wrapAround
        speed={3}
        animation="zoom"
      >
        {images.map((item) => (
          <Image
            src={item.original}
            key={item.original}
            alt="image"
            width={1000}
            height={600}
            // layout="responsive"
          />
        ))}
      </Carousel>
      <div style={{ display: 'flex' }}>
        {images.map((item, idx) => (
          <Image
            src={item.original}
            key={idx}
            alt="image"
            width={100}
            height={60}
            onClick={() => {
              setIndex(idx);
            }}
          />
        ))}
      </div>
    </>
  );
}
