export enum FILE_EVENTS {
  OPEN_DIALOG = 'open_dialog',
  SAVE_DIALOG = 'save_dialog',
  OPEN_FILE = 'open_file',
  SAVE_FILE = 'save_file'
}

export interface FileInfoType {
  fileName: string;
  fileText: string;
}
