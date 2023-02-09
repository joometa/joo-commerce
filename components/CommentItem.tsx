import styled from '@emotion/styled';
import { IconStar } from '@tabler/icons';
import { CommentItemType } from 'pages/products/[id]';
import CustomEditor from './common/Editor';
import { EditorState, convertFromRaw } from 'draft-js';
import { format } from 'date-fns';
import AutoSizeImage from './AutoSizeImage';

interface Props {
  item: CommentItemType;
}

export default function CommentItem({ item }: Props) {
  return (
    <Wrapper>
      <div>
        <div style={{ display: 'flex' }}>
          <div className="flex w-full justify-between mb-15pxr">
            <div className="flex w-full">
              <div className="flex w-auto mr-20pxr items-center p-14pxr">
                <div className="flex flex-col">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <IconStar
                        key={idx}
                        fill={idx < item.rate ? 'red' : 'none'}
                        stroke={idx < item.rate ? 0 : 1}
                      />
                    ))}
                  </div>
                  {item.userName && item.userName.length > 0 && (
                    <span className="text-gray-400 pt-10pxr">
                      {item.userName}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-start">
                <CustomEditor
                  editorState={EditorState.createWithContent(
                    convertFromRaw(JSON.parse(item.contents ?? ''))
                  )}
                  readOnly
                  noPadding
                />
              </div>
            </div>
            <div className="w-150pxr flex justify-end items-center pr-14pxr">
              <p className="text-zinc-500 ml-auto">
                {format(new Date(item.updatedAt), 'yyyy-MM-dd')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex w-full p-10pxr space-x-10pxr"
        style={{ borderTop: '1px dotted lightgray' }}
      >
        {item.images?.split(',').map((image, idx) => (
          <AutoSizeImage key={idx} src={image} size={150} />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 8px;
`;
