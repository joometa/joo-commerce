import CustomEditor from 'components/Editor';
import { convertFromRaw } from 'draft-js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';
import { EditorState } from 'react-draft-wysiwyg';

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
  const router = useRouter();
  const { id: productId } = router.query;

  const [editState, setEditState] = useState<EditorState | undefined>(
    undefined
  );
  const [index, setIndex] = useState<number>(0);

  const handleSave = () => {};
  console.log({ EditorState });

  useEffect(() => {
    console.log({ productId });
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            // setEditState(data.items.contents);
          } else {
            console.log('fuck');
            // setEditState();
          }
        });
    }
  }, [productId]);

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
            layout="responsive"
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
      {editState != null && (
        <CustomEditor
          editorState={editState}
          onEditorStateChange={setEditState}
          onSave={handleSave}
        />
      )}
      <CustomEditor
        editorState={editState}
        onEditorStateChange={setEditState}
        onSave={handleSave}
      />
    </>
  );
}
