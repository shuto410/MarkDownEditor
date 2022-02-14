import { ipcRenderer } from 'electron';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom'
import { saveFile } from '../utils/fileIO';
import { FileInfoType, FILE_EVENTS } from '../utils/fileTypes';
import { Menu } from './Menu';
import 'draft-js/dist/Draft.css';
import { TextEditor } from './TextEditor';

const openFileDialog = (): void => {
  ipcRenderer.send(FILE_EVENTS.OPEN_DIALOG);
};

const openSaveAsDialog = (fileInfo: FileInfoType): void => {
  ipcRenderer.send(FILE_EVENTS.SAVE_DIALOG, fileInfo);
};


const App = () => {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileSave = useCallback(() => {
    if (fileName) {
      saveFile(fileName, text);
    } else {
      openSaveAsDialog({
        fileName: '',
        fileText: text
      });
    }
  }, [fileName, text]);

  const handleFileSaveAs = useCallback(() => {
    openSaveAsDialog({
      fileName: fileName,
      fileText: text
    });
  }, [fileName, text]);

  useEffect(() => {
    ipcRenderer.on(FILE_EVENTS.OPEN_FILE, (_, fileInfo: FileInfoType) => {
      setText(fileInfo.fileText);
      setFileName(fileInfo.fileName);
    });
    ipcRenderer.on(FILE_EVENTS.SAVE_FILE, (_, newFileName: string) => {
      setFileName(newFileName);
    });

    return (): void => {
      ipcRenderer.removeAllListeners(FILE_EVENTS.OPEN_FILE);
      ipcRenderer.removeAllListeners(FILE_EVENTS.SAVE_FILE);
    };
  }, []);


    return (
      <>
        <Menu
          onOpenButtonClick={openFileDialog}
          onSaveButtonClick={handleFileSave}
          onSaveAsButtonClick={handleFileSaveAs}
        />
        <TextEditor/>
      </>
    );
  };
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );