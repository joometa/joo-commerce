import CustomEditor from '@components/common/Editor';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';

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
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );
  const [index, setIndex] = useState<number>(0);

  const handleSave = () => {
    if (editorState) {
      fetch('/api/update-product', {
        method: 'POST',
        body: JSON.stringify({
          id: productId,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        }),
      })
        .then((res) => res.json())
        .then(() => alert('Success updating contents'));
    }
  };

  useEffect(() => {
    if (productId != null) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            );
          } else {
            setEditorState(EditorState.createEmpty());
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
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  );
}
