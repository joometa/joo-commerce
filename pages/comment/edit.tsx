import AutoSizeImage from '@components/AutoSizeImage';
import Button from '@components/Button';
import CustomEditor from '@components/common/Editor';
import Main from '@components/layout/Main';
import { Slider } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { products } from '@prisma/client';
import { IconHeart } from '@tabler/icons';

export default function CommentEdit() {
  const router = useRouter();
  const { orderItemId, productId } = router.query;

  const inputRef = useRef<HTMLInputElement>(null);
  const [rate, setRate] = useState<number>(5);
  const [images, setImages] = useState<string[]>([]);

  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  const { data: product } = useQuery<unknown, unknown, products>(
    [`/api/get-product?id=${productId}`],
    () =>
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => data.items)
  );

  const handleSave = () => {
    if (editorState && orderItemId != null) {
      fetch(`/api/update-comment`, {
        method: 'POST',
        body: JSON.stringify({
          orderItemId: Number(orderItemId),
          rate: rate,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          images: images.join(','),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('후기 등록 완료');
          router.back();
        });
    }
  };

  const handleChangeImgFiles = () => {
    if (
      inputRef.current &&
      inputRef.current.files &&
      inputRef.current.files.length > 0
    ) {
      for (let i = 0; i < inputRef.current.files.length; i++) {
        const fd = new FormData();
        fd.append(
          'image',
          inputRef.current.files[i],
          inputRef.current.files[i].name
        );
        fetch(
          `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_IMG_BB_CLIENT_KEY}`,
          {
            method: 'POST',
            body: fd,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            setImages((prev) =>
              Array.from(new Set(prev.concat(data.data.image.url)))
            );
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    if (orderItemId != null) {
      fetch(`/api/get-comment?orderItemId=${orderItemId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            );
            setRate(data.items.rate);
            setImages(data.items.images.split(',') ?? []);
          } else {
            setEditorState(EditorState.createEmpty());
          }
        });
    }
  }, [orderItemId]);

  return (
    <Main>
      <h1 className="text-2xl mb-20pxr font-semibold">후기 작성</h1>
      <div
        className="flex flex-col divide-x divide-slate-200 sm:flex-row"
        style={{ minHeight: '50vh' }}
      >
        <div className="flex flex-col w-1/2">
          <h1 className="text-xl font-semibold text-slate-700">
            {product?.name ?? '상품명이 없습니다.'}
          </h1>
          <div className=" object-contain p-20pxr">
            <Image
              src={product?.image_url ?? '/images/coming-soon.png'}
              alt="comment-product-image"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col p-20pxr">
          {images && images.length > 0 && (
            <div
              className="flex mb-20pxr"
              style={{ border: '1px solid lightgray', borderRadius: '15px' }}
            >
              {images.map((image, idx) => (
                <AutoSizeImage key={idx} src={image} size={140} />
              ))}
            </div>
          )}
          <div className="mb-20pxr flex w-full items-center align-middle">
            <h3 className="text-xl font-semibold w-100pxr flex items-center">
              별점
            </h3>
            <div className="w-full">
              <Slider
                defaultValue={3}
                thumbChildren={<IconHeart size={30} stroke={1.5} />}
                color="red"
                min={1}
                max={5}
                step={1}
                value={rate}
                onChange={(value) => setRate(value)}
                styles={{
                  thumb: { borderWidth: 2, height: 26, width: 26, padding: 3 },
                }}
                marks={[
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                ]}
              />
            </div>
          </div>
          <div className="mb-24pxr">
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              multiple
              onChange={handleChangeImgFiles}
            />
          </div>
          {editorState != null && (
            <CustomEditor
              style={{ height: '500px' }}
              editorState={editorState}
              onEditorStateChange={setEditorState}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </Main>
  );
}
