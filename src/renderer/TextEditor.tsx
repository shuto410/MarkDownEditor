import React, { FormEvent, useEffect, useRef, useState } from "react"

const renderBlock = (block: EditorBlock) => {
  console.log('in render block: ', block.text)
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
  const blockRefs: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> = useRef([]);
  editorBlocks.forEach((_, i) => {
      blockRefs.current[i] = React.createRef();
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      console.log('enter')
      e.preventDefault();
      setEditorBlocks([...editorBlocks, {type: 'paragraph'}]);
      setSendingCaretToNewline(true);
    }
  }

  useEffect(() => {
    // blockRefs.current.forEach(ref => {
    //   ref.current.onchange((e) => {
    //     console.log();
    //   })
    // })
  })

  useEffect(() => {
    if (!sendingCaretToNewline) {
      return;
    }
    const selection = window.getSelection();
    const newNode = selection.focusNode.parentNode.parentNode.parentNode.lastChild.firstChild;
    // console.log(newNode)
    const range = new Range();
    range.setStart(newNode, 0);
    range.setEnd(newNode, 0);
    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }
    selection.addRange(range);
    setSendingCaretToNewline(false);
  }, [sendingCaretToNewline])

  const updateText = (e: FormEvent<HTMLDivElement>) => {

    const selection = window.getSelection();
    const focusNode = selection.focusNode;
    const newBlockText = focusNode.textContent;
    const blockId = Number(focusNode.parentElement.parentElement.id);
    const newEditorBlocks = [...editorBlocks];
    newEditorBlocks[blockId].text = newBlockText
    setEditorBlocks(newEditorBlocks);
    console.log(editorBlocks);
  }

  return (
    <>
      <div contentEditable onKeyDown={handleKeyPress} onInput={updateText} suppressContentEditableWarning={true}>
        {
          editorBlocks.map((block, index) => (<div key={index} id={String(index)} ref={blockRefs.current[index]}>
            {renderBlock(block)} 
          </div>))
        }
      </div>
    </>
  );
};

interface EditorBlock {
  text?: string;
  type?: BlockType; 
}

type BlockType = 'H1' | 'paragraph'