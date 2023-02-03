import AutoSizeImage from '@components/AutoSizeImage';
import Button from '@components/Button';
import CustomEditor from '@components/Editor';
import { Slider } from '@mantine/core';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function CommentEdit() {
  const router = useRouter();
  const { orderItemId } = router.query;

  const inputRef = useRef<HTMLInputElement>(null);
  const [rate, setRate] = useState<number>(5);
  const [images, setImages] = useState<string[]>([]);

  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
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
        console.log('fd', fd);
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
    <div>
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
      <Slider
        defaultValue={3}
        min={1}
        max={5}
        step={1}
        value={rate}
        onChange={setRate}
        marks={[
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 },
        ]}
      />
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        multiple
        onChange={handleChangeImgFiles}
      />
      {/* <Button onClick={handleUpload}>업로드</Button> */}
      {images && images.length > 0 && (
        <div style={{ display: 'flex' }}>
          {images.map((image, idx) => (
            <AutoSizeImage key={idx} src={image} />
          ))}
        </div>
      )}
    </div>
  );
}
