import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { EditorProps, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from '@mantine/core';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface CustomEditorProps {
  editorState?: EditorState;
  readOnly?: boolean;
  noPadding?: boolean;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
  onSave?: () => void;
  style?: any;
}

export default function CustomEditor({
  editorState,
  readOnly = false,
  noPadding = false,
  onEditorStateChange,
  onSave,
  style,
}: CustomEditorProps) {
  return (
    <Wrapper readOnly={readOnly} noPadding={noPadding} style={style}>
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
        editorStyle={{ height: '100%' }}
      />
      {/* {!readOnly && <Button onClick={onSave}>저장</Button>} */}
      {!readOnly && (
        <Button
          onClick={onSave}
          radius="md"
          style={{ background: '#000', color: '#fff', height: '48px' }}
        >
          저장
        </Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ readOnly: boolean; noPadding: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 18px;
  ${(props) => (props.noPadding ? '' : 'padding: 16px;')};
  ${(props) =>
    props.readOnly
      ? ''
      : 'box-shadow: -1px 4px 2px 4px rgba(0, 0, 0, 0.04),2px 2px 2px 2px rgba(0, 0, 0, 0.16)'};
`;
