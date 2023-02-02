import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import React, { Dispatch, SetStateAction } from 'react';
import { EditorProps, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from './Button';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface CustomEditorProps {
  editorState?: EditorState;
  readOnly?: boolean;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
  onSave?: () => void;
}

export default function CustomEditor({
  editorState,
  readOnly = false,
  onEditorStateChange,
  onSave,
}: CustomEditorProps) {
  return (
    <Wrapper readOnly={readOnly}>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        wrapperClassName="wrapper-class"
        toolbarClassName="editorToolbar-hidden"
        editorClassName="editor-class"
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link'],
        }}
        localization={{ locale: 'ko' }}
        onEditorStateChange={onEditorStateChange}
      />
      {/* {!readOnly && <Button onClick={onSave}>저장</Button>} */}
      {!readOnly && <Button onClick={onSave}>저장</Button>}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ readOnly: boolean }>`
  padding: 16px;
  ${(props) =>
    props.readOnly ? '' : 'border: 1px solid black; border-radius: 8px'}
`;
