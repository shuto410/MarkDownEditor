import { convertFromRaw, Editor, EditorState, RawDraftContentBlock, RichUtils } from 'draft-js';
import React, { useEffect, useState } from "react"

// interface TextEditorProps {
//   text: string;
//   fileName?: string;
// }

// const createEditorState = (text: string) => EditorState.createWithContent(
//   convertFromRaw({
//     entityMap: {},
//     blocks: convertStringToBlocks(text),
//   })
// )

// const convertStringToBlocks = (text: string): RawDraftContentBlock[] => {
//   const blocks = text.split(/\r\n|\n/).map((line, index): RawDraftContentBlock => ({
//     key: `${index}`,
//     text: line,
//     type: "unstyled",
//     depth: 0,
//     entityRanges: [],
//     inlineStyleRanges: [],
//     data: {},
//   }))
//   return blocks;
// }

const renderBlock = (block: EditorBlock) => {
  if (!block.text) {
    return (<span><br/></span>);
  }
  switch (block.type) {
    case 'H1':
      return (<h1>{block.text}</h1>) 
    case 'paragraph':
      return (<span>{block.text}</span>)
    default:
      return (<span>{block.text}</span>)
  }
}

export const TextEditor = () => {
  const [editorBlocks, setEditorBlocks] = useState<EditorBlock[]>([{text: 'New line', type: 'H1'}]);
  const [sendingCaretToNewline, setSendingCaretToNewline] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      console.log('enter')
      e.preventDefault();
      setEditorBlocks([...editorBlocks, {type: 'paragraph'}]);
      setSendingCaretToNewline(true);
    }
  }

  useEffect(() => {
    if (!sendingCaretToNewline) {
      return;
    }
    const selection = window.getSelection();
    const newNode = selection.focusNode.parentNode.parentNode.parentNode.lastChild.firstChild;
    console.log(newNode)
    const range = new Range();
    range.setStart(newNode, 0);
    range.setEnd(newNode, 0);
    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }
    selection.addRange(range);
    setSendingCaretToNewline(false);
  }, [sendingCaretToNewline])

  return (
    <>
      <div contentEditable onKeyDown={handleKeyPress} suppressContentEditableWarning={true}>
        {
          editorBlocks.map((block, index) => (<div id={String(index)}>
            {renderBlock(block)} 
          </div>))
        }
      </div>
      {/* <div contentEditable onKeyDown={(e) => handleKeyPress(e)}>{props.text}</div> */}
    </>
  );
};

interface EditorBlock {
  text?: string;
  type?: BlockType; 
}

type BlockType = 'H1' | 'paragraph'