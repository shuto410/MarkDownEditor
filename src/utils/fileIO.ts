import fs from 'fs';

export const FILE_FILTERS: {
  name: string;
  extensions: string[];
}[] = [
  { name: 'Markdown', extensions: ['md'] },
  { name: 'Text', extensions: ['txt'] },
  { name: 'All Files', extensions: ['*'] }
];

export const readFile = (fileName: string): string => {
  let fileText = '';
  try {
    fileText = fs.readFileSync(fileName, 'utf-8');
  } catch (e) {
    console.log(e);
  }
  return fileText;
};

export const saveFile = (fileName: string, fileText: string): void => {
  try {
    fs.writeFileSync(fileName, fileText, 'utf-8');
  } catch (e) {
    console.log(e);
  }
};